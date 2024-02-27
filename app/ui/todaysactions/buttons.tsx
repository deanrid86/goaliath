import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteStepInput } from "@/app/lib/actions";


export function UpdateStepInput({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/todaysactions/stepinput/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteStepInput({ id }: { id: string }) {
    const deleteStepWithId = deleteStepInput.bind(null, id);
    return (
      <>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </>
    );
  }

  export function UpdateStepAI({ id }: { id: string }) {
    return (
      <Link
      href={`/dashboard/todaysactions/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }