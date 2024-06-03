"use client"
// Import necessary modules/components
import React, { useState } from 'react';
import InvoiceUploader from '../components/InvoiceUploader/InvoiceUploader';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import { BottomSheetProvider, useBottomSheet } from '../context/BottomSheetContext'; // Import BottomSheetProvider and useBottomSheet
import BottomSheet from '../components/BottomSheet'; // Import or define BottomSheet component
import BottomMenu from '@/components/BottomMenu';


// Dynamically import MoonPayProvider and MoonPayBuyWidget
const MoonPayProvider = dynamic(
  () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayProvider),
  { ssr: false },
);

const MoonPayBuyWidget = dynamic(
  () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayBuyWidget),
  { ssr: false },
);

// Define App component
const App: React.FC = () => {
  return (
    <BottomSheetProvider> {/* Ensure BottomSheetProvider wraps around components using useBottomSheet */}
      <AppContent />
      <br />
      <br />
      <br />
      <br />
      <BottomMenu />
    </BottomSheetProvider>
  );
};

// Define AppContent component
const AppContent: React.FC = () => {
  const { openSheet } = useBottomSheet();
  const [isVisible, setIsVisible] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState<React.ReactNode>(null);

  // Define function to handle opening bottom sheet
  const handleOpenBottomSheet = (content: React.ReactNode) => {
    setBottomSheetContent(content);
    setIsVisible(true);
  };

  // Define function to handle closing bottom sheet
  const handleCloseBottomSheet = () => {
    setIsVisible(false);
    setBottomSheetContent(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Upload Invoice</h1>
      <MoonPayProvider
        apiKey="pk_test_NWjOGREvFvtTnJGEguH56nuNXcUK8J"
        debug
      >
        <InvoiceUploader />
        <div className="card-status-container">
          <button onClick={() => handleOpenBottomSheet(
            <MoonPayBuyWidget
              variant="embedded"
              baseCurrencyCode="usd"
              baseCurrencyAmount="100"
              defaultCurrencyCode="eth"
              visible
            />
          )}>
            <span className="card-status-text">Pay more</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecc0b05a8f663d59e79f625e990bef18268be3db9cf01bde057680b4fec7e0ee?apiKey=aa19eef6d1f1473ba394866de3aadd86&"
              alt="Right arrow icon"
              className="card-status-icon"
            />
          </button>
        </div>
      </MoonPayProvider>
      {/* Render BottomSheet component here with necessary props */}
      <BottomSheet isVisible={isVisible} content={bottomSheetContent} onClose={handleCloseBottomSheet} />
    </div>
  );
};

export default App;
