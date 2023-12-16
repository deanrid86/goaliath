import Image from 'next/image';
import { UpdateGoal, DeleteGoal } from '@/app/ui/goals/buttons';
import GoalsStatus from '@/app/ui/goals/status';
import { fetchFilteredGoals } from '@/app/lib/data';
import { goaldata } from '@/app/lib/placeholder-data';
import { PuzzlePieceIcon, ShoppingCartIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default async function GoalsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const goals = await fetchFilteredGoals(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {goals?.map((goal) => (
              <div
                key={goal.goaltype}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src= '/lesson_images/JordanPeterson.png'
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${goal.goaltype} picture`}
                      />
                      <p>{goal.goal}</p>
                    </div>
                    <p className="text-sm text-gray-500">{goal.goaltimeline}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateGoal id={goal.id} />
                    <DeleteGoal id={goal.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Goal Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Goal
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Goal Notes
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Goal Timeline
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {goals?.map((goal) => (
                <tr
                  key={goal.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                    
                    {goal.goaltype === 'Having' && <ShoppingCartIcon />}
                    {goal.goaltype === 'Doing' && <PuzzlePieceIcon />}
                    {goal.goaltype === 'Being' && <TrophyIcon />}
                      <p>{goal.goaltype}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {goal.goal}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {goal.goalnotes}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {goal.goaltimeline}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateGoal id={goal.id} />
                      <DeleteGoal id={goal.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
