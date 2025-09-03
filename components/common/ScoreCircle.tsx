import React from 'react';

interface ScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-brand-green'; // Excellent
    if (s >= 60) return 'text-yellow-500'; // Good
    return 'text-red-500'; // Needs improvement
  };
  
  const getTrackColor = (s: number) => {
    if (s >= 80) return 'stroke-brand-green'; // Excellent
    if (s >= 60) return 'stroke-yellow-500'; // Good
    return 'stroke-red-500'; // Needs improvement
  };

  const scoreColor = getScoreColor(score);
  const trackColor = getTrackColor(score);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${trackColor} transition-all duration-1000 ease-in-out`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <div className={`absolute flex flex-col items-center justify-center ${scoreColor}`}>
        <span className="text-4xl font-bold">{score}</span>
        <span className="text-xs font-semibold tracking-wider uppercase">Score</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
