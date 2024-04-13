import { PencilIcon, PlusIcon, TrashIcon, BackspaceIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { addLesson, deleteLesson, removeLesson, removeLessonDA } from '@/app/lib/actions';

export function CreateLesson() {
  return (
    <Link
      href="/dashboard/lessons/create"
      className="flex h-10 items-center rounded-lg bg-teal-300 text-orange-300 px-4 text-sm font-medium  hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-500"
    >
      <span className="hidden md:block">Create Lesson</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateLesson({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/lessons/${id}/edit`}
      className="rounded-md border p-2 bg-teal-300 text-orange-300 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
/*Need to sort out delete capability*/
export function DeleteLesson({ id }: { id: string }) {
  const deleteLessonWithId = deleteLesson.bind(null, id);
  return (
    <form action={deleteLessonWithId}>
      <button className="rounded-md border p-2 bg-teal-300 text-orange-300 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function AddLesson({ id }: { id: string }) {
  const addLessonWithID = addLesson.bind(null, id);
  return (
    <form action={addLessonWithID}>
      <button title="Add to Daily Activity" className="rounded-md border p-2 bg-teal-300 text-orange-300 hover:bg-gray-100">
        <span className="sr-only">Add to Daily Activity</span>
        <PlusIcon className="w-5" />
      </button>
    </form>
  );
}

export function RemoveLesson({ id }: { id: string }) {
  const removeLessonWithID = removeLesson.bind(null, id);
  return (
    <form action={removeLessonWithID}>
      <button title="Remove from Daily Activity" className="rounded-md border p-2 bg-teal-300 text-orange-300 hover:bg-gray-100">
        <span className="sr-only">Remove from Daily Activity</span>
        <BackspaceIcon className="w-5" />
      </button>
    </form>
  );
}

export function RemoveLessonDA({ id }: { id: string }) {
  const removeLessonDAWithID = removeLessonDA.bind(null, id);
  return (
    <form action={removeLessonDAWithID}>
      <button title="Remove from Daily Activity" className="rounded-md border bg-teal-300 text-orange-300 p-2 hover:bg-gray-100">
        <span className="sr-only">Remove from Daily Activity</span>
        <BackspaceIcon className="w-5" />
      </button>
    </form>
  );
}