import { memo, SVGProps } from 'react';

const HShadowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 227 2' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M8.74228e-08 0L2.00001 2L2 2.6827e-07L8.74228e-08 0Z' fill='#8A8A8A' />
    <rect x={2.00001} width={223} height={2} fill='#8A8A8A' />
    <path d='M225 2V0L227 1.99986L225 2Z' fill='#8A8A8A' />
  </svg>
);

const Memo = memo(HShadowIcon);
export { Memo as HShadowIcon };
