import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  AcademicCapIcon,
  CurrencyPoundIcon,
  ViewfinderCircleIcon,
  CalculatorIcon,
  ArrowUpIcon,
  CalendarDaysIcon,
  BoltIcon,
  HandThumbUpIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
{/*import { lusitana } from '@/app/ui/fonts';*/}

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  lesson: AcademicCapIcon, 
  expenditure: CurrencyPoundIcon,
  buffer: ViewfinderCircleIcon,
  minimum: CalculatorIcon,
  goals: BoltIcon,
  month: CalendarDaysIcon,
  days: ClockIcon,
  goals_complete : HandThumbUpIcon,
  added_step : CalendarDaysIcon,
  steps_complete : ClipboardDocumentCheckIcon,



};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected'| 'lesson'| 'expenditure'| 'buffer'| 'minimum' | 'goals' | 'month' | 'days' | 'goals_complete' | 'added_step' | 'steps_complete';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-white p-2 shadow-sm border border-black">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-black " /> : null}
        <h3 className="ml-2 text-sm font-medium text-blue text-center">{title}</h3>
      </div>
      <p className="text-black text-center justify-end"> 
        {value}
      </p>
    </div>
  );
}
