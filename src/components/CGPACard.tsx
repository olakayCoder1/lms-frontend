import React, { useMemo } from 'react';
import { User, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CGPACardProps {
  projectedCGPA: string | number;
  previousCGPA: string | number;
  user?: {
    name?: string;
    firstName?: string;
  };
  className?: string;
}

const CGPACard: React.FC<CGPACardProps> = ({ 
  projectedCGPA, 
  previousCGPA, 
  user,
  className = ''
}) => {
  // Get personalized greeting based on time of day
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get name to use in greeting
  const getUserName = () => {
    return user?.firstName || user?.name || 'Student';
  };

  // Determine CGPA progress and motivational message
  const cgpaProgress = useMemo(() => {
    if (!projectedCGPA || !previousCGPA) return null;

    const projected = parseFloat(projectedCGPA.toString());
    const previous = parseFloat(previousCGPA.toString());
    const difference = projected - previous;

    // Predictive message generation
    const generatePredictiveMessage = () => {
      const messages = {
        improving: [
          'Our predictive model suggests you\'re on track to improve your CGPA.',
          'Looks like your hard work is paying off! The model indicates potential CGPA growth.',
          'Exciting prediction: Your academic performance shows promising upward momentum.'
        ],
        declining: [
          'Our model suggests some challenges ahead. Time to refocus and strategize.',
          'The prediction indicates a potential dip. But remember, you can always turn things around.',
          'While the model shows a slight decline, it\'s an opportunity for proactive improvement.'
        ],
        stable: [
          'The model predicts a consistent academic performance. Maintain your steady approach.',
          'Your academic trajectory looks stable. Consistency is your strength.',
          'Steady progress is the key to long-term success, and the model reflects that.'
        ]
      };

      if (difference > 0) {
        return messages.improving[Math.floor(Math.random() * messages.improving.length)];
      } else if (difference < 0) {
        return messages.declining[Math.floor(Math.random() * messages.declining.length)];
      } else {
        return messages.stable[Math.floor(Math.random() * messages.stable.length)];
      }
    };

    if (difference > 0) {
      return {
        status: 'improving',
        message: generatePredictiveMessage(),
        color: 'text-green-600',
        icon: TrendingUp,
        bgColor: 'bg-green-50',
        iconColor: 'text-green-500'
      };
    } else if (difference < 0) {
      return {
        status: 'declining',
        message: generatePredictiveMessage(),
        color: 'text-yellow-600',
        icon: TrendingDown,
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-500'
      };
    } else {
      return {
        status: 'stable',
        message: generatePredictiveMessage(),
        color: 'text-blue-600',
        icon: Minus,
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500'
      };
    }
  }, [projectedCGPA, previousCGPA]);

  return (
    <div className={`w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 relative overflow-hidden mb-6 ${className}`}>
      {/* Header with Greeting and User Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <User className="text-blue-600 dark:text-blue-300" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {getTimeBasedGreeting()}, {getUserName()}!
            </h2>
          </div>
        </div>
        
        {/* CGPA Trend Indicator */}
        {cgpaProgress && (
          <div className={`flex items-center ${cgpaProgress.color}`}>
            <cgpaProgress.icon className={`mr-2 ${cgpaProgress.iconColor}`} size={20} />
            <span className="text-sm font-medium">{cgpaProgress.status}</span>
          </div>
        )}
      </div>

      {/* CGPA Overview */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <span className="block text-xs text-gray-500 dark:text-gray-300 mb-1">
            Projected CGPA
          </span>
          <span className="text-xl font-bold text-green-600">
            {projectedCGPA || 'N/A'}
            <span className="text-xs text-gray-500 ml-2">(Predicted)</span>
          </span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <span className="block text-xs text-gray-500 dark:text-gray-300 mb-1">
            Previous CGPA
          </span>
          <span className="text-xl font-bold text-blue-600">
            {previousCGPA || 'N/A'}
          </span>
        </div>
      </div>

      {/* Motivational Section */}
      {cgpaProgress && (
        <div className={`p-4 rounded-lg ${cgpaProgress.bgColor} border border-opacity-50 ${cgpaProgress.color}`}>
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-700 flex-grow">
              {cgpaProgress.message}
            </p>
          </div>
        </div>
      )}

      {/* Prediction Disclaimer */}
      <div className="text-xs text-gray-500 italic text-center mt-2">
        Note: Projected CGPA is based on predictive modeling and may vary from actual performance.
      </div>

      {/* Decorative Background */}
      <div 
        className="absolute top-0 right-0 w-48 h-48 bg-blue-100 dark:bg-blue-900 
        rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-20 z-0"
      />
    </div>
  );
};

export default CGPACard;