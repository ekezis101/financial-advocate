
import React, { useState } from 'react';

interface ReviewLetterStepProps {
  letterContent: string;
  onConfirm: () => void;
  onGoBack: () => void;
}

const ReviewLetterStep: React.FC<ReviewLetterStepProps> = ({ letterContent, onConfirm, onGoBack }) => {
    const [editedContent, setEditedContent] = useState(letterContent);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-dark text-center">Review Your Complaint Letter</h2>
      <p className="text-brand-gray mt-2 mb-6 text-center">
        Our AI has drafted this letter. You can make edits below before sending.
      </p>
      
      <div className="mb-4">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={15}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green bg-gray-50/50 font-mono text-sm"
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3">
        <button
          onClick={onGoBack}
          className="w-full sm:w-auto flex-1 bg-gray-200 text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-gray-300"
        >
          Back to Form
        </button>
        <button
          onClick={onConfirm}
          className="w-full sm:w-auto flex-1 bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700"
        >
          Confirm & Submit Dispute
        </button>
      </div>
    </div>
  );
};

export default ReviewLetterStep;
