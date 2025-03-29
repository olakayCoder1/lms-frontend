import {
  BookOpen
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CoursesTable from '../components/Tables/CoursesTable';
import { AuthContext } from '../contexts/ContextProvider';

export default function CoursesList() {
  const { fetchWithAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [materialsOverview, setMaterialsOverview] = useState({
    total_courses: '',
    active_courses: '',
    inactive_courses: ''
  });

  useEffect(() => {
    async function fetchCoursesOverview() {
      try {
        setIsLoading(true);
        const data = await fetchWithAuth({
          method: 'GET',
          path: '/management/courses/overview',
        });
        setMaterialsOverview(data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching courses overview:', error);
        setIsLoading(false);
      }
    }
    fetchCoursesOverview();
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
        <Breadcrumb pageName="Courses" />
        
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard 
            icon={BookOpen}
            title="Total Courses"
            value={materialsOverview?.total_courses}
            subtext="All courses in the system"
            color="text-blue-500"
          />
        </div>

        {/* Courses List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <CoursesTable />
        </div>
      </div>
    </div>
  );
}