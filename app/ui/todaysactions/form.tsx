

import React from 'react';
import { createGoalStep } from '@/app/lib/actions';
import { useState } from 'react';

export default async function Form () {


    return(
        <div>
            <form action = {createGoalStep}>
            
                
                <div className="flex items-center my-2">
                <label htmlFor="date" className="mr-2 text-black w-48">What is todays date:  </label>
          <input
                type="text"
                name="date"
                placeholder="e.g. 14/02/2024"
                className='flex-grow text-black rounded-lg p-2 m-2'
                required
            />
            
            </div>
            <div className="flex items-center my-2">
            <label htmlFor="goalstep" className="mr-2 text-black w-48">Write todays steps to take:</label>
            <input
                type="text"
                name="goalstep"
                placeholder="e.g. Research business ideas"
                className='flex-grow text-black rounded-lg p-2 m-2'
                required
            />
            </div>
            <div className="flex items-center my-2">
            <label htmlFor="stephours" className="mr-2 text-black w-48">Total hours until completion:</label>
            <input
                type="text"
                name="stephours"
                placeholder="e.g. 2"
                className='flex-grow text-black rounded-lg p-2 m-2'
                required
            />
            </div>
            
            <button className='flex h-10 items-center rounded-lg bg-black-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 m-2 p-2'>
           Submit
            </button>
            </form>
        </div>
    );
}