import {
  UserCheck,
  Users,
  UserX
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import StudentsListTable from '../components/Tables/StudentsListTable';
import { AuthContext } from '../contexts/ContextProvider';

export default function TutorStudentList() {
  const { fetchWithAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [studentsOverview, setStudentsOverview] = useState({
    total_students: '',
    active_students: '',
    inactive_students: ''
  });

  useEffect(() => {
    async function fetchUserOverview() {
      try {
        setIsLoading(true);
        const data = await fetchWithAuth({
          method: 'GET',
          path: '/students/overview',
        });
        setStudentsOverview(data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    }
    fetchUserOverview();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        <Breadcrumb pageName="Students" />
        
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard 
            icon={Users}
            title="Registered Students"
            value={studentsOverview?.total_students}
            subtext="Total student count"
            color="text-blue-500"
          />
          <StatCard 
            icon={UserCheck}
            title="Active Students"
            value={studentsOverview?.active_students}
            subtext="Currently engaged students"
            color="text-green-500"
          />
          <StatCard 
            icon={UserX}
            title="Inactive Students"
            value={studentsOverview?.inactive_students}
            subtext="Students with low engagement"
            color="text-red-500"
          />
        </div>

        {/* Students List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <StudentsListTable />
        </div>
      </div>
    </div>
  );
}