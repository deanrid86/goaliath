

import Link from 'next/link';
import { LightBulbIcon, ChatBubbleBottomCenterTextIcon, FingerPrintIcon, IdentificationIcon, FilmIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateLesson } from '@/app/lib/actions';
import { LessonForm } from '@/app/lib/definitions';

export default function EditLessonForm({ lesson }: { lesson: LessonForm }) {
  const updateLessonWithId = updateLesson.bind(null, lesson.id);

  return (
    <form action={updateLessonWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Lesson */}
        <div className="mb-4">
          <label htmlFor="lesson" className="mb-2 block text-sm font-medium">
            Edit Lesson
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lesson"
                name="lesson"
                defaultValue={lesson.lesson}
                placeholder="Edit Lesson"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <LightBulbIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lesson Notes */}
        <div className="mb-4">
          <label htmlFor="lessonnotes" className="mb-2 block text-sm font-medium">
            Edit Lesson Notes
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessonnotes"
                name="lessonnotes"
                defaultValue={lesson.lessonnotes}
                placeholder="Edit Lesson Notes"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lesson Type */}
        <div className="mb-4">
          <label htmlFor="lessontype" className="mb-2 block text-sm font-medium">
            Edit Lesson Type
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessontype"
                name="lessontype"
                defaultValue={lesson.lessontype}
                placeholder="Edit Lesson Type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <FingerPrintIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lesson Use */}
        <div className="mb-4">
          <label htmlFor="lessonuse" className="mb-2 block text-sm font-medium">
            Edit Lesson Use
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessonuse"
                name="lessonuse"
                defaultValue={lesson.lessonuse}
                placeholder="Edit Lesson Use"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lesson Source */}
        <div className="mb-4">
          <label htmlFor="lessonsource" className="mb-2 block text-sm font-medium">
            Edit Lesson Source
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessonsource"
                name="lessonsource"
                defaultValue={lesson.lessonsource}
                placeholder="Edit Lesson Source"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <FilmIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lesson Author */}
        <div className="mb-4">
          <label htmlFor="lessonauthor" className="mb-2 block text-sm font-medium">
            Edit Lesson Author
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessonauthor"
                name="lessonauthor"
                defaultValue={lesson.lessonauthor}
                placeholder="Edit Lesson Author"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <FaceSmileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/lessons"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Lesson</Button>
      </div>
    </form>
  );
}