import Image from 'next/image';
import { UpdateLesson, DeleteLesson } from '@/app/ui/lessons/buttons';
import LessonsStatus from '@/app/ui/lessons/status';
import { fetchFilteredLessons } from '@/app/lib/data';
import { lessonfields } from '@/app/lib/placeholder-data';

export default async function LessonsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const lessons = await fetchFilteredLessons(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {lessons?.map((lesson) => (
              <div
                key={lesson.lessonid}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src='/lesson_images/JordanPeterson.png'
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${lesson.lessonauthor}'s profile picture`}
                      />
                      <p>{lesson.lesson}</p>
                    </div>
                    <p className="text-sm text-gray-500">{lesson.lessonnotes}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateLesson id={lesson.lessonid} />
                    <DeleteLesson id={lesson.lessonid} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Lesson
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lesson Notes
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lesson Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lesson Author
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {lessons?.map((lesson) => (
                <tr
                  key={lesson.lessonid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src='/lesson_images/JordanPeterson.png'
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt="An alternative table"
                      />
                      <p>{lesson.lesson}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lesson.lessonnotes}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lesson.lessontype}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lesson.lessonauthor}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLesson id={lesson.lessonid} />
                      <DeleteLesson id={lesson.lessonid} />
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
