import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import StudentCoureses from './pages/StudentCoureses';
import StudentMaterials from './pages/StudentMaterials';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import TutorialPage from './pages/TutorialPage';
import JoinLiveStreamPage from './pages/JoinLiveStreamPage';
import NewContentForm from './pages/Form/NewContentForm';
import UpdateContentForm from './pages/Form/UpdateContentForm';
import NewMaterialForm from './pages/Form/NewMaterialForm';
import TutorStudentList from './pages/TutorStudentList';
import TutorMaterialList from './pages/TutorMaterialList';
import TutorContentList from './pages/TutorContentList';
import MainDashboard from './pages/Dashboard/MainDashboard';
import StudentDetails from './pages/StudentDetails';
import LiveStream from './components/zegocloud/LiveStream';
import Room from './components/zegocloud/Room';
import LecturersList from './pages/LecturersList';
import CoursesList from './pages/CoursesList';
import NewCourseForm from './pages/Form/NewCourseForm';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <ToastContainer />
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Sign in " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar " />
              <Calendar />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard " />
              <MainDashboard />
            </>
          }
        />
        <Route
          path="/mycourses"
          element={
            <>
              <PageTitle title="Courses " />
              <StudentCoureses />
            </>
          }
        />
        <Route
          path="/livestream/:id"
          element={
            <>
              <PageTitle title="Live Stream " />
              <Room />
              {/* <JoinLiveStreamPage /> */}
            </>
          }
        />
        {/* <Route
          path="/livestream"
          element={
            <>
              <PageTitle title="Live Stream " />
              <LiveStream />
            </>
          }
        /> */}
        <Route
          path="/mycourses/:id"
          element={
            <>
              <PageTitle title="Courses " />
              <TutorialPage />
            </>
          }
        />
        <Route
          path="/tutorials"
          element={
            <>
              <PageTitle title="Courses " />
              <TutorialPage />
            </>
          }
        />
        <Route
          path="/materials"
          element={
            <>
              <PageTitle title="Materials " />
              <StudentMaterials />
            </>
          }
        />
        <Route
          path="/students"
          element={
            <>
              <PageTitle title="Students " />
              <TutorStudentList />
            </>
          }
        />
        <Route
          path="/students/:id"
          element={
            <>
              <PageTitle title="Student Details" />
              <StudentDetails />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile " />
              <Profile />
            </>
          }
        />
        <Route
          path="/content-management/list"
          element={
            <>
              <PageTitle title="Form Elements " />
              <TutorContentList />
            </>
          }
        />
        <Route
          path="/content-management/list/:id"
          element={
            <>
              <PageTitle title="Form Elements " />
              <UpdateContentForm />
            </>
          }
        />
        <Route
          path="/content-management/new"
          element={
            <>
              <PageTitle title="Form Elements " />
              <NewContentForm />
            </>
          }
        />
        <Route
          path="/material-management/list"
          element={
            <>
              <PageTitle title="Form Elements " />
              <TutorMaterialList />
            </>
          }
        />
        <Route
          path="/material-management/new"
          element={
            <>
              <PageTitle title="Form Elements " />
              <NewMaterialForm />
            </>
          }
        />
        <Route
          path="/course-management/list"
          element={
            <>
              <PageTitle title="Courses " />
              <CoursesList />
            </>
          }
        />
        <Route
          path="/course-management/new"
          element={
            <>
              <PageTitle title="Add Course " />
              <NewCourseForm />
            </>
          }
        />
        <Route
          path="/lecturers"
          element={
            <>
              <PageTitle title="Lecturers " />
              <LecturersList />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements " />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout " />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables " />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings " />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart " />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts " />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons " />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path=""
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
    </>
    
  );
}

export default App;
