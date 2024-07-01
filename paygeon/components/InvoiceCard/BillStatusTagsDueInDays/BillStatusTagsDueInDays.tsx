import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './BillStatusTagsDueInDays.module.css';

interface Props {
  className?: string;
  text?: {
    dUEIn3Days?: ReactNode;
  };
}
/* @figmaId 152:622 */
export const BillStatusTagsDueInDays: FC<Props> = memo(function BillStatusTagsDueInDays(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      {props.text?.dUEIn3Days != null ? (
        props.text?.dUEIn3Days
      ) : (
        <div className={classes.dUEIn3Days}>DUE In 3 days</div>
      )}
    </div>
  );
});
