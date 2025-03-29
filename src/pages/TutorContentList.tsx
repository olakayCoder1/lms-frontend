import {
  Video
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TutorCoursesTable from '../components/Tables/TutorCoursesTable';
import { AuthContext } from '../contexts/ContextProvider';

export default function TutorContentList() {
  const { fetchWithAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [contentsOverview, setContentsOverview] = useState({});

  useEffect(() => {
    async function fetchContents() {
      try {
        setIsLoading(true);
        const data = await fetchWithAuth({
          method: 'GET',
          path: `/contents/video/overview/`,
        });
        setContentsOverview(data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching contents overview:', error);
        setIsLoading(false);
      }
    }
    fetchContents();
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtext, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition-shadow">
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        <Icon className={`${color} w-6 h-6`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {isLoading ? 'Loading...' : value || '0'}
        </h3>
        <p className="text-xs text-gray-500">{subtext}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        <Breadcrumb pageName="Contents" />
        
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard 
            icon={Video}
            title="Total Contents"
            value={contentsOverview?.total}
            subtext="All uploaded video contents"
            color="text-purple-500"
          />
        </div>

        {/* Contents List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <TutorCoursesTable />
        </div>
      </div>
    </div>
  );
}