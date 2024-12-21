// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import react-router-dom for navigation
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

// // Utility function to check if two dates are the same day
// const isSameDay = (date1: Date, date2: Date) => {
//   return date1.getDate() === date2.getDate() &&
//          date1.getMonth() === date2.getMonth() &&
//          date1.getFullYear() === date2.getFullYear();
// };

// const Calendar = () => {
//   const [calendarData, setCalendarData] = useState<any>(null);
//   const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
//   const [selectedDay, setSelectedDay] = useState<number | null>(null); // Track the selected day
//   const [grayedOutDays, setGrayedOutDays] = useState<number[]>([]); // Track days that should be grayed out
//   const navigate = useNavigate(); // Hook for navigation

//   // Get the number of days in a month
//   const getDaysInMonth = (month: number, year: number) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   // Get the starting weekday of the month
//   const getStartDayOfMonth = (month: number, year: number) => {
//     return new Date(year, month, 1).getDay();
//   };

//   // Get events for specific days (Monday, Tuesday, Thursday)
//   const getEventsForDay = (day: number, weekday: number) => {
//     const events: any[] = [];
//     if (weekday === 1 || weekday === 3 ) {
//       // if (weekday === 1 || weekday === 2 || weekday === 4 || weekday === 5) {
//       // Example event
//       events.push({
//         name: 'App Design',
//         // dateRange: '25 Dec - 27 Dec',
//         date: new Date(currentYear, currentMonth, day),  // Specific event day
//       });
//     }
//     return events;
//   };

//   // Fetch and build the calendar structure
//   useEffect(() => {
//     const numDays = getDaysInMonth(currentMonth, currentYear);
//     const startDay = getStartDayOfMonth(currentMonth, currentYear);
//     const daysArray = [];

//     // Add empty cells before the start of the month
//     for (let i = 0; i < startDay; i++) {
//       daysArray.push(null);
//     }

//     // Add the actual days
//     for (let day = 1; day <= numDays; day++) {
//       const weekday = (startDay + day - 1) % 7;
//       const events = getEventsForDay(day, weekday);
//       daysArray.push({ day, events });
//     }

//     // Fill up remaining cells if the last row is incomplete
//     const remainingCells = 7 - (daysArray.length % 7);
//     if (remainingCells !== 7) {
//       for (let i = 0; i < remainingCells; i++) {
//         daysArray.push(null);
//       }
//     }

//     // Set the calendar data
//     setCalendarData({
//       month: currentMonth,
//       year: currentYear,
//       days: daysArray,
//     });
//   }, [currentMonth, currentYear]);

//   // Function to change the month (next/prev)
//   const changeMonth = (direction: 'next' | 'prev') => {
//     if (direction === 'next') {
//       if (currentMonth === 11) {
//         setCurrentMonth(0);
//         setCurrentYear(currentYear + 1);
//       } else {
//         setCurrentMonth(currentMonth + 1);
//       }
//     } else {
//       if (currentMonth === 0) {
//         setCurrentMonth(11);
//         setCurrentYear(currentYear - 1);
//       } else {
//         setCurrentMonth(currentMonth - 1);
//       }
//     }
//   };

//   // Function to render the calendar's days
//   const renderCalendarDays = () => {
//     if (!calendarData) return;

//     const rows: JSX.Element[] = [];
//     let cells: JSX.Element[] = [];

//     const today = new Date(); // Get today's date

//     calendarData.days.forEach((dayData: any, index: number) => {
//       // Skip empty cells (null values)
//       if (dayData === null) {
//         cells.push(
//           <td key={index} className="relative cursor-pointer border p-2 md:h-25 md:p-6 xl:h-31">
//             {/* Empty cells */}
//           </td>
//         );
//       } else {
//         const { day, events } = dayData;
//         const hasEvents = events.length > 0;
//         const isTodayEvent = hasEvents && isSameDay(events[0].date, today);
//         const isPastEvent = hasEvents && events[0].date < today && !isTodayEvent; // Check if the event has passed
//          // Check if it's today
//         const isSelected = selectedDay === day; // Check if this day is selected
//         const isGrayedOut = grayedOutDays.includes(day); // Check if the day is grayed out
       
