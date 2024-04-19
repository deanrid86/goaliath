import React from 'react';

import { fetchAllGoalStepsById, fetchCompletionPercentage, fetchFullLevelStepsAdd, fetchSpecificCompletionPercentage, fetchSpecificGoalStepsById, fetchSpecificLevelStepsAdd} from '@/app/lib/data';
import ViewMentalModelForm from '@/app/ui/mentalmodels/specifics-form';
import Image from 'next/image';
import {
 ArrowDownCircleIcon
} from '@heroicons/react/24/outline';
import { AddSpecificStep, AddSpecificStepNo, CompleteSpecificStep, CompleteSpecificStepNo } from '@/app/ui/goals/buttons';
import {addDaysToChatTime, calculateDaysLeft, totalHourforStep } from "@/app/lib/utils";
import { ProgressBar } from "@/app/ui/progressbar";
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const specificsteps = await fetchAllGoalStepsById(id);

    const totalgoals = await fetchCompletionPercentage ();
    const totalgoalspercentage = totalgoals.percentage_complete;
    const goalstotal = totalgoals.total_count;
    const goalscompleted = totalgoals.completed_count;
    const specifictotalgoals = await fetchSpecificCompletionPercentage (id);
    const specifictotalgoalspercentage = specifictotalgoals.percentage_complete;
    const specifictotalgoalscompleted = specifictotalgoals.completed_count;
    const specifictotalgoalstotal = specifictotalgoals.total_count;
    const specificgoal = await fetchFullLevelStepsAdd ();
       
      

  return (
    <main>
     
      <div className='mb-2 border border-black rounded-lg bg-gray-50'> {/*Parent Div*/}
        
      <div className="flex "> {/* Top Horizontal Div */}
  <div> {/* Div for Image */}
  <Image
                        src= "/modellogos/Goaliath Logo.png"
                        className="p-2  rounded-full"
                        width={150}
                        height={150}
                        alt={`Goaliath Logo`}
            />
  </div>

  <div className="flex flex-1"> {/* Remaining DIV to the right of the Image */}
    <div className="flex flex-row flex-1"> {/* Container for Model Name and Skill Level */}
      <div className="flex-1 border border-black p-2"> {/* Div for Goal Step Name */}
        <h3><strong>Goal Steps</strong></h3>
        {specificsteps.map((step, index) => (
  <React.Fragment key={index}>
    <div className="rounded-xl border border-green-500 p-2 my-2">
      <p><strong>Step {index + 1}:</strong> {step.specificparsedresult}</p>
      <p><strong>Days to Complete</strong> {step.specific_timeframe}</p>
      <p><strong>Goal Complete?</strong> Status: {step.specific_statuscomplete}</p>
      <p><strong>Added to Daily Actions?</strong> Status: {step.specific_statusadd}</p>
      <div className = "flex flex-row p-2 m-2">
        <div className='flex flex-row p-2 border border-black-500 rounded-xl'>
        <CompleteSpecificStep id={step.specific_id}/>
        <CompleteSpecificStepNo id={step.specific_id}/>
        </div>
        <div className='flex flex-row p-2 border border-black-500 rounded-xl'>
          <AddSpecificStep id={step.specific_id}/>
      <AddSpecificStepNo id={step.specific_id}/>
        </div>
      
      </div>
    </div>
    <div className="flex justify-center my-2"> {/* Adjust the styling as needed */}
      <ArrowDownCircleIcon className="  h-10 w-10" />
    </div>
  </React.Fragment>
))}
      </div>
      <div className="flex-1 border border-black p-2">
        <h3><strong>Goal Metrics</strong></h3>
        <div className="rounded-xl border border-green-500 p-2 my-2">
          <h4>Goals Completed</h4>

        </div>
        <div className = "border border-black rounded-xl p-2">
          <p>
            Total Amount of Goals Created: {goalstotal}
          </p>
          <p>
            Number of Goals Completed: {goalscompleted}
          </p>
          <p>
           Total percentage of Goals Complete:  {totalgoalspercentage} %
          </p>
        </div>
        <div className="rounded-xl border border-green-500 p-2 my-2">
          <h4>Step Engagement</h4>
        </div>
        <div className = "border border-black rounded-xl p-2">
          <p>
            Total Amount of Steps within Goal: {specifictotalgoalstotal}
          </p>
          <p>
            Total Amount of Steps Completed within Goal: {specifictotalgoalscompleted}
          </p>
          <p>
           Total Percentage of Steps Completed within Goal:  {specifictotalgoalspercentage} %
          </p>
        </div>
        <div>
            <div className="border border-black m-2 p-2">
            {/* Directly access and display Step 1 */}
            {specificgoal.map((step, index) => (
            <div key={index}>
            <div className="bg-gray-300 m-2" >
              <strong>Main Goal Step:</strong> {step.stepdescription} 
             
            </div>
            <div className="bg-gray-200 m-2">
              
              <p><strong>Timeframe:</strong>To be completed within {step.specific_timeframe} days to keep your goal on track.</p>
              <br />
              <p><strong>Total Hours to Dedicate to Step:</strong>{totalHourforStep (step.userhours, step.specific_timeframe)} hours.</p>
              <br />
              <p><strong>Deadline (When step should be completed):</strong> {addDaysToChatTime(step.specificchattime, step.specific_timeframe)}</p>
              <br />
              <p><strong>Days Left Until Completion:</strong> {calculateDaysLeft(addDaysToChatTime(step.specificchattime, step.specific_timeframe))}</p>
              {/* ProgressBar component usage */}
              <div className='p-2'>
              <ProgressBar 
                timeframe={step.specific_timeframe} 
                daysLeft={calculateDaysLeft(addDaysToChatTime(step.specificchattime, step.specific_timeframe))} 
              />
            </div>
            </div>
          </div>
        ))}
           
          </div>
       
          </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      
     { /*<ViewMentalModelForm mentalmodel={mentalmodel} />*/}
    </main>
  );
}