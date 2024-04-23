import { createGoalGPT } from "@/app/lib/actions";
import React from "react";
import { Button } from '@/app/ui/button';
import { fetchLatestGoalAndSteps } from "@/app/lib/data";
import SubmitButtonSpinner from "@/app/ui/spinner_button";
import { BoltIcon, CalendarDaysIcon, ClockIcon, ListBulletIcon, UserIcon } from "@heroicons/react/24/outline";
import ModalBox from "@/app/ui/modal";

export default async function Page () {

  const latestSteps = await fetchLatestGoalAndSteps ();
  const time = latestSteps[0].goalplanner_chattime;
  const formattedTime = time.toLocaleString();
  const goal = latestSteps[0].goalplanner_usergoal;
  const timeline = latestSteps[0].goalplanner_usertimeline;
  const hours = latestSteps[0].goalplanner_userhours;

  function capitalizeFirstLetter(string:string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const message = "Hi Everybody"

    return (
        <div>
          <div className="mx-auto max-w-4xl p-4">
                <h1 className="text-3xl font-bold text-center">Goal Planner</h1>
                <p className="mt-4 text-lg text-black p-2 ">
                Welcome to the Goal Planner page, where your aspirations are transformed into actionable plans. Here, you are invited to 
                specify your goals, the timeframe you aim to achieve them in, and your daily availability. Leveraging advanced AI, 
                this tool analyzes your inputs and devises a structured strategy with specific, timed steps. Each step is clearly outlined, 
                showing what actions to take and the dedicated time required for each, ensuring your path towards achieving your goals is
                 both efficient and clear. This interactive platform empowers you to navigate your journey with precision and informed guidance.
                </p>
            </div>
      
        
        <div className = " justify-center rounded-xl flex min-w-full bg-gray-100 "> {/*Div carrying the table */}
        <form action = {createGoalGPT} className="space-y-3 ">
       <div className="flex-1  rounded-lg bg-gray-50 px-6 pb-4 pt-8 border border-black">
    {/* Goal Input */}
    <div className="w-full">
      <div>
      <label htmlFor="usergoal" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Enter goal you would like to achieve:</label>
      <div className="relative">
      <input
        id="usergoal"
        name = "usergoal"
        type="text"
        placeholder='e.g. Start a business'
        required
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <BoltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
    </div>

    {/* Timeline Input */}
    <div className="mt-4">
      <label htmlFor="usertimeline" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Approximate time to achieve (Months):</label>
      <div className="relative">
      <input
        id="timelineInput"
        name = "usertimeline"
        type="number"
        placeholder='e.g. 12'
        required
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
    </div>

    {/* Hours Per Day Input */}
    <div className="mt-4">
      <label htmlFor="userFirstGoalAvailableHours" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Free hours per day:</label>
      <div className="relative">
      <input
        id="userFirstGoalAvailableHours"
        name = "userFirstGoalAvailableHours"
        type="number"
        placeholder='e.g. 3'
        required
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
    </div>
  </div>
  </div>
  <div className = "w-full flex justify-center">
    <SubmitButtonSpinner/>
  </div>

 
  
        
        </form>
        </div>
        <div>
          <div className = "rounded-xl bg-teal-300 p-2 mt-2 flex justify-between items-start">
            <div>
            <h3 className = "text-orange-300 text-3xl font-bold">
              Lastest Goal Steps
            </h3>
            <div>
              <p className = "text-white text-sm font-medium">Date of goal creation: {formattedTime} </p> 
            </div>
            </div>
            <div className="text-right">
            <p className="text-white text-sm font-medium">Your goal: {capitalizeFirstLetter(goal)} </p> 
            <p className = "text-white text-sm font-medium">Timeframe in months: {timeline} </p> 
            <p className = "text-white text-sm font-medium">Dedicated hours a day: {hours} </p>
            <div>
    <ModalBox content = {message}/>
  </div> 
            </div>
          </div>
        
        <div className=" p-2">
            
            {/* Directly access and display Step 1 */}
            {latestSteps.map((step, index) => (
    <div key={index} className={`bg-gray-100 m-2 ${index < latestSteps.length - 1 ? 'border-b border-gray-300' : ''}`}>
      <div className="flex items-center space-x-2">
        <ListBulletIcon className="h-5 w-5 text-gray-500" />
        <p><strong className = "text-3xl font-bold">{index + 1}</strong> <span className="font-medium">{step.stepdescription}</span></p>
      </div>
      <br/>
      <div className="flex items-center space-x-2 mb-1">
        <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
        <p className = "bg-teal-300 text-white rounded-lg p-1">Days to Complete: <span className = "text-orange-300 font-bold">{step.timeframe}</span></p>
      </div>
    </div>
  ))}
</div>
       
          </div>
        </div>
       

        
        
    );
}