import React, { useState, useCallback } from 'react';
import { BvnData, DisputeDetails, DisputeStep, DisputeStatus } from '../../types';
import { generateDisputeLetter } from '../../services/aiService';
import DisputeFormStep from './DisputeFormStep';
import ReviewLetterStep from './ReviewLetterStep';
import StatusDisplayStep from './StatusDisplayStep';
import Spinner from '../common/Spinner';
import XCircleIcon from '../icons/XCircleIcon';

interface DisputeFlowProps {
  userBvnData: BvnData;
  onExit: () => void;
}

const DisputeFlow: React.FC<DisputeFlowProps> = ({ userBvnData, onExit }) => {
  const [step, setStep] = useState<DisputeStep>(DisputeStep.Form);
  const [disputeDetails, setDisputeDetails] = useState<DisputeDetails | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const handleFormSubmit = useCallback(async (details: DisputeDetails) => {
    setDisputeDetails(details);
    setStep(DisputeStep.GeneratingLetter);
    setError(null);
    try {
      const letter = await generateDisputeLetter(userBvnData, details);
      setGeneratedLetter(letter);
      setStep(DisputeStep.ReviewLetter);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred while generating the letter.';
      setError(message);
      setStep(DisputeStep.Error);
    }
  }, [userBvnData]);

  const handleBackToForm = useCallback(() => {
    setStep(DisputeStep.Form);
  }, []);

  const handleConfirmation = useCallback(() => {
    if (disputeDetails) {
      // Set the initial status to Pending
      const finalDisputeDetails = { ...disputeDetails, status: DisputeStatus.Pending };
      setDisputeDetails(finalDisputeDetails);
      // In a real app, this would trigger an email sending service
      setStep(DisputeStep.StatusDisplay);
    }
  }, [disputeDetails]);

  const renderStep = () => {
    switch (step) {
      case DisputeStep.Form:
        return (
          <DisputeFormStep
            linkedAccounts={userBvnData.linkedAccounts}
            onSubmit={handleFormSubmit}
            onCancel={onExit}
          />
        );
      case DisputeStep.GeneratingLetter:
        return (
            <div className="text-center p-8">
                <Spinner />
                <h3 className="text-xl font-semibold text-brand-dark mt-4">Drafting Your Letter...</h3>
                <p className="text-brand-gray mt-2">Our AI advocate is preparing a professional complaint based on the details you provided.</p>
            </div>
        );
      case DisputeStep.ReviewLetter:
        return (
          <ReviewLetterStep
            letterContent={generatedLetter}
            onConfirm={handleConfirmation}
            onGoBack={handleBackToForm}
          />
        );
      case DisputeStep.StatusDisplay:
          return disputeDetails ? (
              <StatusDisplayStep
                  details={disputeDetails}
                  onExit={onExit}
              />
          ) : <p>Loading confirmation...</p>;
      case DisputeStep.Error:
          return (
            <div className="text-center p-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <XCircleIcon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">Letter Generation Failed</h3>
                <p className="text-brand-gray mt-2 mb-6">{error || 'An unexpected error occurred. Please check your connection and try again.'}</p>
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                    <button onClick={onExit} className="w-full sm:w-auto flex-1 bg-gray-200 text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-gray-300">
                        Cancel Dispute
                    </button>
                    <button onClick={handleBackToForm} className="w-full sm:w-auto flex-1 bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">
                        Try Again
                    </button>
                </div>
            </div>
          )
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

export default DisputeFlow;