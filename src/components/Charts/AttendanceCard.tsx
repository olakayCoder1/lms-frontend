import React from 'react';

interface AttendanceCardProps {
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({ 
  totalClasses, 
  attendedClasses, 
  attendancePercentage 
}) => {
  // Determine color based on attendance percentage
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg 
          className="fill-primary dark:fill-white" 
          width="22" 
          height="22" 
          viewBox="0 0 22 22"
        >
          <path d="M14.75 0H7.25C3.25 0 1 2.25 1 6.25V15.75C1 19.75 3.25 22 7.25 22H14.75C18.75 22 21 19.75 21 15.75V6.25C21 2.25 18.75 0 14.75 0ZM5.5 12.25C5.5 11.84 5.84 11.5 6.25 11.5H11.5C11.91 11.5 12.25 11.84 12.25 12.25C12.25 12.66 11.91 13 11.5 13H6.25C5.84 13 5.5 12.66 5.5 12.25ZM15.75 17.25H6.25C5.84 17.25 5.5 16.91 5.5 16.5C5.5 16.09 5.84 15.75 6.25 15.75H15.75C16.16 15.75 16.5 16.09 16.5 16.5C16.5 16.91 16.16 17.25 15.75 17.25Z" 
            fill=""
          />
        </svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className={`text-title-md font-bold ${getAttendanceColor(attendancePercentage)}`}>
            {attendancePercentage.toFixed(2)}%
          </h4>
          <span className="text-sm font-medium">
            {attendedClasses} / {totalClasses} Classes
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;