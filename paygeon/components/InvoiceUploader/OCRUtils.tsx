import Tesseract from 'tesseract.js';
import pdfToText from 'react-pdftotext';
import { v4 as uuidv4 } from 'uuid';

export type FormData = {
    invoice_id: string;
    invoice_amount: string;
    invoice_date: Date | null;
    due_date: Date | null;
    merchant_name: string;
};

// Extract dates using regex patterns
const extractDates = (text: string, patterns: RegExp[]): Date[] => {
    return patterns.flatMap(pattern => {
        const matches = text.match(pattern) || [];
        return matches.map(match => new Date(match)).filter(date => !isNaN(date.getTime()));
    });
};

// Extract customer and merchant information from text
const extractEntities = (text: string) => {
    const customerData = text.match(/(?<=Bill\s?To:?\n|Customer:?\n|To:?\n).*(?:\n.*){2}/i);
    const merchantData = text.match(/(?<=From:?\n|Merchant:?\n).*(?:\n.*){2}/i);
    const merchantBankData = text.match(/(?:Notes|Memo)\s*:\s*(.*)/i);

    const parseEntity = (data: string | null) => {
        if (!data) return ['', '', ''];
        const lines = data.split('\n').map(line => line.trim());
        return [
            lines[0] || '',
            lines[1] ? lines[1].split(' ')[0] : '',
            lines[2] || ''
        ];
    };

    const customer = parseEntity(customerData ? customerData[0] : null);
    const merchant = parseEntity(merchantData ? merchantData[0] : null);
    const merchantBank = merchantBankData ? merchantBankData[1] : '';

    return { customer, merchant, merchantBank };
};

// Extract amount due from text
const extractAmountDue = (text: string): number | null => {
    const match = text.match(/(?<!\S)(?:Amount|Amount Due|New Balance|Balance Due|Total|Total Due)\s*:?\s*\$?([\d,]+(?:\.\d{2})?)/i);
    if (!match) return null;
    const amount = parseFloat(match[1].replace(/,/g, ''));
    return isNaN(amount) ? null : amount;
};

// Extract data from OCR text
const extractDataFromOcr = (text: string): FormData | null => {
    const { customer, merchant, merchantBank } = extractEntities(text);
    const amountDue = extractAmountDue(text);
    if (amountDue === null) {
        console.error('Failed to extract amount due from OCR');
        return null;
    }

    const datePatterns = [
        /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/, 
        /\b\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}\b/
    ];

    const dates = extractDates(text, datePatterns);
    const currentDate = new Date();
    let invoiceDate: Date | null = null;
    let dueDate: Date | null = null;

    dates.forEach(date => {
        if (date < currentDate) {
            if (!invoiceDate || date > invoiceDate) {
                invoiceDate = date;
            }
        } else {
            if (!dueDate || date < dueDate) {
                dueDate = date;
            }
        }
    });

    return {
        invoice_id: uuidv4(),
        invoice_amount: amountDue.toString(),
        invoice_date: invoiceDate || currentDate,
        due_date: dueDate || currentDate,
        merchant_name: merchant[0] || text.split(' ')[0]
    };
};

// Process file and extract data
const processFile = async (file: File): Promise<FormData | null> => {
    const text = file.type === 'application/pdf' 
        ? await pdfToText(file)
        : (await Tesseract.recognize(file, 'eng')).data.text;

    return extractDataFromOcr(text);
};

export { processFile };