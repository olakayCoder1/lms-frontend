import React, { useContext } from 'react';
import { AuthContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

interface TutorialVideoProps {
  videoUrl: string;
  title: string;
  description: string;
  materials: { title: string; url: string }[];
  userId: string; // Assume you have a user ID to track their progress
}
const TutorialVideo: React.FC<TutorialVideoProps> = ({ videoUrl, title, description,has_taken_quiz, materials,videoId,quiz }) => {

  const {fetchWithAuth} = useContext(AuthContext)
  const navigate = useNavigate();

  async function fetchUpdateProgress() {
    try {
        const data = await fetchWithAuth({
        method: 'POST',
        path: `/contents/video/${videoId}/update-progress/`,
        });
        console.log(data)
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }

}

  return (
    <div className="max-w-4xl mx-auto p-4 shadow-lg rounded-lg">
      {/* Title */}
      <div className=' flex justify-between items-center'>

        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

        {!has_taken_quiz && <button onClick={()=> navigate(`/take-quiz/${quiz}`)} className=" bg-blue-700 text-white rounded-md px-2 py-1">Start Quiz</button>}
        

      </div>


      {/* Video Player */}
      <div className="mt-4">
        <div className="relative pb-[56.25%] overflow-hidden">
          <video
            src={videoUrl}
            onPlay={fetchUpdateProgress} 
            controls
            className="absolute top-0 left-0 w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {/* Description */}
      <p className="mt-4 text-gray-600">{description}</p>

      {/* Optional Materials */}
      {materials.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Additional Materials</h3>
          <ul className="mt-2 space-y-2">
            {materials.map((material, index) => (
              <li key={index}>
                <a
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {material.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TutorialVideo;