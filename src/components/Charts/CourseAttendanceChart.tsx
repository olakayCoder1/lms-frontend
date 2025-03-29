import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface CourseAttendanceProps {
  courseData: Array<{
    courseName: string;
    attendancePercentage: number;
  }>;
}

const CourseAttendanceChart: React.FC<CourseAttendanceProps> = ({ courseData }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
        Attendance by Course
      </h4>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={courseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseName" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="attendancePercentage" 
              fill="#8884d8" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseAttendanceChart;