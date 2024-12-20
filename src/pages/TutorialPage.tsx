import React, { useContext, useEffect, useState } from 'react';
import TutorialVideo from '../components/TutorialVideo';
import { AuthContext } from '../contexts/ContextProvider';
import { useParams } from 'react-router-dom';

const TutorialPage: React.FC = () => {


  const {fetchWithAuth} = useContext(AuthContext)
  const { id } = useParams();

  const [course, setCourse] = useState([])


  useEffect(() => {
    async function fetchCourse() {
        try {
            const data = await fetchWithAuth({
            method: 'GET',
            path: `/contents/video/${id}/`,
            });
            setCourse(data?.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }

    }
    fetchCourse();
  }, [])


  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto sm:px-4">
        <TutorialVideo
            videoUrl={course?.video_url}
            title={course?.title}
            description={course?.description}
            has_taken_quiz={course?.has_taken_test}
            materials={course?.materials || []} videoId={course?.id}   
            quiz={course?.quiz}     
        />
      </div>
    </div>
  );
};

export default TutorialPage;
