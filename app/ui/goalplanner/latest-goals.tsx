import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
{/*import { lusitana } from '@/app/ui/fonts';*/}
import { fetchLatestGoals } from '@/app/lib/data';


export default async function LatestGoalsCard() { 
  const latestGoals = await fetchLatestGoals();
  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className = "mb-4 text-xl md:text-2xl text-white" > {/* className={`${lusitana.className} mb-4 text-xl md:text-2xl`}*/}
        Latest Goals
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-black-300 text-blue p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-gray-box px-6">
          {latestGoals.map((goal, i) => {
            return (
              <div
                key={goal.chatTime}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src='/lesson_images/JordanPeterson.png'
                    alt={`'s profile picture`}
                    className="mr-4 rounded-full"
                    width={60}
                    height={60}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {goal.userGoal}
                    </p>
                    <p className="hidden text-sm text-white sm:block">
                      {goal.userTimeline}
                    </p>
                  </div>
                </div>
                <p
                  className="truncate text-sm font-medium md:text-base" 
                >
                  {goal.userHours}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}