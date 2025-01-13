import React from 'react';

interface CGPACardProps {
  projectedCGPA: string | number;
  previousCGPA: string | number;
}

const CGPACard: React.FC<CGPACardProps> = ({ projectedCGPA, previousCGPA }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">CGPA Overview</h3>
      
      <div className="space-y-3">
        {/* Projected CGPA Section */}
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Projected CGPA:</span>
          <span className="text-lg font-semibold text-green-500">{projectedCGPA || 'None'}</span>
        </div>

        {/* Previous CGPA Section */}
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Previous CGPA:</span>
          <span className="text-lg font-semibold text-blue-500">{previousCGPA || 'None'}</span>
        </div>
      </div>
    </div>
  );
};

export default CGPACard;
