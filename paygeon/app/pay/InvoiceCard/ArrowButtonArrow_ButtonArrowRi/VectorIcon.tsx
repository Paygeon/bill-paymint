import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 20 8' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M-6.58788e-08 3.24996L-0.75 3.24996L-0.75 4.74996L6.58788e-08 4.74996L-6.58788e-08 3.24996ZM6.58788e-08 4.74996L19 4.74996L19 3.24996L-6.58788e-08 3.24996L6.58788e-08 4.74996ZM15.379 3.1726e-08C15.379 2.59998 17.4249 4.75 20 4.75L20 3.25C18.2993 3.25 16.879 1.8183 16.879 -3.1726e-08L15.379 3.1726e-08ZM20 3.25C17.4249 3.25 15.3789 5.39999 15.3789 8H16.8789C16.8789 6.18172 18.2993 4.75 20 4.75V3.25Z'
      fill='white'
    />
  </svg>
);

const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
