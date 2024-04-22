'use client'
 
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useFormStatus, useFormState } from 'react-dom'

export function SignupButton() {
    const { pending } = useFormStatus()
   
    return (
      <button 
        aria-disabled={pending}
        type="submit"
        className="flex h-10 items-center w-full justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="mr-2">{pending ? 'Submitting...' : 'Sign up'}</span>
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    );
}