'use client';

import { useEffect, useRef } from 'react';

const StoreezWidget: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Create the script element
    scriptRef.current = document.createElement('script');
    scriptRef.current.src = 'https://api.storeez.app/widget6e5b310d1e199524.js';
    scriptRef.current.async = true;

    // Append the script to the document body
    document.body.appendChild(scriptRef.current);

    // Clean up the script element on component unmount
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  return <div ref={widgetRef} data-storeez-id="widget-6e5b310d1e199524"></div>;
};

export default StoreezWidget;
