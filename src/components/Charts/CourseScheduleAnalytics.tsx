import {
    BarChart3,
    BookOpen,
    Calendar,
    Clock,
    GraduationCap,
    Users
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { AuthContext } from '../../contexts/ContextProvider';

const CourseScheduleAnalytics = () => {
  const { fetchWithAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [dayDistribution, setDayDistribution] = useState([]);
  
  async function fetchCourseScheduleData() {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth({
        method: 'GET',
        path: '/admin/dashboard/overview/course-schedule-analytics',
      });
      
      setCourseData(response.data.courses);
      setAnalytics(response.data.analytics);
      
      // Transform day distribution for chart
      const dayData = Object.entries(response.data.analytics.day_distribution).map(([day, count]) => ({
        day: day,
        courses: count
      }));
      setDayDistribution(dayData);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching course schedule data:', error);
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchCourseScheduleData();
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Course Schedule Analytics
      </h2>
      
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          icon={BookOpen}
          title="Total Courses"
          value={analytics.total_courses}
          subtext="All available courses"
          color="text-blue-500"
        />
        <StatCard 
          icon={Users}
          title="Instructors"
          value={analytics.instructor_count}
          subtext={`${analytics.assigned_courses} assigned courses`}
          color="text-purple-500"
        />
        <StatCard 
          icon={Clock}
          title="Unassigned Courses"
          value={analytics.unassigned_courses}
          subtext="Courses without instructors"
          color="text-red-500"
        />
        <StatCard 
          icon={GraduationCap}
          title="Average Units"
          value={analytics.average_units}
          subtext="Units per course"
          color="text-green-500"
        />
      </div>
      
      {/* Charts and Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Distribution by Day */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-blue-500" /> Courses by Day
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="courses" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Course Schedule Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2 text-green-500" /> Course Schedule
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Instructor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Schedule</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center">Loading course data...</td>
                  </tr>
                ) : courseData.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center">No courses available</td>
                  </tr>
                ) : (
                  courseData.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-xs text-gray-500">{course.code} ({course.units} units)</div>
                      </td>
                      <td className="px-4 py-4">
                        {course.instructor}
                      </td>
                      <td className="px-4 py-4">
                        {course.schedules.length > 0 ? (
                          course.schedules.map((schedule, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{schedule.day_of_week}:</span> {schedule.start_time} - {schedule.end_time}
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No schedule assigned</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseScheduleAnalytics;