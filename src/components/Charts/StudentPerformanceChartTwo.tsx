import { ApexOptions } from 'apexcharts';
import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { AuthContext } from '../../contexts/ContextProvider';

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const StudentPerformanceChartTwo: React.FC = ({user_id}) => {

  const {fetchWithAuth} = useContext(AuthContext)

  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Courses',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'Engaged',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await fetchWithAuth({
          method: 'GET',
          path: `/students/${user_id}/progress/analytics`,
        });
        console.log(data?.data);  // Log the response to check the structure

        // Assuming data?.data contains the structure as described:
        const { weekly_video_count, weekly_progress } = data?.data;

        // Update the state with the fetched data
        setState(prevState => ({
          ...prevState,
          series: [
            {
              name: 'Courses',
              data: weekly_video_count,  // Set the 'Courses' data to weekly_video_count
            },
            {
              name: 'Engaged',
              data: weekly_progress,  // Set the 'Engaged' data to monthly_video_count
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchCourse();
  }, [user_id]);
  
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;  

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Course engagement this week
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
     
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentPerformanceChartTwo;