//         // Handle rendering the event indicator (•)
//         const eventIndicator = hasEvents ? (
//           isTodayEvent ? (
//           <span className={`flex w-3 h-3 me-3 bg-green-500 rounded-full `}></span>
//           ) : isPastEvent ? (
//             <span className={`flex w-3 h-3 me-3 bg-gray-500 rounded-full `}></span>
//             ) : (
//               <span className={`flex w-3 h-3 me-3 bg-blue-500 rounded-full `}></span>
//             )
//         ) : null;

//         // Handle graying out the event and the entire cell
//         const cellClass = isGrayedOut || isPastEvent ? 'bg-gray-200' : '';

//         // Render the day and event details
//         cells.push(
//           <td
//             key={index}
//             className={`relative cursor-pointer border p-2 transition duration-500 ${cellClass} md:h-25 md:p-6 xl:h-31`}
//             onClick={() => {
//               if (isPastEvent) {
//                 // If it's a past event, just show the event details grayed out
//                 setGrayedOutDays((prev) => [...prev, day]);
//               } else {
//                 setSelectedDay(day);
//               }
//             }}
//           >
//             <span className="font-medium text-black dark:text-white">{day}</span>
//             {eventIndicator}

//             {/* Event details popup */}
//             {isSelected && hasEvents && !isPastEvent && (
//               <div onClick={() => {
//                   if (isTodayEvent) {
//                     navigate('/livestream/session');
//                   }
//                 }} className="event absolute left-2 top-8 z-50 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-100 dark:bg-meta-4">
//                 <span className="event-name text-sm font-semibold text-black dark:text-white">
//                   {events[0].name}
//                 </span>
//               </div>
//             )}
//           </td>
//         );
//       }

//       // After every 7 cells (one row), create a new row
//       if ((index + 1) % 7 === 0 || index === calendarData.days.length - 1) {
//         rows.push(<tr className="grid grid-cols-7" key={index}>{cells}</tr>);
//         cells = [];
//       }
//     });

//     return rows;
//   };

//   return (
//     <>
//       <Breadcrumb pageName="Lecture Calendar" />

//       <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="flex justify-between items-center p-4">
//           <button onClick={() => changeMonth('prev')}>&lt; Previous</button>
//           <h2 className="text-xl font-semibold">
//             {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
//           </h2>
//           <button onClick={() => changeMonth('next')}>Next &gt;</button>
//         </div>
//         <table className="min-w-full table-auto text-sm text-left">
//           <thead>
//             <tr className="grid grid-cols-7">
//               <th className="p-1 text-xs font-semibold">Sunday</th>
//               <th className="p-1 text-xs font-semibold">Monday</th>
//               <th className="p-1 text-xs font-semibold">Tuesday</th>
//               <th className="p-1 text-xs font-semibold">Wednesday</th>
//               <th className="p-1 text-xs font-semibold">Thursday</th>
//               <th className="p-1 text-xs font-semibold">Friday</th>
//               <th className="p-1 text-xs font-semibold">Saturday</th>
//             </tr>
//           </thead>
//           <tbody>{renderCalendarDays()}</tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Calendar;


