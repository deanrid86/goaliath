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
  } from '@heroicons/react/24/outline';
  import {capitalizeFirstWord} from '@/app/lib/utils';
  
  const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
    lesson: AcademicCapIcon, 
    expenditure: CurrencyPoundIcon,
    buffer: ViewfinderCircleIcon,
    minimum: CalculatorIcon,
    goals: ArrowUpIcon,
    month: CalendarDaysIcon,
    days: ClockIcon,
  };
  
 export function Card({
    title,
    value,
    type,
    color,
  }: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected'| 'lesson'| 'expenditure'| 'buffer'| 'minimum' | 'goals' | 'month' | 'days';
    color: string;
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className={` ${color} p-2 shadow-sm`}>
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-black" /> : null}
          <h3 className="ml-2 text-sm font-medium text-blue text-center">{title}</h3>
        </div>
        <p className="text-black text-center justify-end">
        {typeof value === 'string' ? capitalizeFirstWord(value) : value}
        </p>
      </div>
    );
  }