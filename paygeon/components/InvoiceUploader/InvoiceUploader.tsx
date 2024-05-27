import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { generateCryptoAddress } from '../../app/api/payment';
import CameraLottie from '../animation/CameraLottie';
import './styles.css';
import CopyButton from './copyButton';
import emailjs from "@emailjs/browser";

export default function InvoiceUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<{ amountDue: number } | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<any>(null);
  const [coin, setCoin] = useState('btc');
  const [dropdownCoin, setDropdownCoin] = useState('btc');
  const [coinPaymentAmount, setCoinPaymentAmount] = useState<number | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState<{ name: string, email: string, address: string } | null>(null);
  const [merchantInfo, setMerchantInfo] = useState<{ name: string, email: string, address: string, account: string } | null>(null);
  const [confirmPayment, setConfirmPayment] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      resetStateVariables();
      handleUpload(event.target.files[0]);
    }
  };

  const handleTakePhoto = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const newWindow = window.open(
      '',
      'CameraWindow',
      `width=${screenWidth},height=${screenHeight},left=0,top=0`
    );

    if (newWindow) {
      newWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin: 0;
              height: 100%;
              background-color: #f0f0f0;
            }
            #camera-root {
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center;
              height: 97%;
            }
            #video {
              height: 100%;
            }
            #capture-button {
              margin-top: 10px;
              padding: 10px 20px;
              font-size: 16px;
              background-color: #4CAF50;
              color: white;
              border: none;
              cursor: pointer;
              border-radius: 5px;
              align-self: center;
            }
            #capture-button:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <div id="camera-root">
            <video id="video" autoplay></video>
            <button id="capture-button">Capture Photo</button>
            <canvas id="canvas" style="display:none;"></canvas>
          </div>
        </body>
      </html>
    `);
      newWindow.document.close();

      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        if (event.data.type === 'CAPTURED_PHOTO') {
          const photo = event.data.photo;
          setFile(photo);
          resetStateVariables();
          handleUpload(photo);
          window.removeEventListener('message', handleMessage);
          newWindow.close();
        }
      };

      window.addEventListener('message', handleMessage);

      const cameraScript = `
      (function() {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const captureButton = document.getElementById('capture-button');

        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            video.srcObject = stream;
          })
          .catch((error) => {
            console.error('Error accessing the camera: ', error);
          });

        captureButton.onclick = () => {
          const context = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/png');
          window.opener.postMessage({ type: 'CAPTURED_PHOTO', photo: dataUrl }, window.location.origin);
        };
      })();
    `;

      const scriptElement = newWindow.document.createElement('script');
      scriptElement.innerHTML = cameraScript;
      newWindow.document.body.appendChild(scriptElement);
    }
  };

  const resetStateVariables = () => {
    setOcrResult(null);
    setInvoiceData(null);
    setPaymentAmount(null);
    setCoinPaymentAmount(null);
    setResponse(null);
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const extractInvoiceInfo = (text: string) => {
    console.log(text);

    const customerData = text.match(/(?<=Bill\s?To:?\n|Customer:?\n|To:?\n).*(?:\n.*){2}/i);
    const merchantData = text.match(/(?<=From:?\n|Merchant:?\n).*(?:\n.*){2}/i);    
    const merchantBankData = text.match(/(?:Notes|Memo)\s*:\s*(.*)/i);

    let customer: string[] = [];
    let merchant: string[] = [];

    if (customerData) {
      customer = customerData[0].split('\n').map(line => line.trim());
    }

    if (merchantData) {
      merchant = merchantData[0].split('\n').map(line => line.trim());
    }

    const [customerName, customerEmail, customerAddress] = [
      customer.length > 0 ? customer[0].split(' ').slice(0, 2).join(' ') : '',
      customer.length > 1 ? customer[1].split(' ')[0] : '',
      customer.length > 2 ? customer[2] : ''
    ];

    const [merchantName, merchantEmail, merchantAddress, merchantBank] = [
      merchant.length > 0 ? merchant[0] : '',
      merchant.length > 1 ? merchant[1].split(' ')[0] : '',
      merchant.length > 2 ? merchant[2] : '',
      merchantBankData ? merchantBankData[1] : ''
    ];

    const customerInfo = {
      name: customerName,
      email: customerEmail,
      address: customerAddress
    };
    setCustomerInfo(customerInfo);

    const merchantInfo = {
      name: merchantName,
      email: merchantEmail,
      address: merchantAddress,
      account: merchantBank
    };
    setMerchantInfo(merchantInfo);
  };


  const handleUpload = async (uploadedFile?: File) => {
    const fileToProcess = uploadedFile || file;
    if (!fileToProcess) return;

    try {
      const result = await Tesseract.recognize(fileToProcess, 'eng', {
        logger: (m) => console.log(m),
      });

      setOcrResult(result.data.text);
      extractInvoiceInfo(result.data.text);

      const extractedData = extractDataFromOcr(result.data.text);
      if (!extractedData) {
        console.error('Failed to extract data from OCR');
        return;
      }

      setInvoiceData(extractedData);

      const amountWithFees = calculatePaymentAmount(extractedData.amountDue);
      setPaymentAmount(amountWithFees.toFixed(2));

      const callbackUrl = `https://paygeon.com/api/payment`;
      const addressResponse = await generateCryptoAddress(coin, amountWithFees, callbackUrl);
      setResponse(addressResponse);
      console.log(addressResponse);
      handlePayment(extractedData.amountDue, amountWithFees - extractedData.amountDue, coin);
    } catch (error) {
      console.error('Error processing the image with Tesseract:', error);
    }
  };

  const handleCryptoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const callbackUrl = `https://paygeon.com/api/payment`;
    const coinSymbol = event.target.value;
    setDropdownCoin(coinSymbol);
    console.log("Symbol :: ", coinSymbol)
    if (paymentAmount && invoiceData) {
      try {
        const addressResponse = await generateCryptoAddress(coinSymbol, paymentAmount, callbackUrl);
        setResponse(addressResponse);
        console.log(addressResponse);
      } catch (error) {
        console.error('Error generating crypto address:', error);
      }
      await handlePayment(invoiceData.amountDue, paymentAmount - invoiceData.amountDue, coinSymbol);
    }
  };

  const handlePayment = async (invoiceAmount: number, fees: number, cryptoSymbol: string) => {
    // Implement payment handling logic here
    const query = new URLSearchParams({
      value: `${invoiceAmount + fees}`,
      from: 'usd'
    }).toString();
    console.log(cryptoSymbol)
    const ticker = cryptoSymbol;
    const resp = await fetch(
      `https://api.cryptapi.io/${ticker}/convert/?${query}`,
      { method: 'GET' }
    );

    const data = await resp.text();
    const parsedData = JSON.parse(data);
    console.log(data)
    if (parsedData.status == 'success') {
      console.log(parsedData.value_coin)
      setCoinPaymentAmount(parsedData.value_coin)
      setCoin(cryptoSymbol);
    }
  };

  const extractDataFromOcr = (text: string): { amountDue: number } | null => {
    const amountDueRegex = /(?:Amount|Amount Due|Balance|Balance Due|Total|Total Due|Subtotal)\s*:?\s*\$?([\d,]+(?:\.\d{2})?)/i;
    const amountDueMatch = text.match(amountDueRegex);
    if (!amountDueMatch) {
      console.error('Failed to extract amount due from OCR');
      return null;
    }

    const amountDueString = amountDueMatch[1].replace(/,/g, '');
    var amountDue = parseFloat(amountDueString);
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

  const handleConfirmPayment = () => {
    try {
      setConfirmPayment(1);

      const internalTeamData = {
        coinAmount: coinPaymentAmount,
        coin: coin.toUpperCase(),
        amount: paymentAmount,
        customerName: customerInfo?.name,
        merchantName: merchantInfo?.name,
        merchantAddress: merchantInfo?.address,
        merchantAccount: merchantInfo?.account,
        toEmail: "paygeoncard@gmail.com"
      };

      const customerData = {
        coinAmount: coinPaymentAmount,
        coin: coin.toUpperCase(),
        amount: paymentAmount,
        customerName: customerInfo?.name,
        merchantName: merchantInfo?.name,
        toEmail: customerInfo?.email
      };

      const sendEmail = (formData: any, template: string) => {
        const form = document.createElement("form");

        Object.entries(formData).forEach(([key, value]) => {
          const inputField = document.createElement("input");
          inputField.name = key;
          inputField.value = `${value}`;
          form.appendChild(inputField);
        });

        emailjs.sendForm(
          "service_5kfcv7i",
          template,
          form,
          "N0ixEpRDE4bdrAfPS"
        );
      };

      setTimeout(() => {
        sendEmail(internalTeamData, "template_ui2a7ls");
        sendEmail(customerData, "template_hocme3k");
        setConfirmPayment(2);
      }, 2000);

      setTimeout(() => {
        setConfirmPayment(0);
      }, 4000);
    } catch (err) {
      console.log(err);
      setConfirmPayment(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-transparent w-full h-[600px] flex justify-center items-center">
        <CameraLottie />
      </div>
      <div>
        <button onClick={handleTakePhoto} className="custom-button take-photo-button">
          Take a Photo
        </button>
        <br></br>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <button onClick={handleChooseFile} className="custom-button choose-file-button">
          Choose File
        </button>
        {file ? (
          <p className="display-text italic whitespace-nowrap overflow-hidden text-ellipsis pl-4">
            Selected file: {file.name ? file.name : "captured_photo"}
          </p>
        ) : (
          <p className="text-box">
            No file chosen
          </p>
        )}
      </div>
      {merchantInfo && (
        <hr className="separating-line" />
      )}
      {merchantInfo && paymentAmount && invoiceData && invoiceData.amountDue && (
        <div className="display-text">
          <h2 className="text-xl font-bold">Paying To:</h2>
          <pre className="whitespace-pre-wrap">{merchantInfo.name}</pre>
          <h2 className="text-xl font-bold">Invoice Amount:</h2>
          <pre className="whitespace-pre-wrap">$ {invoiceData.amountDue.toFixed(2)}</pre>
          <h2 className="text-xl font-bold">Total Amount:</h2>
          <pre className="whitespace-pre-wrap">$ {paymentAmount}</pre>
        </div>
      )}
      {merchantInfo && !paymentAmount && (
        <div className="display-text">
          <pre className="whitespace-pre-wrap">Unable to recognize text. Please try again.</pre>
        </div>
      )}
      {/* {ocrResult && (
        <div className="display-text">
          <h2 className="text-xl font-bold">OCR Result:</h2>
          <pre className="whitespace-pre-wrap">{ocrResult}</pre>
        </div>
      )} */}
      {paymentAmount !== null && (
        <hr className="separating-line" />
      )}
      {paymentAmount !== null && (
        <div className="display-text">
          <h2 className="text-xl font-bold">Choose crypto to pay with: </h2>
          <select className="dropdown-options" id="cryptoOptions" value={dropdownCoin} onChange={handleCryptoChange}>
            <option value="btc">Bitcoin (BTC)</option>
            <option value="ltc">Litecoin (LTC)</option>
            <option value="eth">Ethereum (ETH)</option>
            <option value="doge">Dogecoin (DOGE)</option>
            <option value="trx">TRX</option>
          </select>
        </div>
      )}
      {coinPaymentAmount !== null && (
        <div className="display-text">
          <h2 className="text-xl font-bold">Total Amount:</h2>
          <pre className="whitespace-pre-wrap">{coinPaymentAmount} {coin.toUpperCase()}</pre>
        </div>
      )}
      {response !== null && (
        <hr className="separating-line" />
      )}
      {response && (
        <div className="display-text">
          <h2 className="text-xl font-bold">Pay to the Following Address:</h2>
          <div className="border border-white rounded-[0.5em] mt-4 text-black flex items-center overflow-hidden">
            <p title={response} className="whitespace-nowrap overflow-hidden text-ellipsis text-white flex-1 pl-3 pr-1">{response}</p>
            <CopyButton textToCopy={response} />
          </div>
        </div>
      )}
      {coinPaymentAmount !== null && (
        <hr className="separating-line" />
      )}
      {coinPaymentAmount !== null && (
        <button onClick={handleConfirmPayment} disabled={confirmPayment != 0} className="custom-button payment-button flex items-center justify-center">
          {confirmPayment == 0 ? "Confirm Payment" : confirmPayment == 1 ?
            <svg
              width="50px"
              height="50px"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              style={{ background: 'none' }}
            >
              <circle cx="75" cy="50" fill="#fff" r="6.39718">
                <animate
                  attributeName="r"
                  values="4.8;4.8;8;4.8;4.8"
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.875s"
                />
              </circle>
              <circle cx="67.678" cy="67.678" fill="#fff" r="4.8">
                <animate
                  attributeName="r"
                  values="4.8;4.8;8;4.8;4.8"
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.75s"
                />
              </circle>
              <circle cx="50" cy="75" fill="#fff" r="4.8">
                <animate
                  attributeName="r"
                  values="4.8;4.8;8;4.8;4.8"
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.625s"
                />
              </circle>
              <circle cx="32.322" cy="67.678" fill="#fff" r="4.8">
                <animate
                  attributeName="r"
                  values="4.8;4.8;8;4.8;4.8"
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.5s"
                />
              </circle>
              <circle cx="25" cy="50" fill="#fff" r="4.8">
                <animate
                  attributeName="r"
                  values="4.8;4.8;8;4.8;4.8"
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.375s"
                />
              </circle>
              <circle cx="32.322" cy="32.322" fill="#fff" r="4.80282">
                <animate
                  attributeName="r"
                  values="4.8;4.8;8;4.8;4.8"
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.25s"
                />
              </circle>
              <circle cx="50" cy="25" fill="#fff" r="6.40282">
                <animate
                  attributeName="r"
                  values="4.8;4.8;8;4.8;4.8"
                  dur="1s"
                  repeatCount="indefinite"
                  begin="-0.125s"
                />
              </circle>
              <circle cx="67.678" cy="32.322" fill="#fff" r="7.99718">
                <animate
                  attributeName="r"
                  values="4.8;4.8;8;4.8;4.8"
                  dur="1s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
            </svg> : "Done"}
        </button>

      )}
    </div>
  );
}