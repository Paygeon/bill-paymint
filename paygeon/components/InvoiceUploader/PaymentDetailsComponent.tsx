import React, { useState } from 'react';
import CopyButton from './copyButton';
import NeoPopTiltedButton from '../NeoPOPTiltedButton/NeoPOPTiltedButton';

interface FormData {
    invoice_id: string;
    invoice_amount: string;
    invoice_date: Date | null;
    due_date: Date | null;
    merchant_name: string;
}

interface PaymentDetailsProps {
    data: FormData;
    paymentAmount: number;
    crypto: string;
    cryptoPaymentAmount: number | null;
    paymentAddress: string;
    paymentStatus: number;
    handlePayment: (data: FormData, crypto: string) => void;
    handleConfirmPayment: () => void;
}

const PaymentDetailsComponent: React.FC<PaymentDetailsProps> = ({ data, paymentAmount, crypto, cryptoPaymentAmount, paymentAddress, paymentStatus, handlePayment, handleConfirmPayment }) => {

    const [dropdownCrypto, setDropdownCrypto] = useState<string>('btc');

    const handleCryptoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const crypto = event.target.value;
        setDropdownCrypto(crypto);
        handlePayment(data, crypto)
    }

    return (
        <div>
            {paymentAmount && (
                <div>
                    <hr className='separating-line' />
                    <div className="display-text">
                        <h2 className="text-xl font-bold">Paying To:</h2>
                        <pre className="whitespace-pre-wrap">{data.merchant_name}</pre>
                        <h2 className="text-xl font-bold">Invoice Amount:</h2>
                        <pre className="whitespace-pre-wrap">$ {parseFloat(data.invoice_amount).toFixed(2)}</pre>
                        <h2 className="text-xl font-bold">Total Amount:</h2>
                        <pre className="whitespace-pre-wrap">$ {paymentAmount.toFixed(2)}</pre>
                    </div>
                </div>
            )}
            {cryptoPaymentAmount && (
                <div>
                    <hr className='separating-line' />
                    <div className="display-text">
                        <h2 className="text-xl font-bold">Choose crypto to pay with: </h2>
                        <select className="dropdown-options" id="cryptoOptions" value={dropdownCrypto} onChange={handleCryptoChange}>
                            <option value="btc">Bitcoin (BTC)</option>
                            <option value="ltc">Litecoin (LTC)</option>
                            <option value="eth">Ethereum (ETH)</option>
                            <option value="doge">Dogecoin (DOGE)</option>
                            <option value="trx">TRX</option>
                        </select>
                    </div>
                    <div className="display-text">
                        <h2 className="text-xl font-bold">Total Amount:</h2>
                        <pre className="whitespace-pre-wrap">{cryptoPaymentAmount} {crypto.toUpperCase()}</pre>
                    </div>
                </div>
            )}
            {paymentAddress && (
                <div>
                    <hr className="separating-line" />
                    <div className="display-text">
                        <h2 className="text-xl font-bold">Pay to the Following Address:</h2>
                        <div className="border border-white rounded-[0.5em] mt-4 text-black flex items-center overflow-hidden">
                            <p title={paymentAddress} className="whitespace-nowrap overflow-hidden text-ellipsis text-white flex-1 pl-3 pr-1">{paymentAddress}</p>
                            <CopyButton textToCopy={paymentAddress} />
                        </div>
                    </div>
                    <hr className="separating-line" />
                    <NeoPopTiltedButton onClick={handleConfirmPayment} disabled={paymentStatus != 0} className="w-23">
                        {paymentStatus == 0 ? "Confirm Payment" : paymentStatus == 1 ?
                            <svg>
                            </svg> : paymentStatus == 2 ? "Success" : "Failed. Please Try Again."}
                    </NeoPopTiltedButton>
                </div>

            )}
        </div>
    );
};

export default PaymentDetailsComponent;