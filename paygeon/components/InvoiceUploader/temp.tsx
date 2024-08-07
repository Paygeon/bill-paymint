
"use client";
import React, { useState, useRef, forwardRef, ChangeEvent, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tesseract from 'tesseract.js';
import { generateCryptoAddress, confirmPayment } from '../../app/api/payment';
import CopyButton from './copyButton';
import emailjs from "@emailjs/browser";
import NeoPopTiltedButton from '../NeoPOPTiltedButton/NeoPOPTiltedButton';
import pdfToText from 'react-pdftotext';
import 'react-datepicker/dist/react-datepicker.css';
import { supabase } from './supabaseClient';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import InvoiceForm from './ManualInputComponent';
import PhotoCapture from './PhotoCaptureComponent';

const CameraLottie = dynamic(() => import('../animation/CameraLottie'), {
  ssr: false,
});

interface FormData {
  invoice_id: string;
  invoice_amount: string;
  invoice_date: Date | null;
  due_date: Date | null;
  merchant_name: string;
}

export default function InvoiceUploader() {
  // Defining state variables
  const [file, setFile] = useState<File | null>(null);
  const [invoiceAmount, setInvoiceAmount] = useState<number | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<any>(null);
  const [coin, setCoin] = useState('btc');
  const [dropdownCoin, setDropdownCoin] = useState('btc');
  const [coinPaymentAmount, setCoinPaymentAmount] = useState<number | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState<{ name: string, email: string, address: string } | null>(null);
  const [merchantInfo, setMerchantInfo] = useState<{ name: string, email: string, address: string, account: string } | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<number>(0);
  const [callbackUrl, setCallbackUrl] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    invoice_id: uuidv4(),
    invoice_amount: '',
    invoice_date: null,
    due_date: null,
    merchant_name: '',
  });
  const [paymentInvoice, setPaymentInvoice] = useState<FormData>({
    invoice_id: uuidv4(),
    invoice_amount: '',
    invoice_date: null,
    due_date: null,
    merchant_name: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    handlePayRedirect(query.get('invoice_id'));
  }, [])

  // Handling choosing a file from file input
  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handling a change in file uploaded
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      resetStateVariables();
      handleUpload(event.target.files[0]);
    }
  };

  // Resetting all the state variables to default
  const resetStateVariables = () => {
    setInvoiceAmount(null);
    setPaymentAmount(null);
    setCoinPaymentAmount(null);
    setResponse(null);
  };

  // Processing the photo for further usage
  const handleUpload = async (uploadedFile?: File) => {
    const fileToProcess = uploadedFile || file;
    if (!fileToProcess) return;

    var result;
    // Extracting text from PDF / image
    if (fileToProcess.type === 'application/pdf') {
      result = await pdfToText(fileToProcess);
    } else {
      result = (await Tesseract.recognize(fileToProcess, 'eng')).data.text;
    }

    const extractedData = extractDataFromOcr(result);
    if (!extractedData) {
      console.error('Failed to extract data from OCR');
      return;
    }

    setInvoiceAmount(extractedData.amountDue);
    
    const uploadedData: FormData = {
      invoice_id: uuidv4(),
      invoice_amount: extractedData.amountDue.toString(),
      invoice_date: new Date(),
      due_date: new Date(),
      merchant_name: extractedData.merchantName,
    };

    const { data, error } = await supabase
      .from('INVOICE_INFO')
      .insert(uploadedData);

    handlePayment(uploadedData);
  }

  // Extracting customer information, merchant information, and invoice amount from OCR result
  const extractDataFromOcr = (text: string): { amountDue: number, merchantName: string } | null => {
    const customerData = text.match(/(?<=Bill\s?To:?\n|Customer:?\n|To:?\n).*(?:\n.*){2}/i);
    const merchantData = text.match(/(?<=From:?\n|Merchant:?\n).*(?:\n.*){2}/i);
    const merchantBankData = text.match(/(?:Notes|Memo)\s*:\s*(.*)/i);

    var customer: string[] = [];
    var merchant: string[] = [];

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
      name: merchantName ? merchantName : text.split(' ')[0],
      email: merchantEmail,
      address: merchantAddress,
      account: merchantBank
    };
    setMerchantInfo(merchantInfo);

    const amountDueMatch = text.match(/(?<!\S)(?:Amount|Amount Due|New Balance|Balance Due|Total|Total Due)\s*:?\s*\$?([\d,]+(?:\.\d{2})?)/i);
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
    return { amountDue, merchantName: merchantInfo.name };
  };

  const handlePayRedirect = async (invoice_id: string | null) => {
    const { data, error } = await supabase
      .from('INVOICE_INFO')
      .select('*')
      .eq('invoice_id', invoice_id);
    if (data) {
      handlePayment(data[0] as FormData);
    } else {
      console.log('Couldn\'t find the recoed with given Invoice ID');
    }
  }

  // Handling a change in selected crypto
  const handleCryptoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const coinSymbol = event.target.value;
    setDropdownCoin(coinSymbol);
    setCoin(coinSymbol);
    handlePayment(paymentInvoice);
    // if (paymentAmount && invoiceAmount) {
    //   const coinAmount = await handleCryptoAmount(paymentAmount, coinSymbol);
    //   const query = new URLSearchParams({
    //     amount: `${coinAmount}`
    //   }).toString();
    //   const callbackUrl = `https://paygeon.com/api/payment?${query}`;
    //   setCallbackUrl(callbackUrl);
    //   try {
    //     const addressResponse = await generateCryptoAddress(coinSymbol, paymentAmount, callbackUrl);
    //     setResponse(addressResponse);
    //   } catch (error) {
    //     console.error('Error generating crypto address:', error);
    //   }
    // }
  };

  const handlePayment = async (data: FormData) => {
    setPaymentInvoice(data);
    const amountWithFees = calculatePaymentAmount(parseFloat(data.invoice_amount));
    setPaymentAmount(amountWithFees.toFixed(2));

    const coinAmount = await handleCryptoAmount(amountWithFees, coin);
    const query = new URLSearchParams({
      amount: `${coinAmount}`
    }).toString();

    const callbackUrl = `https://paygeon.com/api/payment?${query}`;
    setCallbackUrl(callbackUrl);

    const addressResponse = await generateCryptoAddress(coin, amountWithFees, callbackUrl);
    setResponse(addressResponse);
    console.log(addressResponse);

    setTimeout(() => {
      const targetDiv = document.getElementById('payment-div');
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Calculating the total amount to be paid, including fees and charges
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

  // Converting the total amount into selected crypto
  const handleCryptoAmount = async (paymentAmount: number, cryptoSymbol: string) => {
    // Implement payment handling logic here
    const query = new URLSearchParams({
      value: `${paymentAmount}`,
      from: 'usd'
    }).toString();
    const ticker = cryptoSymbol;
    const resp = await fetch(
      `https://api.cryptapi.io/${ticker}/convert/?${query}`,
      { method: 'GET' }
    );

    const data = await resp.text();
    const parsedData = JSON.parse(data);
    if (parsedData.status == 'success') {
      setCoinPaymentAmount(parsedData.value_coin)
      setCoin(cryptoSymbol);
      return parsedData.value_coin;
    }
    return null;
  };

  // Handling the payment acknowledgement from the customer
  const handleConfirmPayment = async () => {
    const status = await confirmPayment(callbackUrl, coin);
    try {
      setPaymentStatus(1);

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

      // Triggering an email using EmailJS with the provided template and data
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
        // Seding a confirmation email both to the internal team and the customer
        if (status.value_coin == coinPaymentAmount) {
          sendEmail(internalTeamData, "template_ui2a7ls");
          sendEmail(customerData, "template_hocme3k");
          setPaymentStatus(2);
        } else {
          setPaymentStatus(3);
        }
      }, 2000);

      setTimeout(() => {
        setPaymentStatus(0);
      }, 4000);
    } catch (err) {
      console.log(err);
      setPaymentStatus(0);
    }
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      invoice_id: uuidv4(),
      invoice_amount: '',
      invoice_date: null,
      due_date: null,
      merchant_name: '',
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInvoiceDateChange = (date: Date | null) => {
    setFormData({ ...formData, invoice_date: date });
  };

  const handleDueDateChange = (date: Date | null) => {
    setFormData({ ...formData, due_date: date });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('INVOICE_INFO')
      .insert(formData);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted:', data);
    }

    setShowForm(false);
    setFormData({
      invoice_id: uuidv4(),
      invoice_amount: '',
      invoice_date: null,
      due_date: null,
      merchant_name: '',
    });
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2" style={{ width: '30em' }}>
      <div className="bg-transparent w-full h-[500px] flex justify-center items-center">
        <CameraLottie />
      </div>

      <div>
        <button onClick={handleOpenForm} className="custom-button" disabled={showForm}>
          Add manually
        </button>

        {showForm && (
          <InvoiceForm formData={formData} handleInputChange={handleInputChange} handleInvoiceDateChange={handleInvoiceDateChange} handleDueDateChange={handleDueDateChange} handleSubmit={handleSubmit} handleCloseForm={handleCloseForm} />
        )}
        <br></br>
        {/* <button onClick={() => handleTakePhoto(setFile, resetStateVariables, handleUpload)} className="custom-button" disabled={showForm}>
          Take a Photo
        </button> */}
        <PhotoCapture 
        handleCapture={handleUpload} 
      />
        <br></br>
        <input type="file" accept="image/*, application/pdf" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <button onClick={handleChooseFile} className="custom-button" disabled={showForm}>
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
      {paymentInvoice && (
        <hr className="separating-line" />
      )}
      {paymentInvoice && (
        <div className="display-text">
          <h2 className="text-xl font-bold">Paying To:</h2>
          <pre className="whitespace-pre-wrap">{paymentInvoice.merchant_name}</pre>
          <h2 className="text-xl font-bold">Invoice Amount:</h2>
          <pre className="whitespace-pre-wrap">$ {parseFloat(paymentInvoice.invoice_amount).toFixed(2)}</pre>
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
        <NeoPopTiltedButton onClick={handleConfirmPayment} disabled={paymentStatus != 0} className="w-23">
          {paymentStatus == 0 ? "Confirm Payment" : paymentStatus == 1 ?
            <svg>
            </svg> : paymentStatus == 2 ? "Success" : "Failed. Please Try Again."}
        </NeoPopTiltedButton>
      )}
      <div id='payment-div'></div>
    </div>
  );
}
