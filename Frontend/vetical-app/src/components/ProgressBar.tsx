import React from "react";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col items-center mb-6">
      <div className="w-full h-2 bg-gray-300 rounded-full relative overflow-hidden">
        <div
          className="h-2 bg-orange-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-700">{`Step ${step} of ${totalSteps}`}</p>
    </div>
  );
};

export default ProgressBar;
