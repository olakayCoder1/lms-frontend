import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams to get the quiz ID from the URL
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { AuthContext } from '../contexts/ContextProvider';

export default function QuizViewEditPage() {
    const { id } = useParams();  // Get the quiz ID from the URL
    const navigate = useNavigate();
    const { fetchWithAuth, displayNotification } = useContext(AuthContext);

    // State to hold quiz data and loading state
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        course: '',
        questions: [
            {
                question_text: '',
                answers: ['', '', '', ''],
                correct_answer: ''
            }
        ]
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch quiz data if we are in edit mode
    useEffect(() => {
        if (id) {  // If there's an ID in the URL, we are in edit mode
            setIsEditMode(true);
            async function fetchQuiz() {
                try {
                    const data = await fetchWithAuth({
                        method: 'GET',
                        path: `/quizzes/${id}/`,  // The API endpoint to get a single quiz by ID
                    });
                    setQuiz(data?.data);  // Assuming the response structure has the quiz data in `data`
                    setIsLoading(false);
                } catch (error) {
                    displayNotification("error", "Failed to fetch quiz details.");
                    setIsLoading(false);
                }
            }
            fetchQuiz();
        } else {
            setIsLoading(false);  // If there's no ID, we're in "create mode"
        }
    }, [id, fetchWithAuth, displayNotification]);

    // Handle changes to individual question fields
    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index][field] = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    // Handle changes to answers
    const handleAnswerChange = (index, answerIndex, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index].answers[answerIndex] = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    // Add a new question (only if current question is valid)
    const handleAddQuestion = () => {
        const currentQuestion = quiz.questions[quiz.questions.length - 1];
        if (currentQuestion.question_text && currentQuestion.answers.every(ans => ans) && currentQuestion.correct_answer) {
            setQuiz({
                ...quiz,
                questions: [
                    ...quiz.questions,
                    { question_text: '', answers: ['', '', '', ''], correct_answer: '' }
                ]
            });
        } else {
            displayNotification("error", 'Please fill in all fields of the current question before adding another.');
        }
    };

    // Submit all questions (Create or Update)
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate that at least one question is filled and all are valid
        if (!quiz.title || !quiz.description || !quiz.course) {
            displayNotification("error", 'Please fill in the quiz title, description, and course before submitting.');
            return;
        }

        if (quiz.questions.length === 0 || quiz.questions.some(({ question_text, answers, correct_answer }) => !question_text || answers.some(answer => !answer) || !correct_answer)) {
            displayNotification("error", 'Please fill in at least one complete question.');
            return;
        }

        const quizData = {
            title: quiz.title,
            description: quiz.description,
            // course: quiz.course,  
            questions: quiz.questions.map(({ question_text, answers, correct_answer }) => ({
                question_text,
                answers,
                correct_answer
            }))
        };

        try {
            let data;
            if (isEditMode) {
                // Update quiz via PUT request
                data = await fetchWithAuth({
                    method: 'PUT',
                    path: `/quizzes/${id}/`,  // Update endpoint for a single quiz
                    body: quizData
                });
                displayNotification('success', data?.detail || 'Quiz updated successfully!');
            } else {
                // Create new quiz via POST request
                data = await fetchWithAuth({
                    method: 'POST',
                    path: `/quizzes/`,
                    body: quizData
                });
                displayNotification('success', data?.detail || 'Quiz created successfully!');
            }

            navigate(`/quiz-management/list/${data?.data?.id}`);  // Redirect to the quiz detail page
        } catch (error) {
            console.error('Error:', error);
            displayNotification("error", "Failed to submit quiz.");
        }
    };

    const handlePreview = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    console.log(quiz)


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Breadcrumb pageName={isEditMode ? "Edit Quiz" : "New Quiz"} />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-boxdark">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">{isEditMode ? "Edit Quiz" : "Add New Quiz"}</h1>
                <form onSubmit={handleSubmit}>
                    {/* Quiz Title and Description */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Quiz Title</label>
                        <input
                            type="text"
                            value={quiz.title}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                            placeholder="Enter quiz title"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Quiz Description</label>
                        <textarea
                            value={quiz.description}
                            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                            placeholder="Enter quiz description"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            required
                        />
                    </div>

                    {/* Quiz Course Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Course</label>
                        <input
                            type="text"
                            value={quiz?.course?.title || ''}
                            disabled={true}
                            placeholder="Enter the correct answer"
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            required
                        />
                    </div>

                    {/* Questions Section */}
                    {quiz.questions.map((questionData, index) => (
                        <div key={index} className="mb-6 border-b pb-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Question {index + 1}</label>
                                <input
                                    type="text"
                                    value={questionData.question_text}
                                    onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)}
                                    placeholder="Enter the question"
                                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2 ">Answers</label>
                                {questionData.answers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="flex items-center space-x-2 my-2">
                                        <input
                                            type="text"
                                            value={answer}
                                            onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
                                            placeholder={`Answer ${answerIndex + 1}`}
                                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Correct Answer</label>
                                <select
                                    value={questionData.correct_answer}
                                    onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                    required
                                >
                                    <option value="" disabled>Select correct answer</option>
                                    {questionData.answers.map((answer, answerIndex) => (
                                        <option key={answerIndex} value={answer}>
                                            Answer {answerIndex + 1}: {answer}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}

                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={handleAddQuestion}
                            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
                        >
                            Add Question
                        </button>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handlePreview}
                            className="py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Preview
                        </button>

                        <button
                            type="submit"
                            className="py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                            {isEditMode ? "Update Quiz" : "Create Quiz"}
                        </button>
                    </div>
                </form>
            </div>


            {/* Preview Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-9999">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Preview Quiz</h2>
                        <div className="space-y-4">
                            <p className="font-medium text-lg text-gray-700 dark:text-white">Quiz Title: {quiz.title}</p>
                            <p className="text-gray-600 dark:text-gray-400">Description: {quiz.description}</p>
                            <p className="text-gray-600 dark:text-gray-400">Course: {quiz?.course?.title}</p>
                            {quiz?.questions?.map((questionData, index) => (
                                <div key={index} className="border-b pb-4">
                                    <p className="font-medium text-lg text-gray-700 dark:text-white">{questionData.question}</p>
                                    {questionData.answers.map((answer, answerIndex) => (
                                        <p key={answerIndex} className="text-gray-600 dark:text-gray-400">
                                            {answerIndex + 1}. {answer}
                                        </p>
                                    ))}
                                    <p className="text-primary mt-2">Correct Answer: {questionData.correct_answer}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button onClick={handleCloseModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">Close</button>
                            <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
