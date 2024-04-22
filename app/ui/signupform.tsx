'use client'

import { signup } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { SignupButton } from './signupbutton'
import { AtSymbolIcon, KeyIcon, UserIcon } from '@heroicons/react/24/outline'

 
export function SignupForm() {
  const [state, action] = useFormState(signup, undefined)
 
  return (
    
    <form action={action} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 > 
          Please sign up to continue.
        </h1>
        <div className="w-full">
      <div>
        <label htmlFor="firstname" className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        >
          First Name
        </label>
        <div className="relative">
        <input 
        id="firstname" 
        name="firstname"
         placeholder="First Name" 
         className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
         required
         />
         <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      </div>
      {state?.errors?.firstname && <p>{state.errors.firstname}</p>}

      <div className="mt-4">
        <label 
        htmlFor="surname"
          className="mb-3 mt-5 block text-xs font-medium text-gray-900">
            Surname
        </label>
        <div className="relative">
        <input id="surname"
        name="surname" 
        placeholder="Surname" 
        required
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"/>
       <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      </div>
      {state?.errors?.surname && <p>{state.errors.surname}</p>}
 
      <div className="mt-4">
        <label htmlFor="email"
        className="mb-3 mt-5 block text-xs font-medium text-gray-900">
          Email
        </label>
        <div className="relative">
        <input id="email" name="email" placeholder="Email" className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" required/>
        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div className="mt-4">
        <label htmlFor="password"
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        >
          Password
        </label>
        <div className="relative">
        <input id="password" name="password" type="password" placeholder="Password" className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"/>
        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      </div>
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full pt-3">
        <SignupButton  />
      </div>
      </div>
    </form>
    
  )
}