import React from 'react';
import { DisputeDetails, DisputeStatus } from '../../types';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import ClockIcon from '../icons/ClockIcon';

interface StatusDisplayStepProps {
  details: DisputeDetails;
  onExit: () => void;
}

const getStatusStyles = (status?: DisputeStatus) => {
    switch (status) {
        case DisputeStatus.Pending:
            return {
                icon: <ClockIcon className="w-5 h-5" />,
                text: 'Pending',
                className: 'bg-yellow-100 text-yellow-800',
            };
        // Add other cases for Resolved, Rejected etc. in the future
        default:
            return {
                icon: <ClockIcon className="w-5 h-5" />,
                text: 'Pending',
                className: 'bg-yellow-100 text-yellow-800',
            };
    }
};

const StatusDisplayStep: React.FC<StatusDisplayStepProps> = ({ details, onExit }) => {
    const statusInfo = getStatusStyles(details.status);

    return (
        <div className="text-center p-4 animate-fade-in">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-green-light mb-4">
                <CheckCircleIcon className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark">Dispute Submitted</h3>
            <p className="text-brand-gray mt-2 mb-6">Your complaint has been logged. We will notify you of any updates from the bank.</p>
            
            <div className="bg-gray-50 border rounded-lg text-left p-4 space-y-3 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-brand-gray">Status</span>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.className}`}>
                        {statusInfo.icon}
                        {statusInfo.text}
                    </span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-brand-gray">Bank</span>
                    <span className="font-semibold text-brand-dark">{details.bankName}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-brand-gray">Amount</span>
                    <span className="font-semibold text-brand-dark">NGN {details.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-brand-gray">Transaction ID</span>
                    <span className="font-mono text-sm text-brand-dark">{details.transactionId}</span>
                </div>
            </div>

            <button onClick={onExit} className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors">
                Back to Dashboard
            </button>
        </div>
    );
};

export default StatusDisplayStep;
