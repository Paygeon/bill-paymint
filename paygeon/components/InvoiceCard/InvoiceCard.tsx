import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { BillCards_CardTataAIA } from './BillCards_CardTataAIA/BillCards_CardTataAIA';
import classes from './Frame11981.module.css';
import { PatternHolderIcon } from './PatternHolderIcon';

interface FormData {
  invoice_id: string;
  invoice_amount: string;
  invoice_date: Date | null;
  due_date: Date | null;
  merchant_name: string;
}

interface Props {
  invoiceData: {
    invoice_id: string;
    invoice_amount: string;
    invoice_date: Date | null;
    due_date: Date | null;
    merchant_name: string;
  };

  paymentFunction: (data: FormData) => void;
}

/* @figmaId 2603:2301 */
export const InvoiceCard: FC<Props> = memo(function InvoiceCard({ invoiceData, paymentFunction }) { 
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <BillCards_CardTataAIA
        className={classes.billCards}
        classes={{ rectangle2563: classes.rectangle2563 }}
        swap={{
          patternHolder: <PatternHolderIcon className={classes.icon} />,
        }}
        invoiceData={invoiceData} paymentFunction={paymentFunction}
      />
    </div>
  );
});
