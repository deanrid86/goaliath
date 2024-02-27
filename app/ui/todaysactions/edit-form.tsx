

import React from 'react';
import { updateGoalStep } from '@/app/lib/actions';
import { useState } from 'react';
import {
    CheckIcon,
    ClockIcon,
  } from '@heroicons/react/24/outline';
  import Link from 'next/link';
  import { Button } from '@/app/ui/button';
import { GoalInputForm } from '@/app/lib/definitions';
  
export default async function EditGoalInputForm ({goalInput} : {goalInput: GoalInputForm}) {
  const updateGoalInputWithId = updateGoalStep.bind(null, goalInput.id);

    return(
        <div>
            <div className="border p-2">
            <form action = {updateGoalInputWithId}>
            
                
                <div className="flex items-center my-2" >
                <label htmlFor="date" className="mr-2 text-black w-48">What is todays date:  </label>
          <input
                type="text"
                name="date"
                placeholder="e.g. 14/02/2024"
                className='flex-grow text-black rounded-lg p-2 m-2'
                
            />
            
            </div>
            <div className="flex items-center my-2">
            <label htmlFor="goalstep" className="mr-2 text-black w-48">Write todays steps to take:</label>
            <input
                type="text"
                name="goalstep"
                placeholder="e.g. Research business ideas"
                className='flex-grow text-black rounded-lg p-2 m-2'
               
            />
            </div>
            <div className="flex items-center my-2">
            <label htmlFor="stephours" className="mr-2 text-black w-48">Total hours until completion:</label>
            <input
                type="text"
                name="stephours"
                placeholder="e.g. 2"
                className='flex-grow text-black rounded-lg p-2 m-2'
                
            />
            {/* Invoice Status */}
            <div className="flex items-center my-2">
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the completion status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="not complete"
                  name="statuscomplete"
                  type="radio"
                  value="not complete"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="not complete"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Not Complete <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="complete"
                  name="statuscomplete"
                  type="radio"
                  value="complete"
                  
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="complete"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Complete <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the added to list status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="dont add to list"
                  name="statusadd"
                  type="radio"
                  value="dont add to list"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="dont add to list"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Dont Add to List <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="add to list"
                  name="statusadd"
                  type="radio"
                  value="add to list"
                  
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="add to list"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Add to List <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
            </div>
            
            <Link
          href="/dashboard/todaysactions/stepinput"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Action</Button>
            </form>
            </div>
        </div>
    );
}