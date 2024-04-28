import React from 'react';

import { fetchAllGoalStepsById, fetchAllLatestGoalsAndHighStepsStatus, fetchCompletionPercentage, fetchGoalsById, fetchHighCompletionPercentage, fetchSpecificLevelStepsAdd} from '@/app/lib/data';
import ViewMentalModelForm from '@/app/ui/mentalmodels/specifics-form';
import Image from 'next/image';
import {
 ArrowDownCircleIcon,
 ArrowTrendingUpIcon,
 BellAlertIcon,
 BoltIcon,
 CalendarDaysIcon,
 CheckCircleIcon,
 ClockIcon,
 FireIcon,
 HandThumbUpIcon,
 ListBulletIcon,
 ReceiptPercentIcon
} from '@heroicons/react/24/outline';
import { AddStep, AddStepNo, CompleteStep, CompleteStepNo, CreateSpecificGoalStep, SpecificStepDetail } from '@/app/ui/goals/buttons';
import { Status } from '@/app/ui/goals/statuscompleteinfo';
import {addDaysToChatTime, calculateDaysLeft, totalHourforStep } from "@/app/lib/utils";
import { ProgressBar } from "@/app/ui/progressbar";
 
export default async function Page({ params }: { params: { id: string }  }) {
    const id = params.id;

    const goals = await fetchAllGoalStepsById(id);
    const metrics = await fetchAllGoalStepsById(id);
    const totalgoals = await fetchCompletionPercentage ();
    const totalgoalspercentage = totalgoals.percentage_complete;
    const goalstotal = totalgoals.total_count;
    const goalscompleted = totalgoals.completed_count;
    const hightotalgoals = await fetchHighCompletionPercentage (id);
    const hightotalgoalspercentage = hightotalgoals.percentage_complete;
    const hightotalgoalscompleted = hightotalgoals.completed_count;
    const hightotalgoalstotal = hightotalgoals.total_count;
    const specificgoal = await fetchAllLatestGoalsAndHighStepsStatus ();
       
      

  return (
    <main>
     
      <div className='mb-2  rounded-lg bg-gray-50'> {/*Parent Div*/}
        
      <div className="flex "> {/* Top Horizontal Div */}
 

  <div className="flex flex-1"> {/* Remaining DIV to the right of the Image */}
    <div className="flex flex-row flex-1"> {/* Container for Model Name and Skill Level */}
      <div className="flex-1  p-2"> {/* Div for Goal Step Name */}
      <div className= "flex justify-center border border-black rounded-xl bg-black-600 text-white text-xl">
        <h3><strong>Goal Steps</strong></h3>
      </div>
        
        {goals.map((goal, index) => (
  <React.Fragment key={index}>
    <div className="rounded-xl border border-black bg-purple-700 text-orange-300 p-2 my-2">
    <div className="flex items-center mb-2">
    <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
      <p><strong>{index + 1}. </strong> <span className='text-xl'>{goal.stepdescription}</span></p>
      </div>
      <hr/>
      <div className="flex items-center mb-2">
      <CalendarDaysIcon className="h-5 w-5 mr-2" />
      <p><strong>Days to Complete</strong> {goal.highlevel_timeframe}</p>
      </div>
      <hr/>
      <div className="flex items-center mb-2">
      <HandThumbUpIcon className="h-5 w-5 mr-2" />
      <p><strong>Goal Complete?</strong>  {goal.highlevel_statuscomplete}</p>
      </div>
      <hr/>
      <div className="flex items-center mb-2">
      <CheckCircleIcon className="h-5 w-5 mr-2" />
      <p><strong>Added to Daily Actions?</strong>  {goal.highlevel_statusadd}</p>
      </div>
      <hr/>
      <div className="flex flex-row justify-between p-2 m-2 items-center">
        <div className="flex flex-row p-2 border border-black-500 rounded-xl">
          <SpecificStepDetail id={goal.goalid} stepid={goal.highlevelid}/>
          <CreateSpecificGoalStep id={goal.id}/>
        </div>
        
        <div className="flex flex-row p-2 border border-black-500 rounded-xl">
          <CompleteStep id={goal.id}/>
        <CompleteStepNo id={goal.id}/>
        </div>
        <div className="flex flex-row  p-2 border border-black-500 rounded-xl">
          <AddStep id={goal.id} />
        <AddStepNo id={goal.id} />
        </div>
        
      </div>
    </div>
    <div className="flex justify-center my-2"> {/* Adjust the styling as needed */}
      <ArrowDownCircleIcon className="  h-10 w-10" />
    </div>
  </React.Fragment>
))}
      </div>
      <div className="flex-1 p-2">
      <div className= "flex justify-center border border-black rounded-xl bg-black-600 text-white text-xl">
        <h3><strong>Goal Metrics</strong></h3>
        </div>
        
          <div className='text-orange-300 text-xl bg-teal-300 rounded-xl p-2 mt-2'>
            <h4>Goals Completed</h4>
          </div>
          

     
      <div className="flex justify-center items-center  p-4">
  <div className="flex-1 flex flex-col items-center space-y-2">
  <BoltIcon className="h-5 w-5" />
    <p><strong>Total Goals Created</strong></p>
    <span className="block text-lg bg-orange-300 rounded-xl p-2 text-black">{goalstotal}</span>
  </div>
  <div className="flex-1 flex flex-col items-center space-y-2">
  <HandThumbUpIcon className="h-5 w-5 " />
    <p><strong>Goals Completed</strong></p>
    <span className="block text-lg bg-orange-300 rounded-xl p-2 text-black">{goalscompleted}</span>
  </div>
  <div className="flex-1 flex flex-col items-center space-y-2">
  <ReceiptPercentIcon className="h-5 w-5 " />
    <p><strong>Percentage of Goals Complete</strong></p>
    <span className="block text-lg bg-orange-300 rounded-xl p-2 text-black ">{totalgoalspercentage} %</span>
  </div>
</div>
        <div className='text-orange-300 text-xl bg-teal-300 rounded-xl p-2'>
          <h4>Step Engagement (Current Goal)</h4>
        </div>

        <div className = "flex justify-center items-center  p-4">
        <div className="flex-1 flex flex-col items-center space-y-2">
  <ArrowTrendingUpIcon className="h-5 w-5" />
          <p>
            <strong>Steps within Goal</strong> 
          </p>
          <span className="block text-lg bg-orange-300 rounded-xl p-2 text-black ">{hightotalgoalstotal}</span>
          </div>
          <div className="flex-1 flex flex-col items-center space-y-2">
  <HandThumbUpIcon className="h-5 w-5" />
          <p>
            <strong>Steps Completed </strong> 
          </p>
          <span className="block text-lg bg-orange-300 rounded-xl p-2 text-black ">{hightotalgoalscompleted}</span>
          </div>
          <div className="flex-1 flex flex-col items-center space-y-2">
  <ReceiptPercentIcon className="h-5 w-5" />
          <p>
           <strong>Percentage of Steps Completed </strong>  
          </p>
          <span className="block text-lg bg-orange-300 rounded-xl p-2 text-black ">{hightotalgoalspercentage} %</span>
          </div>
        </div>
        <div>

        <div className='text-orange-300 text-xl bg-teal-300 rounded-xl p-2 mt-2'>
            <h4>Steps currently on daily actions</h4>
          </div>
            <div className=" m-2 p-2">
            {/* Directly access and display Step 1 */}
            {specificgoal.map((step, index) => (
            <div key={index}>
            <div className="bg-gray-100 m-2 flex items-center border border-black-500 rounded-xl p-2" >
            <ListBulletIcon className="h-5 w-5 mr-2" />
              <strong>Main Goal Step:</strong> {step.stepdescription} 
             </div>
            <div className="bg-gray-50 m-2">
              
            <div className="flex items-center mb-2">
          <CalendarDaysIcon className="h-5 w-5 mr-2" />
              <p><strong>Timeframe:</strong>To be completed within {step.timeframe} days to keep your goal on track.</p>
              </div>
              <br />
              <div className="flex items-center mb-2">
          <FireIcon className="h-5 w-5 mr-2" />
              <p><strong>Total Hours to Dedicate to Step:</strong>{totalHourforStep (step.userhours, step.timeframe)} hours.</p>
              </div>
              <br />
              <div className="flex items-center mb-2">
          <ClockIcon className="h-5 w-5 mr-2" />
              <p><strong>Deadline (When step should be completed):</strong> {addDaysToChatTime(step.chattime, step.timeframe)}</p>
              </div>
              <br />
              <div className="flex items-center mb-2">
          <BellAlertIcon className="h-5 w-5 mr-2" />
              <p><strong>Days Left Until Completion:</strong> {calculateDaysLeft(addDaysToChatTime(step.chattime, step.timeframe))}</p>
              </div>
              {/* ProgressBar component usage */}
              <div className="flex justify-center items-center">
                <div style={{ width: '33%' }}>
              <ProgressBar 
                timeframe={step.timeframe} 
                daysLeft={calculateDaysLeft(addDaysToChatTime(step.chattime, step.timeframe))} 
              />
              </div>
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