import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { AuthContext } from "../contexts/ContextProvider";

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const Calendar = () => {
  const [calendarData, setCalendarData] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [grayedOutDays, setGrayedOutDays] = useState<number[]>([]);
  const [courses, setCourses] = useState<any[]>([]); 
  const navigate = useNavigate();

  const { fetchWithAuth } = useContext(AuthContext);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetchWithAuth({
          method: "GET",
          path: `/account/calender`,
        });
        setCourses(data?.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [fetchWithAuth]);

  // Get the number of days in a month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the starting weekday of the month
  const getStartDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Get events for specific days based on course registration
  const getEventsForDay = (day: number, weekday: number) => {
    const events: any[] = [];
    courses.forEach((course) => {
      course?.schedules?.forEach((session: any) => {
        const dayMapping = {
          Mon: 1,
          Tue: 2,
          Wed: 3,
          Thu: 4,
          Fri: 5,
          Sat: 6,
          Sun: 0,
        };
        const courseWeekday = dayMapping[session.day_of_week];
        if (courseWeekday === weekday) {
          events.push({
            name: course.title,
            date: new Date(currentYear, currentMonth, day),
            startTime: session.start_time,
            endTime: session.end_time,
          });
        }
      });
    });
    return events;
  };

  // Update the calendar data whenever courses, currentMonth, or currentYear change
  useEffect(() => {
    const numDays = getDaysInMonth(currentMonth, currentYear);
    const startDay = getStartDayOfMonth(currentMonth, currentYear);
    const daysArray = [];

    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= numDays; day++) {
      const weekday = (startDay + day - 1) % 7;
      const events = getEventsForDay(day, weekday);
      daysArray.push({ day, events });
    }

    const remainingCells = 7 - (daysArray.length % 7);
    if (remainingCells !== 7) {
      for (let i = 0; i < remainingCells; i++) {
        daysArray.push(null);
      }
    }

    setCalendarData({
      month: currentMonth,
      year: currentYear,
      days: daysArray,
    });
  }, [courses, currentMonth, currentYear]);

  // Change the month
  const changeMonth = (direction: "next" | "prev") => {
    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  // Render calendar days
  const renderCalendarDays = () => {
    if (!calendarData) return null;

    const rows: JSX.Element[] = [];
    let cells: JSX.Element[] = [];

    const today = new Date();

    calendarData.days.forEach((dayData: any, index: number) => {
      if (dayData === null) {
        cells.push(
          <td key={index} className="relative cursor-pointer border p-2 md:h-25 md:p-6 xl:h-31"></td>
        );
      } else {
        const { day, events } = dayData;
        const hasEvents = events.length > 0;
        const isTodayEvent = hasEvents && isSameDay(events[0].date, today);
        const isPastEvent = hasEvents && events[0].date < today && !isTodayEvent;
        const isSelected = selectedDay === day;
        const isGrayedOut = grayedOutDays.includes(day);

        const eventIndicator = hasEvents ? (
          isTodayEvent ? (
            <span className={`flex w-3 h-3 me-3 bg-green-500 rounded-full`}></span>
          ) : isPastEvent ? (
            <span className={`flex w-3 h-3 me-3 bg-gray-500 rounded-full`}></span>
          ) : (
            <span className={`flex w-3 h-3 me-3 bg-blue-500 rounded-full`}></span>
          )
        ) : null;

        const cellClass = isGrayedOut || isPastEvent ? "bg-gray-200" : "";

        cells.push(
          <td
            key={index}
            className={`relative cursor-pointer border p-2 transition duration-500 ${cellClass} md:h-25 md:p-6 xl:h-31`}
            onClick={() => {
              if (isPastEvent) {
                setGrayedOutDays((prev) => [...prev, day]);
              } else {
                setSelectedDay(day);
              }
            }}
          >
            <span className="font-medium text-black dark:text-white">{day}</span>
            {eventIndicator}
            {isSelected && hasEvents && !isPastEvent && (
              <div
                onClick={() => {
                  if (isTodayEvent) {
                    navigate("/livestream/session");
                  }
                }}
                className="event absolute left-2 top-8 z-50 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-100 dark:bg-meta-4"
              >
                <span className="event-name text-sm font-semibold text-black dark:text-white">
                  {events[0].name}
                </span>
              </div>
            )}
          </td>
        );
      }

      if ((index + 1) % 7 === 0 || index === calendarData.days.length - 1) {
        rows.push(<tr className="grid grid-cols-7" key={index}>{cells}</tr>);
        cells = [];
      }
    });

    return rows;
  };

  return (
    <>
      <Breadcrumb pageName="Lecture Calendar" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center p-4">
          <button onClick={() => changeMonth("prev")}>&lt; Previous</button>
          <h2 className="text-xl font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })}{" "}
            {currentYear}
          </h2>
          <button onClick={() => changeMonth("next")}>Next &gt;</button>
        </div>
        <table className="min-w-full table-auto text-sm text-left">
          <thead>
            <tr className="grid grid-cols-7">
              <th className="p-1 text-xs font-semibold">Sunday</th>
              <th className="p-1 text-xs font-semibold">Monday</th>
              <th className="p-1 text-xs font-semibold">Tuesday</th>
              <th className="p-1 text-xs font-semibold">Wednesday</th>
              <th className="p-1 text-xs font-semibold">Thursday</th>
              <th className="p-1 text-xs font-semibold">Friday</th>
              <th className="p-1 text-xs font-semibold">Saturday</th>
            </tr>
          </thead>
          <tbody>{renderCalendarDays()}</tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
