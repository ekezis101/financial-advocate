import { BvnData, AdevoScoreResult } from '../types';

/**
 * PSEUDO-CODE for calculating the Adevo Score.
 * This is translated directly into the TypeScript implementation below.
 * 
 * FUNCTION calculateAdevoScore(bvnData):
 *   
 *   // --- 1. Calculate Financial Health Score (out of 100) ---
 *   LET healthScore = 0
 *   LET numAccounts = bvnData.linkedAccounts.length
 *   
 *   IF numAccounts IS 1 THEN
 *     healthScore = 40
 *   ELSE IF numAccounts >= 2 AND numAccounts <= 3 THEN
 *     healthScore = 70
 *   ELSE IF numAccounts >= 4 AND numAccounts <= 5 THEN
 *     healthScore = 90
 *   ELSE IF numAccounts >= 6 THEN
 *     healthScore = 100
 *   END IF
 * 
 *   // --- 2. Calculate Security Score (out of 100) and Recommendations ---
 *   LET securityScore = 100
 *   LET recommendations = []
 * 
 *   // Risk factor: Single point of failure
 *   IF numAccounts IS 1 THEN
 *     securityScore = securityScore - 20
 *     recommendations.push("Consider opening a second account to avoid service disruption if your primary bank has issues.")
 *   END IF
 * 
 *   // Risk factor: Too many accounts, potential for dormant ones
 *   IF numAccounts > 7 THEN
 *     securityScore = securityScore - 15
 *     recommendations.push("Review your accounts to ensure they are all active. Close any dormant accounts to reduce your financial footprint.")
 *   END IF
 * 
 *   // Standard recommendation for everyone
 *   recommendations.push(`Ensure your registered phone number (${bvnData.phoneNumber}) is current with all your banks to receive security alerts.`)
 * 
 *   // --- 3. Calculate Overall Adevo Score ---
 *   LET adevoScore = (healthScore * 0.5) + (securityScore * 0.5)
 * 
 *   RETURN {
 *     adevoScore: round(adevoScore),
 *     healthScore: healthScore,
 *     securityScore: securityScore,
 *     recommendations: recommendations
 *   }
 * 
 * END FUNCTION
 */

export const calculateAdevoScore = (bvnData: BvnData): AdevoScoreResult => {
  // --- 1. Calculate Financial Health Score ---
  let healthScore = 0;
  const numAccounts = bvnData.linkedAccounts.length;

  if (numAccounts === 0) {
      healthScore = 0;
  } else if (numAccounts === 1) {
    healthScore = 40;
  } else if (numAccounts >= 2 && numAccounts <= 3) {
    healthScore = 70;
  } else if (numAccounts >= 4 && numAccounts <= 5) {
    healthScore = 90;
  } else if (numAccounts >= 6) {
    healthScore = 100;
  }

  // --- 2. Calculate Security Score and Recommendations ---
  let securityScore = 100;
  const recommendations: string[] = [];

  if (numAccounts === 1) {
    securityScore -= 20;
    recommendations.push("Consider opening a second account to avoid service disruption if your primary bank has issues.");
  }

  if (numAccounts > 7) {
    securityScore -= 15;
    recommendations.push("Review your accounts to ensure they are all active. Close any dormant accounts to reduce your financial footprint.");
  }
  
  recommendations.push(`Ensure your registered phone number (${bvnData.phoneNumber}) is current with all your banks to receive security alerts.`);
  
  // --- 3. Calculate Overall Adevo Score ---
  const adevoScore = (healthScore * 0.5) + (securityScore * 0.5);

  return {
    adevoScore: Math.round(adevoScore),
    healthScore,
    securityScore,
    recommendations,
  };
};
