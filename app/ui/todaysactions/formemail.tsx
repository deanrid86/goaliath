"use client";

import React from 'react';
import { sendEmail } from '@/app/lib/actions';
 
export default function FormEmail () {

return (
            <div>
                <div className="flex items-center my-2">
                <form action = {sendEmail}>
                <div className="flex items-center my-2">
                <label htmlFor="email" className="mr-2 text-white w-48">What is your email:  </label>
          <input
                type="text"
                name="email"
                placeholder="e.g. me@example.com"
                className='flex-grow text-black rounded-lg p-2 m-2'
                required
            />
                </div>
                <button className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 m-2 p-2'>
                    Send Email
                </button>
                </form>
                </div>
            
              </div>
              );

}