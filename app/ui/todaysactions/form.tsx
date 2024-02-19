"use client";

import React from 'react';
import { createGoalStep } from '@/app/lib/actions';
import { useState } from 'react';

export default function Form () {

    const [isLoading, setIsLoading] = useState();

     //This is the function responsible for the spinning icon that shows loading when a button is pressed.
   const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

    return(
        <div>
            <form action = {createGoalStep}>
                
                <div className="flex items-center my-2">
                <label htmlFor="date" className="mr-2 text-white w-48">What is todays date:  </label>
          <input
                type="text"
                name="date"
                placeholder="e.g. 14/02/2024"
                className='flex-grow text-black rounded-lg p-2 m-2'
                required
            />
            </div>
            <div className="flex items-center my-2">
            <label htmlFor="goalstep" className="mr-2 text-white w-48">Write todays steps to take:</label>
            <input
                type="text"
                name="goalstep"
                placeholder="e.g. Research business ideas"
                className='flex-grow text-black rounded-lg p-2 m-2'
                required
            />
            </div>
            <div className="flex items-center my-2">
            <label htmlFor="goalhours" className="mr-2 text-white w-48">Total hours until completion:</label>
            <input
                type="text"
                name="goalhours"
                placeholder="e.g. 2"
                className='flex-grow text-black rounded-lg p-2 m-2'
                required
            />
            </div>
            
            <button className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 m-2 p-2'>
            {isLoading ? <LoadingSpinner /> : "Add Goal"}
            </button>
            </form>
        </div>
    );
}