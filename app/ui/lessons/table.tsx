import Image from 'next/image';
import { UpdateLesson, DeleteLesson } from '@/app/ui/lessons/buttons';
import { fetchFilteredLessons } from '@/app/lib/data';
import { insertActionData } from '@/app/lib/actions';


export default async function LessonsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const lessons = await fetchFilteredLessons(query, currentPage);

  const handleAddToActions = async ( lessonauthor:string, lesson:string, lessonnotes:string) => {
    try {
      await insertActionData (lessonauthor, lesson, lessonnotes);
      console.log('Added to Today\'s Actions');
    } catch (error) {
      console.error('Error adding to Today\'s Actions:', error);
    }
  };
  

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {lessons?.map((lesson) => (
              <div
                key={lesson.id}
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
                        alt={`${lesson.lessonauthor}'s profile picture`}
                      />
                      <p>{lesson.lesson}</p>
                    </div>
                    <p className="text-sm text-gray-500">{lesson.lessontype}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    
                    <UpdateLesson id={lesson.id} />
                    <DeleteLesson id={lesson.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lesson
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lesson Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lesson Use
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {lessons?.map((lesson) => (
                <tr
                  key={lesson.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                    <Image
                        src= '/lesson_images/JordanPeterson.png'
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt="An alternative table"
                      />
                      <p>{lesson.lessonauthor}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lesson.lesson}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lesson.lessontype}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lesson.lessonuse}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                    <button
                       onClick={() => handleAddToActions(lesson.lessonauthor, lesson.lesson, lesson.lessonnotes)}
                        className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
                        Add to Todays Actions
                        </button>
                      <UpdateLesson id={lesson.id} />
                      <DeleteLesson id={lesson.id} />
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
