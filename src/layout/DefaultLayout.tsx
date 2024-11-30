// import React, { useState, ReactNode } from 'react';
// import Header from '../components/Header/index';
// import Sidebar from '../components/Sidebar/index';

// const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="dark:bg-boxdark-2 dark:text-bodydark">
//       {/* <!-- ===== Page Wrapper Start ===== --> */}
//       <div className="flex h-screen overflow-hidden">
//         {/* <!-- ===== Sidebar Start ===== --> */}
//         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         {/* <!-- ===== Sidebar End ===== --> */}

//         {/* <!-- ===== Content Area Start ===== --> */}
//         <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
//           {/* <!-- ===== Header Start ===== --> */}
//           <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//           {/* <!-- ===== Header End ===== --> */}

//           {/* <!-- ===== Main Content Start ===== --> */}
//           <main>
//             <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
//               {children}
//             </div>
//           </main>
//           {/* <!-- ===== Main Content End ===== --> */}
//         </div>
//         {/* <!-- ===== Content Area End ===== --> */}
//       </div>
//       {/* <!-- ===== Page Wrapper End ===== --> */}
//     </div>
//   );
// };

// export default DefaultLayout;

import React, { useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get the current location (route)
  const location = useLocation();

  // Check if the current path is in the excluded list
  const isAuthPage = ['/login', '/register','/auth/signup','/auth/signin'].includes(location.pathname);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* Only render the page wrapper if not on the auth pages */}
      {!isAuthPage && location.pathname != '/'  ? (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar only if not on auth pages */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          {/* Content Area */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* Header only if not on auth pages */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      ): (
        <main>{children}</main>
      )}
      {/* If on auth pages, just render the children (no sidebar, no header) */}
      {/* {isAuthPage && } */}
    </div>
  );
};

export default DefaultLayout;

