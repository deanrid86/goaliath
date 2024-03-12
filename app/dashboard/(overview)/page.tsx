import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import IncomeChart from '@/app/ui/dashboard/income-chart';
import ExpenditureChart from '@/app/ui/dashboard/expenditure-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import LatestGoals from '@/app/ui/dashboard/latest-lessons2';
import {  fetchLatestInvoices, fetchCardData, fetchHighLevelStepsComplete,fetchCardDataFinance, fetchHighLevelSteps, fetchAllLatestGoals, fetchSpecificLevelStepsComplete } from '@/app/lib/data';
import LatestGoalCards from '@/app/ui/goalplanner/latest-goals';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';
import LatestLessons from '@/app/ui/dashboard/latest-lessons';




 
export default async function Page() {
  
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  const {
    numberOfLessons,
    totalMonthlyExpenditure,
    bufferExpenditure,
    minimumDailyEarnings
    } = await fetchCardDataFinance();
  const highStepsAdded = await fetchHighLevelSteps();
  const allgoals =await fetchAllLatestGoals();
  const completedSteps = await fetchHighLevelStepsComplete();
  const completedSpecificSteps = await fetchSpecificLevelStepsComplete ();


  const allGoalTotal = allgoals.length;
  const allHighStepsAdd =highStepsAdded.length;
  const allCompletedSteps = completedSteps.length;
  const allCompletedSpecifiSteps = completedSpecificSteps.length;

  

  return (
    <main>
      <h1 className ="2mb-4 text-xl md:text-2xl text-black"> 
        Dashboard
      </h1>
     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Active Goals" value={allGoalTotal} type="goals" />
        <Card title="Current Goal Steps added to Actions" value={allHighStepsAdd} type="days" />
        <Card title="Amount of Completed Goal Steps" value={allCompletedSteps} type="buffer" />
        <Card title="Amount of Completed Daily Steps" value={allCompletedSpecifiSteps} type="minimum" />
      </div>
      <div className='bg-white rounded-xl mt-2 mb-2 p-2'>
        <h2>Lastest Goals Created</h2>
        <LatestGoalCards/>
      </div>
      <div>
      <h1>All My Goals</h1>
      {allgoals.length > 0 ? (
        <div>
          {allgoals.map((goal, index) => (
            <div key={index} className="goal">
              <h2>Goal {index + 1}: {goal.usergoal}</h2>
              {/* You can add more details about each goal here */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading goals...</p>
      )}
    </div>
    
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      { /* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
          </Suspense>*/}
        {/*<Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>*/}
        <IncomeChart />
        <LatestLessons />

        
      </div>
    </main>
  );
}