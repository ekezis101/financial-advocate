import React, { useState, useEffect } from 'react';
import { BvnData, AdevoScoreResult } from '../types';
import { calculateAdevoScore } from '../services/scoreService';
import UserIcon from './icons/UserIcon';
import PhoneIcon from './icons/PhoneIcon';
import BankIcon from './icons/BankIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ScoreCircle from './common/ScoreCircle';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface DashboardStepProps {
  data: BvnData;
  onReset: () => void;
  onFileDispute: () => void;
}

const maskAccountNumber = (accountNumber: string): string => {
  if (accountNumber.length <= 4) return '****';
  return '******' + accountNumber.slice(-4);
};

const DataRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-b-0">
        <div className="text-brand-green mr-4 mt-1 flex-shrink-0">{icon}</div>
        <div>
            <p className="text-sm text-brand-gray">{label}</p>
            <p className="font-semibold text-brand-dark break-words">{value}</p>
        </div>
    </div>
);


const DashboardStep: React.FC<DashboardStepProps> = ({ data, onReset, onFileDispute }) => {
  const [isAccountsVisible, setIsAccountsVisible] = useState(true);
  const [scoreData, setScoreData] = useState<AdevoScoreResult | null>(null);

  useEffect(() => {
    // Calculate score when component mounts or data changes
    const score = calculateAdevoScore(data);
    setScoreData(score);
  }, [data]);

  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-brand-green';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-dark text-center">Your Financial Identity</h2>
      <p className="text-brand-gray mt-2 mb-6 text-center">
        This is a summary of your financial health and security based on your BVN data.
      </p>

      {/* --- Adevo Score Section --- */}
      {scoreData && (
        <div className="bg-brand-green-light rounded-lg p-4 mb-6 border border-brand-green/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-shrink-0">
                  <ScoreCircle score={scoreData.adevoScore} />
              </div>
              <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-brand-dark">Your Adevo Score</h3>
                  <p className="text-brand-gray mt-1">This score represents a blend of your financial health and security. A higher score indicates a stronger financial standing.</p>
                  <div className="flex justify-center md:justify-start gap-4 mt-3">
                      <div>
                          <p className="text-sm text-brand-gray">Health</p>
                          <p className={`text-xl font-bold ${getScoreColorClass(scoreData.healthScore)}`}>{scoreData.healthScore}/100</p>
                      </div>
                       <div>
                          <p className="text-sm text-brand-gray">Security</p>
                          <p className={`text-xl font-bold ${getScoreColorClass(scoreData.securityScore)}`}>{scoreData.securityScore}/100</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      )}
      
      {/* --- Recommendations Section --- */}
      {scoreData && scoreData.recommendations.length > 0 && (
          <div className="mb-6">
               <h3 className="text-lg font-semibold text-brand-dark mb-2 flex items-center">
                   <ShieldCheckIcon className="w-6 h-6 mr-2 text-brand-green"/>
                   Actionable Recommendations
               </h3>
               <div className="space-y-2 text-brand-dark bg-gray-50/70 border rounded-lg p-4">
                   {scoreData.recommendations.map((rec, index) => (
                       <p key={index} className="text-sm flex items-start">
                           <span className="text-brand-green mr-2 mt-1">✓</span>
                           {rec}
                       </p>
                   ))}
               </div>
          </div>
      )}

      {/* --- Personal Details & Accounts Section --- */}
      <h3 className="text-lg font-semibold text-brand-dark mb-2">
          Your Information
      </h3>
      <div className="bg-gray-50/50 rounded-lg p-4 border mb-6">
        <DataRow 
            icon={<UserIcon className="w-5 h-5"/>} 
            label="Full Name" 
            value={`${data.firstName} ${data.middleName} ${data.lastName}`} 
        />
        <DataRow 
            icon={<PhoneIcon className="w-5 h-5"/>} 
            label="Registered Phone Number" 
            value={data.phoneNumber} 
        />
      </div>

      <div className="mt-6">
        <button
          onClick={() => setIsAccountsVisible(!isAccountsVisible)}
          className="w-full text-left text-lg font-semibold text-brand-dark mb-2 flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
          aria-expanded={isAccountsVisible}
          aria-controls="linked-accounts-list"
        >
          <div className="flex items-center">
              <BankIcon className="w-5 h-5 mr-2 text-brand-green"/>
              Linked Bank Accounts ({data.linkedAccounts.length})
          </div>
          <ChevronDownIcon
            className={`w-5 h-5 text-brand-gray transform transition-transform duration-300 ${isAccountsVisible ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
        
        {isAccountsVisible && (
          <div id="linked-accounts-list" className="space-y-3 max-h-60 overflow-y-auto pr-2 py-2">
              {data.linkedAccounts.map((account, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:border-brand-green transition-all duration-200 cursor-default">
                      <div className="flex-shrink-0 bg-brand-green-light p-3 rounded-full mr-4">
                          <BankIcon className="w-5 h-5 text-brand-green"/>
                      </div>
                      <div className="flex-grow">
                          <p className="font-semibold text-brand-dark text-base">{account.bankName}</p>
                          <p className="text-sm text-brand-gray font-mono tracking-wider">{maskAccountNumber(account.accountNumber)}</p>
                      </div>
                  </div>
              ))}
          </div>
        )}
      </div>
      
      <div className="mt-8 space-y-3">
         <button
          onClick={onFileDispute}
          className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
        >
          File a Dispute
        </button>
        <button
          onClick={onReset}
          className="w-full bg-gray-200 text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
        >
          Check Another BVN
        </button>
      </div>

    </div>
  );
};

export default DashboardStep;
