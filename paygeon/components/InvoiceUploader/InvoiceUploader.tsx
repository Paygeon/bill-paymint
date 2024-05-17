import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { generateCryptoAddress } from '../../app/api/payment';
import CameraLottie from '../animation/CameraLottie';

export default function InvoiceUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<{ amountDue: number } | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [coin, setCoin] = useState('BTC');
  const [response, setResponse] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => console.log(m),
      });

      setOcrResult(result.data.text);

      const extractedData = extractDataFromOcr(result.data.text);
      if (!extractedData) {
        console.error('Failed to extract data from OCR');
        return;
      }

      setInvoiceData(extractedData);

      const amountWithFees = calculatePaymentAmount(extractedData.amountDue);
      setPaymentAmount(amountWithFees);

      const callbackUrl = `https://paygeon.com/api/payment`;
      const addressResponse = await generateCryptoAddress(coin, amountWithFees, callbackUrl);
      setResponse(addressResponse);

      handlePayment(extractedData.amountDue, amountWithFees - extractedData.amountDue, coin);
    } catch (error) {
      console.error('Error processing the image with Tesseract:', error);
    }
  };

  const handlePayment = async (invoiceAmount: number, fees: number, cryptoSymbol: string) => {
    // Implement payment handling logic here
  };

  const extractDataFromOcr = (text: string): { amountDue: number } | null => {
    const amountDueRegex = /Balance Due:\s*\$([\d.]+)/;
    const amountDueMatch = text.match(amountDueRegex);

    if (!amountDueMatch) {
      console.error('Failed to extract amount due from OCR');
      return null;
    }

    const amountDue = parseFloat(amountDueMatch[1]);
    if (isNaN(amountDue)) {
      console.error('Failed to parse amount due as number');
      return null;
    }

    return { amountDue };
  };
  
  const calculatePaymentAmount = (amountDue: number): number => {
    // Calculate the additional fee based on 1.35% of the amountDue
    const additionalFeePercentage = 1.35 / 100;
    const additionalFee = amountDue * additionalFeePercentage;
    
    // Add the fixed fee of $2.55
    const fixedFee = 2.55;
    
    // Calculate the final payment amount
    const finalAmount = amountDue + additionalFee + fixedFee;
    
    // Return the final payment amount
    return finalAmount;
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-transparent h-screen w-screen flex justify-center items-center">
      <CameraLottie />
      </div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} className="p-2 bg-blue-500 text-white rounded mt-2">
        Upload and Process
      </button>
      {ocrResult && (
        <div className="mt-4 p-4 border">
          <h2 className="text-xl font-bold">OCR Result:</h2>
          <pre className="whitespace-pre-wrap">{ocrResult}</pre>
        </div>
      )}
      {invoiceData && (
        <div className="mt-4 p-4 border">
          <h2 className="text-xl font-bold">Invoice Data:</h2>
          {/* Render extracted invoice data here */}
        </div>
      )}
      {paymentAmount !== null && (
        <div className="mt-4 p-4 border">
          <h2 className="text-xl font-bold">Total Payment Amount:</h2>
          {/* Render total payment amount here */}
        </div>
      )}
      {response && (
        <div className="mt-4 p-4 border">
          <h2 className="text-xl font-bold">Send Payment to the Following Address:</h2>
          {/* Render payment address here */}
        </div>
      )}
    </div>
  );
}
