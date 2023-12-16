'use client';

import {GoalDetail} from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  FingerPrintIcon,
  ChatBubbleBottomCenterTextIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateGoal} from '@/app/lib/actions';

export default function EditGoalsForm({goals}:{goals: GoalDetail;}) {
  const updateGoalWithId = updateGoal.bind(null, goals.id);
  return (
    <form action={updateGoalWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
       {/* Goal Type */}
       <div className="mb-4">
          <label htmlFor="goaltype" className="mb-2 block text-sm font-medium">
            Goal Type
          </label>
          <div className="relative">
            <select
              id="goaltype"
              name="goaltype"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={goals.goaltype}
            >
              <option value="" disabled>
                Select a Goal
              </option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.goaltype}>
                  {goal.goaltype}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Goal */}
        <div className="mb-4">
                <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                    Goal 
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                    <input
                        id="goal"
                        name="goal"
                        defaultValue={goal.goal}
                        placeholder="Enter Goal"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <FingerPrintIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                </div>

        {/* Goal Notes */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Goal Notes
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="goalnotes"
                name="goalnotes"
                defaultValue={goal.goalnotes}
                placeholder="Enter Goal Notes"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      

        {/* Goal Realisation */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Goal Realisation
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="goalrealisation"
                name="goalrealisation"
                defaultValue={goal.goalrealisation}
                placeholder="Enter what you will see when your goal is realised"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Goal Timeline */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Goal Timeline
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="goaltimeline"
                name="goaltimeline"
                placeholder="Enter Goal Timeline"
                defaultValue={goal.goaltimeline}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Goal Urgency */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Goal Urgency
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="goalurgency"
                name="goalurgency"
                defaultValue={goal.goalurgency}
                placeholder="Enter Goal Urgency"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Goal Reminder Status */}
        <div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the goal reminder status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="noreminder"
                  name="goalreminder"
                  type="radio"
                  value="no"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="noreminder"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  No <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="reminder"
                  name="goalreminder"
                  type="radio"
                  value="yes"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="reminder"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Yes <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

                {/* Goal Achieved Status */}
                <div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the goal achieved status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="notachieved"
                  name="goalachieved"
                  type="radio"
                  value="no"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="notachieved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Not Achieved <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="achieved"
                  name="goalachieved"
                  type="radio"
                  value="yes"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="achieved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Achieved <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
        
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/goals"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Goals</Button>
      </div>
      </div>
    </form>
    
  );
}
