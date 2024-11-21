import React from 'react';
import TutorialVideo from '../components/TutorialVideo';

const TutorialPage: React.FC = () => {
  const tutorialData = {
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Introduction to React',
    description: 'In this tutorial, we will go over the basics of React, including components, props, and state.',
    materials: [
      { title: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
      { title: 'Download React Starter Code', url: 'https://github.com/olakayCoder1p' },
      { title: 'Assignment', url: 'https://github.com/olakayCoder1' },
    ],
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto sm:px-4">
        <TutorialVideo
            videoUrl={tutorialData.videoUrl}
            title={tutorialData.title}
            description={tutorialData.description}
            materials={tutorialData.materials} userId={'olakay'}        
        />
      </div>
    </div>
  );
};

export default TutorialPage;
