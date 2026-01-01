'use client';

import { CheckCircle2 } from 'lucide-react';

export default function InterviewCompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-bold text-black mb-4">
          Interview Completed!
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Thank you for completing the AI interview assessment.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-700 mb-2">
             Your responses have been submitted successfully
          </p>
          
        </div>
        
        <p className="text-sm text-gray-500">
          You can now safely close this window.
        </p>
      </div>
    </div>
  );
}
