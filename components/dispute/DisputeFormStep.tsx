
import React, { useState } from 'react';
import { LinkedAccount, DisputeDetails, BankName } from '../../types';
import UploadIcon from '../icons/UploadIcon';

interface DisputeFormStepProps {
  linkedAccounts: LinkedAccount[];
  onSubmit: (details: DisputeDetails) => void;
  onCancel: () => void;
}

const DisputeFormStep: React.FC<DisputeFormStepProps> = ({ linkedAccounts, onSubmit, onCancel }) => {
  const [details, setDetails] = useState<DisputeDetails>({
    transactionId: '',
    amount: 0,
    bankName: linkedAccounts[0]?.bankName || 'Other',
    transactionDate: '',
    description: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setDetails(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDetails(prev => ({ ...prev, evidenceFile: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.transactionId || details.amount <= 0 || !details.transactionDate || !details.description) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setFormError(null);
    onSubmit(details);
  };

  const bankOptions = linkedAccounts.map(acc => acc.bankName).filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-dark text-center">Submit a Dispute</h2>
      <p className="text-brand-gray mt-2 mb-6 text-center">
        Provide details about the failed transfer.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium text-brand-dark mb-1">Bank Name</label>
          <select name="bankName" id="bankName" value={details.bankName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green bg-white">
            {bankOptions.map(b => <option key={b} value={b}>{b}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-brand-dark mb-1">Amount (NGN)</label>
                <input type="number" name="amount" id="amount" value={details.amount || ''} onChange={handleChange} placeholder="e.g., 5000" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
            <div>
                <label htmlFor="transactionDate" className="block text-sm font-medium text-brand-dark mb-1">Transaction Date</label>
                <input type="date" name="transactionDate" id="transactionDate" value={details.transactionDate} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
        </div>
        <div>
          <label htmlFor="transactionId" className="block text-sm font-medium text-brand-dark mb-1">Transaction ID / Reference</label>
          <input type="text" name="transactionId" id="transactionId" value={details.transactionId} onChange={handleChange} placeholder="Enter the transaction reference" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-brand-dark mb-1">Describe What Happened</label>
          <textarea name="description" id="description" value={details.description} onChange={handleChange} rows={3} placeholder="e.g., I sent money to a friend but they did not receive it." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"></textarea>
        </div>
        <div>
            <label htmlFor="evidenceFile" className="block text-sm font-medium text-brand-dark mb-1">Upload Evidence (Optional)</label>
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-brand-dark rounded-lg shadow-sm tracking-wide border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 hover:border-brand-green">
                <UploadIcon className="w-8 h-8"/>
                <span className="mt-2 text-base leading-normal">{details.evidenceFile ? details.evidenceFile.name : 'Select a file (e.g., screenshot)'}</span>
                <input type='file' id="evidenceFile" name="evidenceFile" onChange={handleFileChange} className="hidden" />
            </label>
        </div>
        {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button type="button" onClick={onCancel} className="w-full sm:w-auto flex-1 bg-gray-200 text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-gray-300">
                Cancel
            </button>
            <button type="submit" className="w-full sm:w-auto flex-1 bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">
                Generate Complaint Letter
            </button>
        </div>
      </form>
    </div>
  );
};

export default DisputeFormStep;
