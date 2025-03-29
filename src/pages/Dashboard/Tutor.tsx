import React, { useContext, useEffect, useState } from 'react';
import { 
  BookOpen, 
  Users, 
  CheckCircle, 
  Clock, 
  BarChart2, 
  FileText 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { AuthContext } from '../../contexts/ContextProvider';
import StudentsListTable from '../../components/Tables/StudentsListTable';

const Tutor: React.FC = () => {
  const { fetchWithAuth , authUser} = useContext(AuthContext);
  // const [selectedCourse, setSelectedCourse] = useState(null);
  const [attendanceTracking, setAttendanceTracking] = useState([]);
  const [gradeDistribution, setGradeDistribution] = useState([]);
  const [myCourses, setMyCourses] = useState([]);


  async function fetchMyCourses() {
    try {
        const data = await fetchWithAuth({
        method: 'GET',
        path: `/tutor/get-courses`,
        });
        console.log(data?.data)
        setMyCourses(data?.data);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }

  }
  async function fetchGradesDesctribution() {
    try {
        const data = await fetchWithAuth({
        method: 'GET',
        path: `/tutor/get-grades`,
        });
        console.log(data?.data)
        setGradeDistribution(data?.data?.gradeDistribution || []);
        setAttendanceTracking(data?.data?.quizPerformance || [])
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }

  }

  useEffect(() => {
      fetchMyCourses();
      fetchGradesDesctribution();
    }, [])
  


  const CourseCard = ({ course, isSelected, onClick }) => (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all 
        ${isSelected 
          ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50'}
        border shadow-sm
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">{course.title}</h3>
          <p className="text-sm text-gray-500">{course.code}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Students: {course.student_count}</p>
        </div>
      </div>
    </div>
  );

  const ActivityCard = ({ activity }) => {
    const iconMap = {
      quiz: <CheckCircle className="text-blue-500" />,
      assignment: <FileText className="text-green-500" />,
      lecture: <BookOpen className="text-purple-500" />
    };

    return (
      <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
        <div className="mr-4">
          {iconMap[activity.type]}
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-white">
            {activity.courseName}
          </p>
          <p className="text-sm text-gray-600">{activity.description}</p>
          <p className="text-xs text-gray-500">{activity.date}</p>
        </div>
      </div>
    );
  };



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Lecturer Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome, {authUser?.first_name}
            </p>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses List */}
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-xl font-semibold flex items-center">
              <BookOpen className="mr-2 text-blue-500" /> My Courses
            </h2>
            {myCourses.map(course => (
              <CourseCard 
                key={course.id}
                course={course}
                isSelected={false}
                onClick={() => false}
              />
            ))}
          </div>

          {/* Performance and Attendance */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grade Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart2 className="mr-2 text-green-500" /> Grade Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {gradeDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance Tracking */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="mr-2 text-blue-500" /> Quiz Overview
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart 
                  data={attendanceTracking}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal />
                  <XAxis type="number" />
                  <YAxis dataKey="course" type="category" />
                  <Tooltip />
                  <Bar dataKey="good" stackId="a" fill="#10B981" />
                  <Bar dataKey="bad" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className=' my-4'>
          <h2 className="text-xl font-semibold flex items-center mb-4">
            My Students
          </h2>
          <StudentsListTable />
        </div>
       
      </div>
    </div>
  );
};

export default Tutor;
