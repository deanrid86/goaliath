import { createGoalGPT } from "@/app/lib/actions";
import React from "react";
import { Button } from '@/app/ui/button';
import { fetchLatestGoalAndSteps } from "@/app/lib/data";
import SubmitButtonSpinner from "@/app/ui/spinner_button";

export default async function Page () {

  const latestSteps = await fetchLatestGoalAndSteps ();
  const time = latestSteps[0].goalplanner_chattime;
  const formattedTime = time.toLocaleString();

    return (
        <div>
        <form action = {createGoalGPT}>
            <div >
          <h3 className='text-white text-xl bg-black-300 rounded-xl p-2'>What Do You Want To Achieve?</h3>
       </div>
        
       <div className = "rounded-xl flex min-w-full bg-black-300 ">
       <div className="w-1/2 m-2 p-2">
    {/* Goal Input */}
    <div className="flex items-center my-2">
      <label htmlFor="usergoal" className="mr-2 text-white w-48">Enter your first goal:</label>
      <input
        id="usergoal"
        name = "usergoal"
        type="text"
        placeholder='e.g. Start an online business'
        
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>

    {/* Timeline Input */}
    <div className="flex items-center my-2">
      <label htmlFor="usertimeline" className="mr-2 text-white w-48">Approximate time to achieve (Months):</label>
      <input
        id="timelineInput"
        name = "usertimeline"
        type="number"
        placeholder='e.g. 12'
    
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>

    {/* Hours Per Day Input */}
    <div className="flex items-center my-2">
      <label htmlFor="userFirstGoalAvailableHours" className="mr-2 text-white w-48">Free hours per day:</label>
      <input
        id="userFirstGoalAvailableHours"
        name = "userFirstGoalAvailableHours"
        type="number"
        placeholder='e.g. 3'
        
        
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>
  </div>
  <SubmitButtonSpinner/>
        </div>
        </form>

        <div>
          <div>
            <h3>
              Lastest Goal Produced
            </h3>
            <div>Date of Goal Creation: {formattedTime}  </div>
          </div>
        <div className="border border-black m-2 p-2">
            
            {/* Directly access and display Step 1 */}
            {latestSteps.map((step, index) => (
            
            <div key={index}>
              
            <div className="bg-gray-300 m-2" >
              <p><strong>Step {index + 1}:</strong> {step.stepdescription} </p>
              <p><strong>Days to Complete:</strong> {step.timeframe}</p>

             
            </div>
           
            </div>
          
        ))}
           
          </div>
       
          </div>
        </div>
        
        
    );
}