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

type CryptoDetails = {
  address: string;
  ticker: string;
};

const cryptoDetails: Record<string, CryptoDetails> = {
  btc: { address: 'bc1qmhg6z5dgnpsswwht0x53g7yucjqfahyc60fctn', ticker: 'btc' },
  ltc: { address: 'ltc1q4efmghs2zupatst89tstmjvahn89hnvkuan8qa', ticker: 'ltc' },
  eth: { address: '0xa44E9D6E5C9b638D9CEE82fa02c3A21a985772a8', ticker: 'eth' },
  doge: { address: 'D59DKnQrMYswmfFik1dbqqVBksF9j4yZ1j', ticker: 'doge' },
  trx: { address: 'TK2vRkUtTKhZroAny7uqLkzTwBoXUbj4Um', ticker: 'trx' }
};

function getCryptoDetails(coin: string): CryptoDetails {
  const details = cryptoDetails[coin];
  if (!details) {
    throw new Error('Unsupported crypto currency');
  }
  return details;
}

async function generateCryptoAddress(coin: string, amount: number, callbackUrl: string): Promise<any> {
  const { address, ticker } = getCryptoDetails(coin);
  try {
    const query = new URLSearchParams({
      callback: callbackUrl,
      address: `1.0@${address}`,
      pending: '0',
      confirmations: '1',
      email: 'paygeoncard@gmail.com',
      post: '1',
      json: '1',
      priority: 'default',
      multi_token: '0',
      multi_chain: '0',
      convert: '1'
    }).toString();
    
    const resp = await fetch(
      `https://api.cryptapi.io/${ticker}/create/?${query}`,
      {method: 'GET'}
    );
    const data = await resp.text();
    const parsedData = JSON.parse(data);
    if (parsedData.status == "success") {
      return parsedData.address_in;
    }
  } catch (error) {
    throw new Error('Error generating address');
  }
}

export { generateCryptoAddress };

async function confirmPayment(callbackUrl: string, coin: string) {
  const { ticker } = getCryptoDetails(coin);
  try {
    const query = new URLSearchParams({
      callback: callbackUrl
    }).toString();
    const resp = await fetch(
      `https://api.cryptapi.io/${ticker}/logs/?${query}`,
      {method: 'GET'}
    );
    const data = await resp.text();
    const parsedData = JSON.parse(data);
    console.log(parsedData)
    if (parsedData.status == "success") {
      return parsedData.callbacks[parsedData.callbacks.length - 1];
    }
  } catch (error) {
    throw new Error('Error generating address');
  }
}

export { confirmPayment };

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
