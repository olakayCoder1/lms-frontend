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


  console.log(userAnswers)

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

      // Handle response (e.g., display results)
      displayNotification('success', response?.message);
      // navigate(`/quiz-results/${id}`, { state: { result: response?.data } }); // Navigate to results page
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="quiz-taking-container">
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
            onClick={handleSubmitQuiz} // Submit the quiz answers
            className="py-2 px-4 bg-primary text-white rounded-lg"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizTakingComponent;
