import { PencilIcon, PlusIcon, TrashIcon, Bars4Icon, BackspaceIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { addMentalModel, deleteInvoice, removeMentalModel, removeMentalModelDA } from '@/app/lib/actions';

export function MentalModelDetail ({ id }: { id: string }){
return (
    <Link
    href={`/dashboard/mentalmodels/${id}/specifics`}
      className="rounded-md border p-2 bg-purple-700 text-green-400 hover:bg-green-400 hover:text-black-500"
    >
      <Bars4Icon className="w-5" />
    </Link>
  );
}

export function AddMentalModel({ id }: { id: string }) {
  const addMentalModelWithID = addMentalModel.bind(null, id);
  return (
    <form action={addMentalModelWithID}>
      <button title="Add to Daily Activity" className="rounded-md border p-2 bg-purple-700 text-green-400 hover:bg-green-400 hover:text-black-500">
        <span className="sr-only">Add to Daily Activity</span>
        <PlusIcon className="w-5" />
      </button>
    </form>
  );
}

export function RemoveMentalModel({ id }: { id: string }) {
  const removeMentalModelWithID = removeMentalModel.bind(null, id);
  return (
    <form action={removeMentalModelWithID}>
      <button title="Remove from Daily Activity" className="rounded-md border p-2 bg-purple-700 text-green-400 hover:bg-green-400 hover:text-black-500">
        <span className="sr-only">Remove from Daily Activity</span>
        <BackspaceIcon className="w-5" />
      </button>
    </form>
  );
}

export function RemoveMentalModelDA({ id }: { id: string }) {
  const removeMentalModelDAWithID = removeMentalModelDA.bind(null, id);
  return (
    <form action={removeMentalModelDAWithID}>
      <button title="Remove from Daily Activity" className="rounded-md border p-2 bg-purple-700 text-green-400 hover:bg-green-400 hover:text-black-500">
        <span className="sr-only">Remove from Daily Activity</span>
        <BackspaceIcon className="w-5" />
      </button>
    </form>
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
}



export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}*/}
