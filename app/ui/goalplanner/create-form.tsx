import Link from 'next/link';
import { createGoal} from '@/app/lib/actions';
import React, { useState} from 'react';



export default function Form () {
    const [userFirstGoal, setUserFirstGoal] = useState('');
    const [userFirstGoalTimeline, setUserFirstGoalTimeline] = useState('');
    const [userFirstGoalAvailableHours, setUserFirstGoalAvailableHours] = useState('');

    return (
      
      <form action={createGoal}>
        <div className = "rounded-xl flex min-w-full bg-black-300 ">
       <div className="w-1/2 m-2 p-2">
    {/* Goal Input */}
    <div className="flex items-center my-2">
      <label htmlFor="goalInput" className="mr-2 text-white w-48">Enter your first goal:</label>
      <input
        id="goalInput"
        name="goal"
        type="text"
        placeholder='e.g. Start an online business'
        value={userFirstGoal}
        onChange={(e) => setUserFirstGoal(e.target.value)}
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>

    {/* Timeline Input */}
    <div className="flex items-center my-2">
      <label htmlFor="timelineInput" className="mr-2 text-white w-48">Approximate time to achieve (Months):</label>
      <input
        id="timelineInput"
        name="timeline"
        type="number"
        placeholder='e.g. 12'
        value={userFirstGoalTimeline}
        onChange={(e) => setUserFirstGoalTimeline(e.target.value)}
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>

    {/* Hours Per Day Input */}
    <div className="flex items-center my-2">
      <label htmlFor="hoursInput" className="mr-2 text-white w-48">Free hours per day:</label>
      <input
        id="hoursInput"
        name="hours"
        type="number"
        placeholder='e.g. 3'
        value={userFirstGoalAvailableHours}
        onChange={(e) => setUserFirstGoalAvailableHours(e.target.value)}
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>
  </div>

  <div className='bg-black-500 p-2 m-2 rounded-xl w-1/2'>
          <p className="text-white">We aim to assist you in achieving your goals effectively. Please provide the following information:
            <br/>
            <br/>
            Your primary goal.
            <br/>
            The desired timeline for achieving this goal.
            <br/>
            The number of free hours you can dedicate to this goal daily.
            <br/>
            <br/>
            We will use AI to create a personalized schedule and blueprint to maximize your chances of success. Your goal schedule outline will be displayed below on the left, and you can request detailed plans for each milestone on the right.
          </p>
        </div>
        
  
          
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/goal-planner"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          
        </div>
      </form>
    );
  }