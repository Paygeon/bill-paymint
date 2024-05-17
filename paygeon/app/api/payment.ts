// payment.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createVerify } from 'crypto';
import { fetchCryptoPrice } from '../utils/cryptoUtils'; // Import the function to fetch crypto price

async function retrievePaymintPublicKey(): Promise<string> {
  const response = await fetch('https://paymint.com/key');
  const data = await response.text();
  return data;
}

function verifySignature(body: string, signature: string, publicKey: string): boolean {
  const verifier = createVerify('RSA-SHA256');
  verifier.update(body);
  return verifier.verify(publicKey, signature, 'base64');
}

async function generateCryptoAddress(coin: string, amount: number, callbackUrl: string): Promise<any> {
  try {
    const response = await fetch('GET https://btc.paymint.to/1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2?callback=https://example.com/payment/12345', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coin, amount, callbackUrl }),
    });
    return response.json();
  } catch (error) {
    throw new Error('Error generating address');
  }
}

export { generateCryptoAddress };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    input,
    output,
    inbound,
    outbound,
    confirmations,
    received,
    forwarded,
  } = req.query;

  const invoiceAmount = req.query.invoiceAmount as string;
  const fees = req.query.fees as string;
  const cryptoSymbol = req.query.cryptoSymbol as string;

  // Verify the X-Signature header
  const signature = req.headers['x-signature'] as string;
  if (!signature) {
    res.status(400).send('Signature header missing');
    return;
  }

  // Retrieve Paymint's public key
  let publicKey;
  try {
    publicKey = await retrievePaymintPublicKey();
  } catch (error) {
    res.status(500).send('Failed to retrieve public key');
    return;
  }

  // Verify the signature
  const isSignatureValid = verifySignature(JSON.stringify(req.query), signature, publicKey);
  if (!isSignatureValid) {
    res.status(400).send('Invalid signature');
    return;
  }

  // Validate required query parameters
  if (!cryptoSymbol || !invoiceAmount || !fees) {
    res.status(400).send('Missing required query parameters');
    return;
  }

  // Fetch the crypto price
  let cryptoPrice;
  try {
    cryptoPrice = await fetchCryptoPrice(cryptoSymbol);
  } catch (error) {
    res.status(500).send('Failed to fetch crypto price');
    return;
  }

  if (!cryptoPrice) {
    res.status(500).send('Failed to fetch crypto price');
    return;
  }

  // Calculate the total amount in crypto
  const totalAmountInCrypto = (Number(invoiceAmount) + Number(fees)) / cryptoPrice;

  // Generate the cryptocurrency address for payment
  const callbackUrl = `https://paygeon.com/api/payment`;
  let addressResponse;
  try {
    addressResponse = await generateCryptoAddress(cryptoSymbol, totalAmountInCrypto, callbackUrl);
  } catch (error) {
    res.status(500).send('Error generating address');
    return;
  }

  // Process the payment information
  console.log('Payment received:', {
    input,
    output,
    inbound,
    outbound,
    confirmations,
    received,
    forwarded,
    addressResponse,
  });

  // Here, you would typically handle the received payment, e.g., by updating the database
  // and initiating the payment to the vendor via check or ACH transfer

  res.status(200).send('Payment processed');
}
