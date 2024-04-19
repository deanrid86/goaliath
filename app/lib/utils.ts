import { Revenue, Income, Expenditure } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function getDateDaysFromToday(days: number): string {
  const today = new Date();
  today.setDate(today.getDate() + days);
  
  // Return the date in YYYY-MM-DD format
  return today.toISOString().split('T')[0];
}

export function addDaysToChatTime(chatTime: Date, timeFrame: number): string {
  // Add the timeframe to the date
  chatTime.setDate(chatTime.getDate() + timeFrame);

  // Convert the Date object to an ISO string and slice to get the date part
  const formattedDate = chatTime.toISOString().slice(0, 10);

  // Return the formatted date
  return formattedDate; // Outputs date in 'YYYY-MM-DD' format
}

export function totalHourforStep(userhours: number, timeFrame: number) {
 
 const totalhours =  userhours * timeFrame;

 return totalhours;

};





export function addMonthsToChatTime(chatTime: string, months: number): string {
  // Directly parse the chatTime string to a Date object
  const date = new Date(chatTime);

  // Add the months to the date
  date.setMonth(date.getMonth() + months);

  // Return the updated date as a string
  // Formatting the date to match your desired format: Sat Mar 09 2024 14:30:46 GMT+0000 (Greenwich Mean Time)
  // This is a more complex format to generate in JavaScript without external libraries like 'date-fns' or 'moment.js'
  // Here is a simple version using toLocaleString, adjust as needed
  return date.toLocaleString('en-US', { 
    weekday: 'short', // "Sat"
    year: 'numeric', // "2024"
    month: 'short', // "Mar"
    day: 'numeric', // "9"
    hour: '2-digit', // "14"
    minute: '2-digit', // "30"
    second: '2-digit', // "46"
    timeZoneName: 'short', // "GMT+0"
    hour12: false // 24hr format
  });
}

export function calculateDaysLeft(deadlineString: string): number {
  const deadline = new Date(deadlineString);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffTime = deadline.getTime() - now.getTime(); // Removed Math.abs()

  // Convert the difference to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

function calculateDaysBetweenDates(dateString1: string, dateString2: string): number {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
}

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generateYAxisIncome = (income: Income[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...income.map((month) => month.income));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generateYAxisExpenditure = (expenditure: Expenditure[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...expenditure.map((exp) => exp.cost));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function capitalizeFirstWord(str:string) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/^\w/, (c) => c.toUpperCase());
}
