
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface QuizGradeDistributionProps {
  gradeData: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
}

const COLORS = {
  A: '#00C49F',  // Green
  B: '#0088FE',  // Blue
  C: '#FFBB28',  // Yellow
  D: '#FF8042',  // Orange
  F: '#FF0000'   // Red
};

const QuizGradeDistribution: React.FC<QuizGradeDistributionProps> = ({ gradeData }) => {
  // Convert grade data to Recharts format
  const data = Object.entries(gradeData).map(([name, value]) => ({ name, value }));

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Quiz Grade Distribution
          </h4>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => 
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.name as keyof typeof COLORS]} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuizGradeDistribution;