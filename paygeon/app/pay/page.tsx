'use client';
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { InvoiceDisplay } from './InvoiceCard/InvoiceDisplay';
import { supabase } from '../../components/InvoiceUploader/supabaseClient';
import './styles.css';

interface FormData {
  invoice_id: string;
  invoice_amount: string;
  invoice_date: Date | null;
  due_date: Date | null;
  merchant_name: string;
}

const Pay: NextPage = () => {
  const [invoiceCardData, setInvoiceCardData] = useState<FormData[]>([]);

  useEffect(() => {
    fetchInvoices();
    console.log(invoiceCardData);
  }, [])

  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from('INVOICE_INFO')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      handleInvoiceCardData(data as FormData[]);
    }
  };

  const handleInvoiceCardData = (data: FormData[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const modifiedData = data
      .filter(sample => !sample.due_date || new Date(sample.due_date) >= today)
      .map(sample => {
        const newSample = { ...sample };
        if (sample.due_date) {
          newSample.due_date = new Date(sample.due_date);
        } else {
          newSample.due_date = null;
        }
        return newSample;
      });

    modifiedData.sort((a, b) => {
      if (a.due_date && b.due_date) {
        return a.due_date.getTime() - b.due_date.getTime();
      } else if (a.due_date && !b.due_date) {
        return -1;
      } else if (!a.due_date && b.due_date) {
        return 1;
      } else {
        return 0;
      }
    });
    setInvoiceCardData(modifiedData);
  };

  const generateUrlWithParams = (data: Record<string, string>) => {
    const queryParams = new URLSearchParams(data).toString();
    return `/?${queryParams}`;
  };

  const handlePayment = async (data: FormData) => {
    const invId = { invoice_id: data.invoice_id };
    console.log(invId);
    const url = generateUrlWithParams(invId);
    console.log(url);
    window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 mx-auto" style={{ width: '30em' }}>
      <h1 className="text-3xl font-bold mb-4" style={{ margin: '5px', marginBottom: '15px' }}>Your Invoices</h1>
      <InvoiceDisplay invoiceCardData={invoiceCardData} paymentFunction={handlePayment} />
    </div>
  );
};

export default Pay;
