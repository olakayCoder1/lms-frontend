import React from 'react';

interface ProgressModalProps {
  progress: number;
  isUploading: boolean;
  onClose: () => void;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ progress, isUploading, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isUploading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Uploading Video</h2>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-lg h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-600 text-sm">{progress}%</p>

        {/* Close Button */}
        {/* <div className="mt-4 flex justify-center">
          <button
            className="bg-red-500 text-white py-2 px-6 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProgressModal;
