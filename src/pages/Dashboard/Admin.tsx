


import {
  Activity,
  BookmarkCheck,
  GraduationCap,
  TrendingUp,
  Trophy,
  Users
} from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import CourseScheduleAnalytics from '../../components/Charts/CourseScheduleAnalytics';
import { AuthContext } from '../../contexts/ContextProvider';


const Admin: React.FC = () => {
  const {fetchWithAuth} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [overviewData, setOverviewData] = useState({})
  const [studentTrend, setStudentTrend] = useState([])
  const [studentTopPerformance, setStudentTopPerformance] = useState([])


  async function fetchOverviewStudentTrend() {
    try {
        const data = await fetchWithAuth({
        method: 'GET',
        path: `/admin/dashboard/overview/student-trend`,
        });
        console.log(data?.data)
        setStudentTrend(data?.data);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }

  }
  async function fetchOverviewStudentTopPerformance() {
    try {
        const data = await fetchWithAuth({
        method: 'GET',
        path: `/admin/dashboard/overview/student-top-performers`,
        });
        setStudentTopPerformance(data?.data);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }

  }
  async function fetchOverview() {
    try {
        setIsLoading(true)
        const data = await fetchWithAuth({
        method: 'GET',
        path: `/admin/dashboard/overview`,
        });
        console.log(data?.data)
        setOverviewData(data?.data);
        setIsLoading(false)
    } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false)
    }

  }

  useEffect(() => {
   
    fetchOverview();
    fetchOverviewStudentTrend();
    fetchOverviewStudentTopPerformance();
    console.log(isLoading)
  }, [])


  const StatCard = ({ icon: Icon, title, value, subtext, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition-shadow">
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        <Icon className={`${color} w-6 h-6`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {isLoading ? 'Loading...' : value}
        </h3>
        <p className="text-xs text-gray-500">{subtext}</p>
      </div>
    </div>
  );



  const TopPerformers = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Trophy className="mr-2 text-yellow-500" /> Top Quiz Performers
      </h3>
      {studentTopPerformance?.map((performer, index) => (
        <div 
          key={index} 
          className="flex justify-between items-center py-2 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
        >
          <div>
            <p className="font-medium">{performer.name}</p>
            {/* <p className="text-xs text-gray-500">{performer.department}</p> */}
          </div>
          <span className="text-green-600 font-bold">{performer.score}%</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>
        
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            icon={Users}
            title="Total Students"
            value={overviewData?.total_students}
            subtext={`+${overviewData?.new_students} new this month`}
            color="text-blue-500"
          />
          <StatCard 
            icon={Activity}
            title="Active Students"
            value={overviewData?.active_students}
            subtext={`${((overviewData?.active_students / overviewData?.total_students) * 100).toFixed(1)}% participation`}
            color="text-green-500"
          />
          <StatCard 
            icon={GraduationCap}
            title="Average CGPA"
            value={overviewData?.average_cgpa}
            subtext="Institutional Performance"
            color="text-purple-500"
          />
          <StatCard 
            icon={BookmarkCheck}
            title="Quiz Performance"
            value={`${overviewData?.quiz_performance}%`}
            subtext="Average Quiz Score"
            color="text-red-500"
          />
        </div>

        {/* Charts and Detailed Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Growth Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-green-500" /> Student Growth Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Right Side Panels */}
          <div className="space-y-6">
            <TopPerformers />
          </div>
        </div>
        <div className=' my-4'>
        <CourseScheduleAnalytics />

        </div>
      </div>
    </div>
  );
};

export default Admin;