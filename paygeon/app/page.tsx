'use client';

import CameraLottie from '@/components/animation/CameraLottie';
import InvoiceUploader from '../components/InvoiceUploader/InvoiceUploader';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Upload Invoice</h1>
      <InvoiceUploader />
    </div>
  );
}
