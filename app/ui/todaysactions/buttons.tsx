import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteStepInput } from "@/app/lib/actions";

export function DeleteStepInput({ uniqueid }: { uniqueid: string }) {
    const deleteStepWithId = deleteStepInput.bind(null, uniqueid);
    return (
      <>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </>
    );
  }