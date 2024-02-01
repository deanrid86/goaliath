import { generateYAxisExpenditure } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
{/*import { lusitana } from '@/app/ui/fonts';*/}
import { fetchExpenditure} from '@/app/lib/data';
import { expenditure } from '@/app/lib/placeholder-data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function ExpenditureChart() { // Make component async, remove the props
  const expenditure = await fetchExpenditure(); // Fetch data inside the component
  const chartHeight = 350;
  // NOTE: comment in this code when you get to this point in the course

  const { yAxisLabels, topLabel } = generateYAxisExpenditure(expenditure);

  if (!expenditure || expenditure.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
    }

  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl text-white"> {/*className=mb-4 text-xl md:text-2xl`}*/}
        Monthly Expenditure
      </h2>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-gray-box p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {expenditure.map((exp) => (
            <div key={exp.exp} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-greenblue-400"
                style={{
                  height: `${(chartHeight / topLabel) * exp.cost}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {exp.exp}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">During the Month</h3>
        </div>
      </div>
    </div>
  );
}
