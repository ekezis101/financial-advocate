
import { BvnData, DisputeDetails } from '../types';

/**
 * ## AI-Powered Complaint Letter Generation
 *
 * This function simulates a call to a Large Language Model (LLM) like Google's Gemini
 * to draft a professional and effective dispute letter.
 *
 * @param userBvnData The user's verified BVN information.
 * @param disputeDetails The specific details of the failed transaction provided by the user.
 * @returns A promise that resolves to a string containing the drafted complaint letter.
 */
export const generateDisputeLetter = (
  userBvnData: BvnData,
  disputeDetails: DisputeDetails
): Promise<string> => {
  // --- DETAILED PROMPT TEMPLATE FOR THE LLM ---
  const prompt = `
    **Act as 'Adevo', a professional, calm, and assertive financial advocate representing a Nigerian bank customer.**

    **Your Task:** Generate a formal email of complaint to a bank regarding a failed funds transfer. The funds were debited from the customer's account but never received by the beneficiary.

    **Customer Information:**
    - Name: ${userBvnData.firstName} ${userBvnData.lastName}
    - Registered Phone Number: ${userBvnData.phoneNumber}

    **Transaction Details:**
    - Bank Name: ${disputeDetails.bankName}
    - Transaction ID/Reference: ${disputeDetails.transactionId}
    - Amount: NGN ${disputeDetails.amount.toLocaleString()}
    - Date of Transaction: ${disputeDetails.transactionDate}
    - Customer's Description of Issue: ${disputeDetails.description}

    **Instructions for the Letter:**
    1.  **Subject Line:** Create a clear and concise subject line, e.g., "Formal Complaint: Unresolved Failed Transfer - Ref: ${disputeDetails.transactionId}".
    2.  **Salutation:** Use a formal salutation, e.g., "Dear ${disputeDetails.bankName} Customer Support Team,".
    3.  **Introduction:** State the purpose of the email immediately. Mention the customer's name and the specific failed transaction.
    4.  **Body Paragraph:**
        - Clearly state the sequence of events: the transaction was initiated, funds were debited, but the recipient did not receive the value.
        - Include ALL transaction details (Amount, Date, Reference ID).
    5.  **Reference CBN Guidelines:** Explicitly mention the bank's regulatory obligation. Include a sentence like: "In line with the Central Bank of Nigeria (CBN) 'Guidelines on Resolution of Failed E-Channels Transactions', I expect a full reversal of the debited amount into my account within the regulatory timeframe of 24 hours (T+1)."
    6.  **Call to Action:** Request a prompt investigation into the matter and the immediate reversal of NGN ${disputeDetails.amount.toLocaleString()} to the customer's account.
    7.  **Mention of Evidence:** State that evidence of the transaction (e.g., a debit alert screenshot or receipt) is attached to the email for their review.
    8.  **Closing:** Use a professional closing, e.g., "Sincerely," or "Yours faithfully,".
    9.  **Signature:** End with the customer's full name and contact phone number.
    10. **Tone:** Maintain a polite, formal, and firm tone throughout. Avoid emotional or aggressive language.
  `;

  console.log("--- Sending Prompt to AI Service ---");
  console.log(prompt);
  console.log("------------------------------------");

  // Simulate network latency for the AI API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This is a mocked response based on the prompt above. A real LLM would generate this.
      const aiGeneratedLetter = `
Subject: Formal Complaint: Unresolved Failed Transfer - Ref: ${disputeDetails.transactionId}

Dear ${disputeDetails.bankName} Customer Support Team,

I am writing to file a formal complaint regarding a failed funds transfer initiated from my account. My name is ${userBvnData.firstName} ${userBvnData.lastName}.

On ${disputeDetails.transactionDate}, I attempted a transaction with the reference ID ${disputeDetails.transactionId} for the amount of NGN ${disputeDetails.amount.toLocaleString()}. The sum was successfully debited from my account; however, the intended beneficiary has confirmed that they never received the funds.

As you are aware, this situation is time-sensitive and requires immediate attention. In line with the Central Bank of Nigeria (CBN) 'Guidelines on Resolution of Failed E-Channels Transactions', I expect a full reversal of the debited amount into my account within the regulatory timeframe of 24 hours (T+1).

I have attached a screenshot of the debit alert as evidence for your investigation.

I request that you launch a prompt investigation into this matter and ensure the immediate reversal of NGN ${disputeDetails.amount.toLocaleString()} back to my account.

Thank you for your urgent attention to this issue.

Sincerely,

${userBvnData.firstName} ${userBvnData.lastName}
${userBvnData.phoneNumber}
      `.trim();
      resolve(aiGeneratedLetter);
    }, 3000);
  });
};

/**
 * ## Branching Logic for Bank Responses (Conceptual)
 * In a full implementation, we would have functions to analyze incoming emails from banks and decide on the next step.
 *
 * **1. No Response:**
 *    - Trigger: If no reply is received within 3 business days.
 *    - Action: A workflow automation triggers a follow-up.
 *    - Next AI Prompt: "Generate a follow-up email for a complaint (Ref: [ID]) sent on [Date]. State that no response has been received and reiterate the request for resolution, referencing the CBN guidelines again."
 *
 * **2. Request for More Information:**
 *    - Trigger: AI parses the bank's email and detects keywords like "provide", "statement", "details".
 *    - Action: The system creates a notification for the user: "[Bank Name] is requesting more information for your dispute. Please provide [details requested]." The user would be presented with an interface to upload the new info.
 *    - Next AI Prompt: "A user has provided the requested [document type, e.g., 'statement of account']. Draft a polite email replying to the bank, attaching the new document and urging them to proceed with the investigation."
 *
 * **3. Offer of Resolution:**
 *    - Trigger: AI parses email for keywords like "resolved", "refunded", "credit".
 *    - Action: Analyze the response. Does it confirm a full refund?
 *    - Next AI Prompt (for internal analysis): "Analyze the following bank response. Does it confirm a full refund of NGN [Amount]? Summarize the resolution for the user. Text: '[Bank's email content]'."
 *    - User Notification: "Good news! [Bank Name] has responded with a resolution offer. They have stated: '[AI Summary]'. Please confirm if you have received the credit." The case can then be marked as resolved by the user.
 */
