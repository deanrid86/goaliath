import { CheckCircleIcon, TrashIcon, Bars4Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { completeGoal, deleteGoal} from '@/app/lib/actions';

export function GoalDetail ({ id }: { id: string }){
return (
    <Link
    href={`/dashboard/goals/${id}/details`}
      className="rounded-md border p-2 hover:bg-gray-100"
      title="Goal Details"
    >
      <Bars4Icon className="w-5" />
    </Link>
  );
}

export function SpecificStepDetail ({ id, stepid }: { id: string; stepid: string }){
  return (
      <Link
      href={`/dashboard/goals/${id}/details/${stepid}/dailysteps`}
        className="rounded-md border p-2 hover:bg-gray-100"
        title="Specific Step Details"
      >
        <Bars4Icon className="w-5" />
      </Link>
    );
  }



{/*export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
} */}

export function CompleteGoal({ id }: { id: string }) {
  const completeGoalWithID = completeGoal.bind(null, id);
  return (
    <form action={completeGoalWithID}>
      <button title="Goal Complete?" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Completed?</span>
        <CheckCircleIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteGoal({ id }: { id: string }) {
  const deleteGoalWithId = deleteGoal.bind(null, id);
  return (
    <form action={deleteGoalWithId}>
      <button title="Delete Goal" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
