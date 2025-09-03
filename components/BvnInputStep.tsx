import React, { useState } from 'react';
import Spinner from './common/Spinner';
import XCircleIcon from './icons/XCircleIcon';

interface BvnInputStepProps {
  onSubmit: (bvn: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const BvnInputStep: React.FC<BvnInputStepProps> = ({ onSubmit, isLoading = false, error = null }) => {
  const [bvn, setBvn] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and limit length to 11
    if (/^\d*$/.test(value) && value.length <= 11) {
      setBvn(value);
      if (formError) setFormError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bvn.length !== 11) {
      setFormError('BVN must be exactly 11 digits.');
      return;
    }
    onSubmit(bvn);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-dark text-center">Link Your BVN</h2>
      <p className="text-brand-gray mt-2 mb-6 text-center">
        Enter your Bank Verification Number to securely view your financial identity.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bvn" className="block text-sm font-medium text-brand-dark mb-1">
            Bank Verification Number (BVN)
          </label>
          <input
            type="tel"
            id="bvn"
            value={bvn}
            onChange={handleChange}
            placeholder="Enter your 11-digit BVN"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
            disabled={isLoading}
            autoComplete="off"
            aria-invalid={!!(formError || error)}
            aria-describedby="bvn-error"
          />
        </div>
        
        {(formError || error) && (
            <div id="bvn-error" className="bg-red-50 p-4 rounded-lg mb-4 flex items-start space-x-3" role="alert">
                <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"/>
                <div>
                    <h3 className="font-bold text-red-800 text-sm">Submission Failed</h3>
                    <p className="text-red-700 text-sm">{formError || error}</p>
                </div>
            </div>
        )}

        <button
          type="submit"
          disabled={isLoading || bvn.length !== 11}
          className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <Spinner /> : 'Fetch My Details'}
        </button>
      </form>
    </div>
  );
};

export default BvnInputStep;