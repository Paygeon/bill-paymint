"use client";
import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import { ArrowButtonArrow_ButtonArrowRi } from '../ArrowButtonArrow_ButtonArrowRi/ArrowButtonArrow_ButtonArrowRi';
import { BillStatusTagsDueInDays } from '../BillStatusTagsDueInDays/BillStatusTagsDueInDays';
import classes from './BillCards_CardTataAIA.module.css';
import { HShadowIcon } from './HShadowIcon';
import { PatternHolderIcon } from './PatternHolderIcon';
import { VShadowIcon } from './VShadowIcon';

interface FormData {
  invoice_id: string;
  invoice_amount: string;
  invoice_date: Date | null;
  due_date: Date | null;
  merchant_name: string;
}

interface Props {
  className?: string;
  classes?: {
    rectangle2563?: string;
    root?: string;
  };
  swap?: {
    patternHolder?: ReactNode;
  };
  invoiceData: {
    invoice_id: string;
    invoice_amount: string;
    invoice_date: Date | null;
    due_date: Date | null;
    merchant_name: string;
  };
  paymentFunction: (data: FormData) => void;
}
/* @figmaId 152:633 */
export const BillCards_CardTataAIA: FC<Props> = memo(function BillCards_CardTataAIA({
  className,
  classes: propClasses,
  swap,
  invoiceData,
  paymentFunction
}) {
  return (
    <div className={`${resets.clapyResets} ${propClasses?.root || ''} ${className || ''} ${classes.root}`}>
      <div className={classes.patternHolder}>
        {swap?.patternHolder || <PatternHolderIcon className={classes.icon} />}
      </div>
      <div className={classes.frame11209}>
        <div className={classes.frame11208}>
          <div className={classes.frame11204}>
            <div className={classes.hubspot}>{invoiceData.merchant_name}</div>
            <div className={classes.frame11205}>
              <div className={classes.iNV352456}>{invoiceData.invoice_id}</div>
              <div className={classes.nET15}>{invoiceData.invoice_date ? new Date(invoiceData.invoice_date).toLocaleDateString() : 'No Date'}</div>
            </div>
          </div>
          <div className={`${propClasses?.rectangle2563 || ''} ${classes.rectangle2563}`}></div>
        </div>
        <div className={classes.frame11216}>
          <div className={classes.cTADueWarning}>
            <BillStatusTagsDueInDays
              text={{
                dUEIn3Days: <div className={classes.dUEIn3Days}>
                {invoiceData.due_date ? (
                  (() => {
                    const dueDate = new Date(invoiceData.due_date!);
                    const currentDate = new Date();
                    const diffTime = dueDate.getTime() - currentDate.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
                    if (diffDays === 0) {
                      return 'Due today';
                    } else if (diffDays === 1) {
                      return 'Due tomorrow';
                    } else {
                      return `Due in ${diffDays} days`;
                    }
                  })()
                ) : (
                  'Due date not available'
                )}
              </div>,
              }}
            />
            <div className={classes._1541}>${parseFloat(invoiceData.invoice_amount).toFixed(2)}</div>
          </div>
          <div className={classes.paymentCTA}>
            <div className={classes.frame11210}>
              <div className={classes.frame11215} onClick = {() => paymentFunction(invoiceData)}>
                <div className={classes.frame11212}>
                  <div className={classes.makePayment}>Make Payment</div>
                  <ArrowButtonArrow_ButtonArrowRi />
                </div>
                <div className={classes.frame11211}>
                  <div className={classes.earn152Points}>Earn 152 points</div>
                </div>
              </div>
            </div>
            <div className={classes.frame11214}>
              <div className={classes.rectangle2564}></div>
              <div className={classes.rectangle2565}></div>
              <div className={classes.rectangle2566}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.vShadow}>
        <VShadowIcon className={classes.icon2} />
      </div>
      <div className={classes.hShadow}>
        <HShadowIcon className={classes.icon3} />
      </div>
    </div>
  );
});