import React, { useState } from 'react';
import { InvoiceCard } from './InvoiceCard';
import './Frame11981.module.css';

interface FormData {
    invoice_id: string;
    invoice_amount: string;
    invoice_date: Date | null;
    due_date: Date | null;
    merchant_name: string;
}

interface InvoiceDisplayProps {
    invoiceCardData: FormData[];
    paymentFunction: (data: FormData) => void;
}

export const InvoiceDisplay: React.FC<InvoiceDisplayProps> = ({ invoiceCardData, paymentFunction }) => {

    const [showAll, setShowAll] = useState(false);
    const initialDisplayCount = 2;

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="flex flex-wrap w-full justify-between justify-center py-2" style={{ rowGap: '30px' }}>
            {invoiceCardData.slice(0, showAll ? invoiceCardData.length : initialDisplayCount).map((x) => (
                <div className="flex" key={x.invoice_id}>
                    <InvoiceCard invoiceData={x} paymentFunction={paymentFunction}/>
                </div>
            ))}

            <div className="flex justify-center w-full">
                <button className='custom-button custom-white-button' onClick={toggleShowAll} disabled={invoiceCardData.length < initialDisplayCount}>
                    {showAll ? 'Show Less' : 'Show All'}
                </button>
            </div>

        </div>
    );
};;
