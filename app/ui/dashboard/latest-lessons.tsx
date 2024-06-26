import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
{/*import { lusitana } from '@/app/ui/fonts';*/}
import { fetchLatestLessons } from '@/app/lib/data';

export default async function LatestLessons() { 
  const latestLessons = await fetchLatestLessons();
  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <div className="flex grow flex-col justify-between rounded-xl bg-white text-blue p-4 border border-black">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-gray-box px-6">
          {latestLessons.map((lesson, i) => {
            return (
              <div
                key={lesson.id}
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
                    alt={`${lesson.lessonauthor}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={60}
                    height={60}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {lesson.lesson}
                    </p>
                    <p className="hidden text-sm  sm:block">
                      {lesson.lessonnotes}
                    </p>
                  </div>
                </div>
                <p
                  className="truncate text-sm font-medium md:text-base" 
                >
                  {lesson.lessontype}
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
