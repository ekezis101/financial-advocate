
import React, { useState } from 'react';
import OnboardingFlow from './components/OnboardingFlow';
import DisputeFlow from './components/dispute/DisputeFlow';
import { BvnData } from './types';

const App: React.FC = () => {
  const [bvnData, setBvnData] = useState<BvnData | null>(null);
  const [isDisputeMode, setIsDisputeMode] = useState(false);

  const handleOnboardingComplete = (data: BvnData) => {
    setBvnData(data);
  };

  const handleStartDispute = () => {
    if (bvnData) {
      setIsDisputeMode(true);
    }
  };

  const handleExitDispute = () => {
    setIsDisputeMode(false);
  }

  return (
    <div className="min-h-screen bg-brand-green-light flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-brand-dark">Adevo</h1>
        <p className="text-lg text-brand-gray mt-1">Your Financial Advocate</p>
      </header>
      <main className="w-full max-w-lg">
        {isDisputeMode && bvnData ? (
          <DisputeFlow userBvnData={bvnData} onExit={handleExitDispute} />
        ) : (
          <OnboardingFlow 
            onOnboardingComplete={handleOnboardingComplete} 
            onStartDispute={handleStartDispute}
            initialBvnData={bvnData}
          />
        )}
      </main>
      <footer className="text-center mt-8 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Adevo. Built for Nigeria.</p>
      </footer>
    </div>
  );
};

export default App;
