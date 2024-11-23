import StudentPerformanceChartOne from './Charts/StudentPerformanceChartOne'
import StudentPerformanceChartTwo from './Charts/StudentPerformanceChartTwo'
import StudentCartOne from './Charts/StudentChartOne'

export default function StudentDetailsAnalysis() {
    

    return (
        <>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <StudentCartOne />
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
            <StudentPerformanceChartOne />
            <StudentPerformanceChartTwo />
        </div>
            
        </>
    )
}
