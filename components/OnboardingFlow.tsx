
import React, { useState, useCallback, useEffect } from 'react';
import { OnboardingStep, BvnData } from '../types';
import ConsentStep from './ConsentStep';
import BvnInputStep from './BvnInputStep';
import DashboardStep from './DashboardStep';
import { fetchBvnDetails } from '../services/bvnService';

interface OnboardingFlowProps {
  onOnboardingComplete: (data: BvnData) => void;
  onStartDispute: () => void;
  initialBvnData: BvnData | null;
}


const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onOnboardingComplete, onStartDispute, initialBvnData }) => {
  const [step, setStep] = useState<OnboardingStep>(initialBvnData ? OnboardingStep.Dashboard : OnboardingStep.Consent);
  const [bvnData, setBvnData] = useState<BvnData | null>(initialBvnData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialBvnData) {
      setBvnData(initialBvnData);
      setStep(OnboardingStep.Dashboard);
    }
  }, [initialBvnData]);


  const handleConsent = useCallback(() => {
    setStep(OnboardingStep.BvnInput);
  }, []);

  const handleBvnSubmit = useCallback(async (bvn: string) => {
    setStep(OnboardingStep.Loading);
    setError(null);
    try {
      const data = await fetchBvnDetails(bvn);
      setBvnData(data);
      onOnboardingComplete(data);
      setStep(OnboardingStep.Dashboard);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setStep(OnboardingStep.Error);
    }
  }, [onOnboardingComplete]);
  
  const handleReset = useCallback(() => {
    setBvnData(null);
    setError(null);
    setStep(OnboardingStep.BvnInput);
  }, []);


  const renderStep = () => {
    switch (step) {
      case OnboardingStep.Consent:
        return <ConsentStep onAgree={handleConsent} />;
      case OnboardingStep.BvnInput:
        return <BvnInputStep onSubmit={handleBvnSubmit} />;
      case OnboardingStep.Loading:
        return <BvnInputStep onSubmit={handleBvnSubmit} isLoading={true} />;
      case OnboardingStep.Dashboard:
        return bvnData ? <DashboardStep data={bvnData} onReset={handleReset} onFileDispute={onStartDispute}/> : <p>Loading data...</p>;
      case OnboardingStep.Error:
        return <BvnInputStep onSubmit={handleBvnSubmit} error={error} />;
      default:
        return <p>An unexpected error has occurred.</p>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-500">
      {renderStep()}
    </div>
  );
};

export default OnboardingFlow;
