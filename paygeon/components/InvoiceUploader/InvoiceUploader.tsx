'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ManualInputComponent from './ManualInputComponent';
import PhotoCaptureComponent from './PhotoCaptureComponent';
import { supabase } from './supabaseClient';
import FileUploadComponent from './FileUploadComponent';
import { processFile } from './OCRUtils';
import { generateCryptoAddress, confirmPayment } from '../../app/api/payment';
import { v4 as uuidv4 } from 'uuid';
import emailjs from "@emailjs/browser";
import PaymentDetailsComponent from './PaymentDetailsComponent';

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
  const initialFormData: FormData = {
    invoice_id: uuidv4(),
    invoice_amount: '',
    invoice_date: null,
    due_date: null,
    merchant_name: ''
  };

  const [fileName, setFileName] = useState<string>("No file chosen");
  const [data, setData] = useState<FormData>(initialFormData);
  const [crypto, setCrypto] = useState<string>('btc');
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [cryptoPaymentAmount, setCryptoPaymentAmount] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<number>(0);
  const [callbackUrl, setCallbackUrl] = useState<any>(null);
  const [paymentAddress, setPaymentAddress] = useState<any>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    handlePayRedirect(query.get('invoice_id'));
  }, [])

  const handleFileUpload = async (file: File) => {
    resetStateVariables();
    setFileName("Selected File: " + file.name)
    const data = await processFile(file);
    if (data) {
      setData(data);
      // handleSaveToDB(data);
      handlePayment(data, crypto);
    }
  }

  const resetStateVariables = () => {
    setData(initialFormData);
    setPaymentAmount(null);
    setCrypto('btc');
    setCryptoPaymentAmount(null);
    setPaymentAddress(null);
  }

  // Save the invoice to DB
  const handleSaveToDB = async (formData: FormData) => {
    try {
      await supabase
        .from('INVOICE_INFO')
        .insert(formData);
    } catch (error) {
      console.error('Error saving the invoice:', error);
    }
  }

  const handlePayRedirect = async (invoice_id: string | null) => {
    const { data, error } = await supabase
      .from('INVOICE_INFO')
      .select('*')
      .eq('invoice_id', invoice_id);
    if (data) {
      handlePayment(data[0] as FormData, crypto);
      setData(data[0] as FormData);
    } else {
      console.log('Couldn\'t find the recoed with given Invoice ID');
    }
  }

  const handlePayment = async (data: FormData, crypto: string) => {
    const paymentAmount = calculatePaymentAmount(parseFloat(data.invoice_amount));
    setPaymentAmount(paymentAmount);
    const cryptoPaymentAmount = await calculateCryptoPaymentAmount(paymentAmount, crypto);

    const query = new URLSearchParams({
      amount: `${cryptoPaymentAmount}`
    }).toString();

    const callbackUrl = `https://paygeon.com/api/payment?${query}`;
    setCallbackUrl(callbackUrl);

    const paymentAddress = await generateCryptoAddress(crypto, paymentAmount, callbackUrl);
    console.log(paymentAddress);
    setPaymentAddress(paymentAddress);

    setTimeout(() => {
      const targetDiv = document.getElementById('payment-div');
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);


  }

  // Calculating the total amount to be paid, including fees and charges
  const calculatePaymentAmount = (invoiceAmount: number): number => {
    // Calculate the additional fee based on 1.35% of the amountDue
    const additionalFeePercentage = 1.35 / 100;
    const additionalFee = invoiceAmount * additionalFeePercentage;

    // Add the fixed fee of $2.55
    const fixedFee = 2.55;

    // Calculate the final payment amount
    const finalAmount = invoiceAmount + additionalFee + fixedFee;

    // Return the final payment amount
    return finalAmount;
  }

  const calculateCryptoPaymentAmount = async (paymentAmount: number, crypto: string) => {
    const query = new URLSearchParams({
      value: `${paymentAmount}`,
      from: 'usd'
    }).toString();
    const ticker = crypto;
    const response = await fetch(
      `https://api.cryptapi.io/${ticker}/convert/?${query}`,
      { method: 'GET' }
    );

    const data = await response.text();
    const parsedData = JSON.parse(data);
    if (parsedData.status == 'success') {
      console.log(parsedData.value_coin);
      setCryptoPaymentAmount(parsedData.value_coin);
      setCrypto(crypto);
      return parsedData.value_coin;
    }
    return null;
  }

  // Handling the payment acknowledgement from the customer
  const handleConfirmPayment = async () => {
    const status = await confirmPayment(callbackUrl, crypto);
    try {
      setPaymentStatus(1);

      const internalTeamData = {
        coinAmount: cryptoPaymentAmount,
        coin: crypto.toUpperCase(),
        amount: paymentAmount,
        // customerName: customerInfo?.name,
        merchantName: data.merchant_name,
        // merchantAddress: merchantInfo?.address,
        // merchantAccount: merchantInfo?.account,
        toEmail: "paygeoncard@gmail.com"
      };

      const customerData = {
        coinAmount: cryptoPaymentAmount,
        coin: crypto.toUpperCase(),
        amount: paymentAmount,
        // customerName: customerInfo?.name,
        merchantName: data.merchant_name,
        // toEmail: customerInfo?.email
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
        if (status.value_coin == cryptoPaymentAmount) {
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
      console.error('Error confirming payment:', err);
      setPaymentStatus(0);
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen py-2' style={{ width: '25em' }}>
      <div className='bg-transparent w-full h-[500px] flex justify-center items-center'>
        <CameraLottie />
      </div>
      <ManualInputComponent handleSubmit={handleSaveToDB} />
      <PhotoCaptureComponent handleCapture={handleFileUpload} />
      <FileUploadComponent handleFileUpload={handleFileUpload} />
      <p className='display-text italic whitespace-nowrap overflow-hidden text-ellipsis pl-4 w-full'>
        {fileName}
      </p>
      {paymentAmount && (
        <PaymentDetailsComponent
          data={data}
          paymentAmount={paymentAmount}
          crypto={crypto}
          cryptoPaymentAmount={cryptoPaymentAmount}
          paymentAddress={paymentAddress}
          paymentStatus={paymentStatus}
          handlePayment={handlePayment}
          handleConfirmPayment={handleConfirmPayment}
        />
      )}
      {fileName !== "No file chosen" && !paymentAmount && (
        <div>
          <hr className="separating-line" />
          <div className="display-text w-full">
            <pre className="whitespace-pre-wrap">Unable to recognize text. Please try again.</pre>
          </div>
        </div>
      )}
      <div id='payment-div'></div>
    </div>
  )
}