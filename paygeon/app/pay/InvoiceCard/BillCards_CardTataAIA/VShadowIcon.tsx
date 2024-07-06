import { memo, SVGProps } from 'react';

const VShadowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 2 300' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M2 2L-6.28631e-06 2.94845e-06L8.34465e-07 2L2 2Z' fill='#D2D2D2' />
    <rect x={2} y={2} width={296} height={1.99999} transform='rotate(90 2 2)' fill='#D2D2D2' />
    <path d='M1.99999 298V300L-0.000106812 298L1.99999 298Z' fill='#D2D2D2' />
  </svg>
);

const Memo = memo(VShadowIcon);
export { Memo as VShadowIcon };
