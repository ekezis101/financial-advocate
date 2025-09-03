export interface LinkedAccount {
  bankName: string;
  accountNumber: string;
}

export interface BvnData {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  dateOfBirth: string;
  bvn: string;
  linkedAccounts: LinkedAccount[];
}

export enum OnboardingStep {
  Consent,
  BvnInput,
  Loading,
  Dashboard,
  Error,
}

// Types for Dispute Resolution Flow
export type BankName = 'GTBank' | 'Kuda Bank' | 'First Bank' | 'Access Bank' | 'Other';

export enum DisputeStatus {
  Pending = 'Pending',
  AwaitingBankResponse = 'Awaiting Bank Response',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
}

export interface DisputeDetails {
  transactionId: string;
  amount: number;
  bankName: BankName | string;
  transactionDate: string;
  description: string;
  evidenceFile?: File;
  status?: DisputeStatus;
}

export enum DisputeStep {
  Form,
  EvidenceUpload,
  GeneratingLetter,
  ReviewLetter,
  StatusDisplay,
  Error,
}

// Types for Adevo Score
export interface AdevoScoreResult {
  adevoScore: number;
  healthScore: number;
  securityScore: number;
  recommendations: string[];
}
