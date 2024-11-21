// // DocumentViewer.tsx

// import React, { useState } from 'react';
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";

// // Define the component
// export default function DocumentViewer() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const docs = [
//     { uri: 'https://pdfobject.com/pdf/sample.pdf' }, // Remote file
//     // { uri: require("./example-files/pdf.pdf") }, // Local File
//   ];

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="flex justify-center items-center">
//       <button 
//         onClick={openModal} 
//         className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
//       >
//         Open Document Viewer
//       </button>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed top-4 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75  z-999999">
//           <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-4">
//             <button 
//               onClick={closeModal} 
//               className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800"
//             >
//               &times;
//             </button>
//             <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

// Define the component
export default function DocumentViewer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const docs = [
    { uri: 'https://pdfobject.com/pdf/sample.pdf' }, // Remote file
    // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    // Add event listener for outside click
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
      >
        Open Document Viewer
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-9999">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-4 relative"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            {/* PDF Viewer */}
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
          </div>
        </div>
      )}
    </div>
  );
}
