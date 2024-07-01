import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './ArrowButtonArrow_ButtonArrowRi.module.css';
import { VectorIcon } from './VectorIcon';

interface Props {
  className?: string;
}
/* @figmaId 140:15 */
export const ArrowButtonArrow_ButtonArrowRi: FC<Props> = memo(function ArrowButtonArrow_ButtonArrowRi(props = {}) {
  return (
    <button className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.vector}>
        <VectorIcon className={classes.icon} />
      </div>
    </button>
  );
});
