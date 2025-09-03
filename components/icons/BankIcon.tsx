
import React from 'react';

const BankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 18H9m3 0h3m-3 0a9 9 0 0 1-9-9V3a9 9 0 0 1 9-9h.01M12 3a9 9 0 0 1 9 9v15M3 3h18" />
    </svg>
);

export default BankIcon;
