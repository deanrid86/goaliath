
import Link from 'next/link';
import {
    ChatBubbleBottomCenterTextIcon,
    FaceSmileIcon,
    FilmIcon,
    FingerPrintIcon,
    IdentificationIcon,
    LightBulbIcon
    
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createLesson } from '@/app/lib/actions';

export default function Form () {
  return (
    
    <form action={createLesson}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
       {/* Lesson */}
       <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            What is the Lesson
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lesson"
                name="lesson"
                placeholder="Enter Lesson"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <LightBulbIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lessonnotes */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lesson Notes
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessonnotes"
                name="lessonnotes"
                placeholder="Enter Lesson Notes"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lessontype */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lesson Type
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessontype"
                name="lessontype"
                placeholder="Enter Lesson Type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <FingerPrintIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lessonuse */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lesson Use
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessonuse"
                name="lessonuse"
                placeholder="Enter Lesson Use"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lessonsource */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lesson Source
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessonsource"
                name="lessonsource"
                placeholder="Enter Lesson Source"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <FilmIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lessonauthor */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lesson Author
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lessonauthor"
                name="lessonauthor"
                placeholder="Enter Lesson Author"
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
        <Button className="bg-teal-300 text-orange-300 hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-500" type="submit">Create Lesson</Button>
      </div>
    </form>
  );
}
