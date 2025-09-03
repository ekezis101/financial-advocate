
import { BvnData } from '../types';

// This is a mock API service. In a real application, this would make a secure
// HTTP request to a licensed Nigerian KYC provider like Dojah.io.
export const fetchBvnDetails = (bvn: string): Promise<BvnData> => {
  console.log(`Simulating API call for BVN: ${bvn}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a successful API response for a valid-looking BVN
      if (bvn === '12345678901') {
        const mockData: BvnData = {
          firstName: 'CHINEDU',
          lastName: 'OKORO',
          middleName: 'ADEBAYO',
          phoneNumber: '08012345678',
          dateOfBirth: '15-Aug-1992',
          bvn: '12345678901',
          linkedAccounts: [
            { bankName: 'GTBank', accountNumber: '0123456789' },
            { bankName: 'Kuda Bank', accountNumber: '2001234567' },
            { bankName: 'First Bank', accountNumber: '3098765432' },
            { bankName: 'Access Bank', accountNumber: '0078901234' },
          ],
        };
        resolve(mockData);
      } else {
        // Simulate an error response for an invalid BVN
        reject(new Error('Invalid BVN or user not found. Please check the number and try again.'));
      }
    }, 2500); // Simulate network latency
  });
};
