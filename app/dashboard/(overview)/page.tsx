import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import IncomeChart from '@/app/ui/dashboard/income-chart';
import ExpenditureChart from '@/app/ui/dashboard/expenditure-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import LatestGoals from '@/app/ui/dashboard/latest-lessons2';
import {  fetchLatestInvoices, fetchCardData, fetchLatestLessons,fetchCardDataFinance, fetchLatestGoals } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';




 
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
  const latestLessons = await fetchLatestLessons();
  const latestGoals = await fetchLatestGoals();
  return (
    <main>
      <h1 className ="2mb-4 text-xl md:text-2xl text-white"> {/*className={`${lusitana.className} mb-4 text-xl md:text-2xl`}*/}
        Dashboard
      </h1>
      {/*<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
  </div>*/}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Lessons" value={numberOfLessons} type="lesson" />
        <Card title="Monthly Expenditure" value={`£${totalMonthlyExpenditure.toFixed(2)}`}type="expenditure" />
        <Card title="Expenditure with Buffer" value={`£${bufferExpenditure.toFixed(2)}`} type="buffer" />
        <Card title="Minimum Daily Earnings" value={`£${minimumDailyEarnings.toFixed(2)}`} type="minimum" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      { /* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
          </Suspense>*/}
        {/*<Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>*/}
        <IncomeChart />
        <LatestGoals />
        <ExpenditureChart />

        
      </div>
    </main>
  );
}