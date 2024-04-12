import React from 'react';

import { fetchAllGoalStepsById, fetchGoalsById} from '@/app/lib/data';
import ViewMentalModelForm from '@/app/ui/mentalmodels/specifics-form';
import Image from 'next/image';
import {
 ArrowDownCircleIcon
} from '@heroicons/react/24/outline';
import { AddStep, AddStepNo, CompleteStep, CompleteStepNo, SpecificStepDetail } from '@/app/ui/goals/buttons';
import { Status } from '@/app/ui/goals/statuscompleteinfo';
 
export default async function Page({ params }: { params: { id: string }  }) {
    const id = params.id;

    const goals = await fetchAllGoalStepsById(id);
    const metrics = await fetchAllGoalStepsById(id);
       
      

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
        {goals.map((goal, index) => (
  <React.Fragment key={index}>
    <div className="rounded-xl border border-green-500 p-2 my-2">
      <p><strong>Step {index + 1}:</strong> {goal.stepdescription}</p>
      <p><strong>Days to Complete</strong> {goal.highlevel_timeframe}</p>
      <p><strong>Goal Complete?</strong> Status: {goal.highlevel_statuscomplete}</p>
      <p><strong>Added to Daily Actions?</strong> Status: {goal.highlevel_statusadd}</p>
      <div className="flex flex-row justify-between p-2 m-2 items-center">
        <div className="flex flex-row p-2 border border-black-500 rounded-xl">
          <SpecificStepDetail id={goal.goalid} stepid={goal.highlevelid}/>
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
      <div className="flex-1 border border-black p-2">
        <h3><strong>Goal Metrics</strong></h3>
        <div className="rounded-xl border border-green-500 p-2 my-2">
          <h4>Goal Creation Date</h4>

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