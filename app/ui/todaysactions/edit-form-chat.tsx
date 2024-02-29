import React from 'react';
import { updateGoalStepAI } from '@/app/lib/actions';
import { useState } from 'react';
import {
    CheckIcon,
    ClockIcon,
  } from '@heroicons/react/24/outline';
  import Link from 'next/link';
  import { Button } from '@/app/ui/button';
import { GoalPlannerStep } from '@/app/lib/definitions';
  
export default async function EditGoalAIForm ({goalstep} : {goalstep: GoalPlannerStep}) {
  const updateGoalAIWithId = updateGoalStepAI.bind(null, goalstep.id);

    return(
        <div>
            <div className="border p-2">
            <form action = {updateGoalAIWithId}>
            
                
                
                
            <div>
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
                  id="No"
                  name="statuscomplete"
                  type="radio"
                  value="No"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="No"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Not Complete <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Yes"
                  name="statuscomplete"
                  type="radio"
                  value="Yes"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="Yes"
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
                  id="No"
                  name="statusadd"
                  type="radio"
                  value="No"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="No"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Dont Add to List <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Yes"
                  name="statusadd"
                  type="radio"
                  value="Yes"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="Yes"
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
          href="/dashboard/todaysactions"
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