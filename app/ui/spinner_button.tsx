'use client';

import { useFormStatus } from 'react-dom';
import Spinner from '@/app/ui/spinner'; // Ensure you import the Spinner component

export default function SubmitButtonSpinner() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="flex items-center">
      {pending ? <Spinner /> : 'Submit'}
    </button>
  );
}