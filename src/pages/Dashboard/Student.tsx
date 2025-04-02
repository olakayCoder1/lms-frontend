import {
  BookOpen
} from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CGPACard from '../../components/CGPACard';
import QuizGradeDistribution from '../../components/Charts/QuizGradeDistribution';
import StudentCartOne from '../../components/Charts/StudentChartOne';
import StudentMaterialTable from '../../components/Tables/StudentMaterialTable';
import { AuthContext } from '../../contexts/ContextProvider';
const Student: React.FC = () => {


  const {authUser,fetchWithAuth} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [overviewData, setOverviewData] = useState({})
  const [projectCGPA, setProjectCGPA] = useState({})
  const [gradeDistributionOverview, setGradeDistributionOverview] = useState({})


  async function fetchGradeDistributionOverview() {
    try {
        setIsLoading(true)
        const data = await fetchWithAuth({
        method: 'GET',
        path: `/student/dashboard/overview/quiz`,
        });
        console.log(data?.data)
        setGradeDistributionOverview(data?.data?.gradeDistribution);
        setIsLoading(false)
    } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false)
    }
  }
  async function fetchOverview() {
    try {
        setIsLoading(true)
        const data = await fetchWithAuth({
        method: 'GET',
        path: `/account/overview`,
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
    fetchGradeDistributionOverview()
  }, [])


  useEffect(() => {
    async function fetchPrediction() {
        try {
            setIsLoading(true)
            const data = await fetchWithAuth({
            method: 'GET',
            path: `/predict-performance`,
            });
            console.log(data?.data)
            setProjectCGPA(data?.data)
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setIsLoading(false)
        }

    }
    fetchPrediction();
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

  return (
    <>
      <Breadcrumb pageName="Student Dashboard" />
      <CGPACard
          projectedCGPA={projectCGPA?.prediction || ''}
          previousCGPA={authUser?.previous_cgpa || ''}
          user={{ name: authUser?.first_name }}
        
        />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        
      <StatCard 
          icon={BookOpen}
          title="Registered Courses"
          value={overviewData?.registered_courses_count}
          subtext=''
          color="text-blue-500"
        />

        <StatCard 
          icon={BookOpen}
          title="Engaged Contents"
          value={overviewData?.video_count}
          subtext=''
          color="text-blue-500"
        />
        <StatCard 
          icon={BookOpen}
          title="Engaged Materials"
          value={overviewData?.download_count}
          subtext=''
          color="text-blue-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        
        <div className="col-span-12  grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* <AttendanceCard 
            totalClasses={attendanceData.overallAttendance.totalClasses}
            attendedClasses={attendanceData.overallAttendance.attendedClasses}
            attendancePercentage={attendanceData.overallAttendance.attendancePercentage}
          /> */}
          
          <div className="col-span-12 grid grid-cols-12 gap-4">
            {/* <AttendanceTrendChart 
              monthlyData={attendanceData.monthlyTrend} 
            />
            <CourseAttendanceChart 
              courseData={attendanceData.courseAttendance} 
            /> */}
          </div>
        </div>
        <div className='col-span-12 md:col-span-12 xl:col-span-6'>
        <QuizGradeDistribution gradeData={gradeDistributionOverview} /> 
        </div>
        <div className='col-span-12 md:col-span-12 xl:col-span-6'>
          <StudentCartOne user_id={authUser?.id}/>
        </div>
        
        
        <div className="col-span-12">
          <StudentMaterialTable /> 
        </div>
      </div>
    </>
  );
};

export default Student;
