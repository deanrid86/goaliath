import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteGoal } from '@/app/lib/actions';

export function CreateGoal() {
  return (
    <Link
      href="/dashboard/goals/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Goal</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateGoal({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/goals/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
/*Need to sort out delete capability*/
export function DeleteGoal({ id }: { id: string }) {
  const deleteGoalWithId = deleteGoal.bind(null, id);
  return (
    <form action={deleteGoalWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
