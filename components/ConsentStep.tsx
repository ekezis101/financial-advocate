
import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ConsentStepProps {
  onAgree: () => void;
}

const ConsentStep: React.FC<ConsentStepProps> = ({ onAgree }) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-green-light mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-brand-dark">Your Consent is Important</h2>
      <p className="text-brand-gray mt-2 mb-6">
        To provide you with a clear view of your financial identity, Adevo needs to securely access your information using your BVN.
      </p>
      <ul className="text-left space-y-3 text-brand-gray mb-8">
        <li className="flex items-start">
          <CheckCircleIcon className="w-5 h-5 text-brand-green mr-3 mt-1 flex-shrink-0" />
          <span>We access your basic KYC data (Name, DOB, Phone Number) and linked bank accounts.</span>
        </li>
        <li className="flex items-start">
          <CheckCircleIcon className="w-5 h-5 text-brand-green mr-3 mt-1 flex-shrink-0" />
          <span>We <span className="font-bold">do not</span> access your account balances, transactions, or passwords.</span>
        </li>
        <li className="flex items-start">
          <CheckCircleIcon className="w-5 h-5 text-brand-green mr-3 mt-1 flex-shrink-0" />
          <span>Your data is encrypted and handled in compliance with NDPA regulations.</span>
        </li>
      </ul>
      <button
        onClick={onAgree}
        className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
      >
        I Agree & Continue
      </button>
    </div>
  );
};

export default ConsentStep;
