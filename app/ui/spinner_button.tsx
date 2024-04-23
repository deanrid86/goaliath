'use client';

import { useFormStatus } from 'react-dom';
import Spinner from '@/app/ui/spinner'; // Ensure you import the Spinner component

export default function SubmitButtonSpinner() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="flex w-full h-10 items-center rounded-lg bg-black-600 px-4 text-sm font-medium text-white transition-colors hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      {pending ? <Spinner /> : 'Submit'}
    </button>
  );
}