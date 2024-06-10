"use client"
import React, { useState, useEffect, useRef } from 'react';
import InvoiceUploader from '@/components/InvoiceUploader/InvoiceUploader';
import RootLayout from './layout'

const App: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWidgetLoad = () => {
      console.log('Widget loaded');
      // Widget is loaded and ready, you can perform any necessary actions here
    };

    const widgetElement = widgetRef.current;
    if (widgetElement) {
      widgetElement.addEventListener('load', handleWidgetLoad);
      return () => {
        widgetElement.removeEventListener('load', handleWidgetLoad);
      };
    }
  }, []);

  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {/* Storeez Widget Container */}
        <div ref={widgetRef} data-storeez-id="widget-6e5b310d1e199524"></div>
        <h1 className="text-3xl font-bold mb-4">Upload Invoice</h1>
        <InvoiceUploader />
      </div>
    </RootLayout>
  );
};
export default App;
