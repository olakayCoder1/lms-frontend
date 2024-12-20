// import { useState, useEffect, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from '../contexts/ContextProvider';

// const QuizTakingComponent = () => {
//   const { fetchWithAuth, displayNotification } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const { id } = useParams(); 
  
//   // States to hold the quiz data and the user's answers
//   const [quizData, setQuizData] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Fetch the quiz data when the component mounts
//   useEffect(() => {
//     async function fetchQuiz() {
//       try {
//         const data = await fetchWithAuth({
//           method: 'GET',
//           path: `/quizzes/${id}/take-quiz`, // Get quiz details by ID
//         });
//         setQuizData(data?.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching quiz data:', error);
//         displayNotification('error', 'Failed to load quiz data');
//       }
//     }
//     fetchQuiz();
//   }, [id, fetchWithAuth, displayNotification]);

//   // Handle answer change for each question
//   const handleAnswerChange = (questionId, answer) => {
//     setUserAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: answer,
//     }));
//   };


//   console.log(userAnswers)

//   // Handle quiz submission
//   const handleSubmitQuiz = async () => {
//     try {
//       const response = await fetchWithAuth({
//         method: 'POST',
//         path: `/quizzes/${id}/submit`, // Submit quiz answers
//         body: {
//           answers: userAnswers,
//         },
//       });

//       // Handle response (e.g., display results)
//       displayNotification('success', response?.message);
//       // navigate(`/quiz-results/${id}`, { state: { result: response?.data } }); // Navigate to results page
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading quiz...</div>;
//   }

//   return (
//     <div className="quiz-taking-container">
//       <h1 className="text-2xl font-semibold mb-6">{quizData?.title}</h1>
//       <p className="text-md font-medium py-2 mb-4">{quizData.description}</p>

//       <form className="space-y-6">
//         {quizData?.questions?.map((question, first_index) => (
//           <div key={first_index} className="question-container">
//             <p className="text-lg font-medium">{first_index + 1}. {question.question_text}</p>
//             <div className="options">
//               {question?.answers.map((option, index) => (
//                 <div key={index} className="flex items-center space-x-3">
//                   <input
//                     type="radio"
//                     id={`q-${question.id}-o-${index}`}
//                     name={`question-${question.id}`}
//                     value={option}
//                     checked={userAnswers[question.id] === option}
//                     onChange={() => handleAnswerChange(question.id, option)}
//                     className="form-radio"
//                   />
//                   <label htmlFor={`q-${index}-o-${index}`} className="text-md">
//                     {option}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate(`/dashboard`)} // Navigate back to the quiz list
//             className="py-2 px-4 bg-gray-300 text-black rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmitQuiz} // Submit the quiz answers
//             className="py-2 px-4 bg-primary text-white rounded-lg"
//           >
//             Submit Quiz
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default QuizTakingComponent;



import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/ContextProvider';

const QuizTakingComponent = () => {
  const { fetchWithAuth, displayNotification } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  // States to hold the quiz data and the user's answers
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Show submit confirmation modal
  const [showResultModal, setShowResultModal] = useState(false); // Show result modal
  const [quizResult, setQuizResult] = useState(null); // Store quiz result

  // Fetch the quiz data when the component mounts
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await fetchWithAuth({
          method: 'GET',
          path: `/quizzes/${id}/take-quiz`, // Get quiz details by ID
        });
        setQuizData(data?.data);
        setLoading(false);

        // Check if the quiz has already been taken (this depends on your API response)
        if (data?.data?.has_taken_test) {
          setShowConfirmationModal(false); // Disable submit modal if already taken
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        displayNotification('error', 'Failed to load quiz data');
      }
    }
    fetchQuiz();
  }, [id, fetchWithAuth, displayNotification]);

  // Handle answer change for each question
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    try {
      const response = await fetchWithAuth({
        method: 'POST',
        path: `/quizzes/${id}/submit`, // Submit quiz answers
        body: {
          answers: userAnswers,
        },
      });

      // Show result modal
      setQuizResult(response?.data);
      setShowResultModal(true);
      displayNotification('success', response?.message);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  // Close the confirmation modal
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  // Confirm the submission and call the actual submit function
  const confirmSubmit = () => {
    handleSubmitQuiz();
    setShowConfirmationModal(false); // Close the confirmation modal
  };

  // Close the result modal
  const closeResultModal = () => {
    setShowResultModal(false);
    navigate(`/dashboard`); // Redirect to dashboard after showing result
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="quiz-taking-container">
      {/* Modal for confirming quiz submission */}
      {showConfirmationModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold">Confirm Submission</h2>
            <p>Are you sure you want to submit your quiz? You won't be able to change your answers after submitting.</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={closeConfirmationModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
              <button onClick={confirmSubmit} className="bg-blue-700 text-white px-4 py-2 rounded-md">Submit</button>
            </div>
          </div>
        </div>
      )}


      {/* Modal for confirming quiz submission */}
      {quizData?.has_taken_test && (
        <div className="fixed top-0 bottom-0 left-0 right-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold">Quiz Completed</h2>
            <p>You have already taken this quiz. You cannot retake it.</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={closeResultModal} className="bg-blue-700 text-white px-4 py-2 rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}

 
      {/* Result Modal */}
      {showResultModal && quizResult && (
        <div className="fixed top-0 bottom-0 left-0 right-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>

            {/* Show Score */}
            <p className="text-lg mb-4">You scored <strong>{quizResult?.score}</strong> out of <strong>{quizResult?.question_count}</strong>!</p>

            {/* Performance Message */}
            <p className="text-md mb-6">
              {quizResult?.score >= quizResult?.question_count * 0.8
                ? "Great job! You've mastered the material!"
                : quizResult?.score >= quizResult?.question_count * 0.5
                ? "Nice work! You did well, but there’s room for improvement."
                : "Don't worry! Keep practicing, and you’ll get there!"}
            </p>

            {/* Optional Action (Retry or View Answers) */}
            <div className="flex justify-between">
              {/* <button
                onClick={() => navigate(`/quiz/${id}/review`)} // Navigate to quiz review or try again
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Review Answers
              </button> */}
              <p></p>
              <button
                onClick={closeResultModal} // Close modal and navigate away
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Main Quiz Content */}
      {!showConfirmationModal && !showResultModal && !quizData?.has_taken_test && (
        <>
          <h1 className="text-2xl font-semibold mb-6">{quizData?.title}</h1>
          <p className="text-md font-medium py-2 mb-4">{quizData.description}</p>

          <form className="space-y-6">
            {quizData?.questions?.map((question, first_index) => (
              <div key={first_index} className="question-container">
                <p className="text-lg font-medium">{first_index + 1}. {question.question_text}</p>
                <div className="options">
                  {question?.answers.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id={`q-${question.id}-o-${index}`}
                        name={`question-${question.id}`}
                        value={option}
                        checked={userAnswers[question.id] === option}
                        onChange={() => handleAnswerChange(question.id, option)}
                        className="form-radio"
                      />
                      <label htmlFor={`q-${index}-o-${index}`} className="text-md">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/dashboard`)} // Navigate back to the quiz list
                className="py-2 px-4 bg-gray-300 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmationModal(true)} // Show the confirmation modal
                className="py-2 px-4 bg-primary text-white rounded-lg"
              >
                Submit Quiz
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default QuizTakingComponent;
