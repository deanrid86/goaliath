
import { fetchLatestGoalStep} from "@/app/lib/data";
import { getDateDaysFromToday, formatDateToLocal } from "@/app/lib/utils";
import { UpdateStepAI } from "@/app/ui/todaysactions/buttons";

import DayStepChat from "@/app/ui/todaysactions/daystepchat";




interface StepDetail {
  description: string;
  timeframe: {
    value: number;
    // Include any other properties that might exist within 'timeframe'
  };
}

interface Steps {
  [key: string]: StepDetail;
}


export default async function GoalViewer() {
 
   
   const latestGoalStep = await fetchLatestGoalStep();
  const setLatestGoalStep = latestGoalStep[0].specificparsedresult;
  const step1Detail = setLatestGoalStep ? setLatestGoalStep['Step 1'] : null;
  //Added Ternary Operator incase Chat GPT returns a ditect value instead of an object
 const stepCompletion = step1Detail ? (typeof step1Detail.timeframe === 'object' ? step1Detail.timeframe.value : step1Detail.timeframe) : 0; 
  //Functionality to get the date when the step should be complete
  const completionDate = getDateDaysFromToday(stepCompletion);
  const formattedCompletionDate = formatDateToLocal(completionDate);
  const paramsid = latestGoalStep[0].id; //This gets the id to pass down to the edit button
  console.log (latestGoalStep[0].statusadd);
  console.log (latestGoalStep[0].statuscomplete);




   
   
   

 return (

        <div>
             <div >
          <h1 className='text-white text-xl p-2 m-2'>Todays Actions</h1>
        </div>
        <div >
          <h3 className='text-white text-xl bg-black-600 rounded-xl p-2 '>What Steps do you want to Complete Today?</h3>
        </div>
       
       {/*} <div> !!!!! KEEP THIS DO NOT DELETE. THIS SHOWS ALL STEPS AND MIGHT COME IN USEFUL!!!
        {setLatestGoalStep && Object.entries(setLatestGoalStep as Steps).map(([stepKey, stepDetails], index) => (
                <div key={index} className='bg-gray-100 p-4 rounded-lg border border-black-600 border-solid'>
                    <h3>{stepKey}</h3>
                    <p>Description: {stepDetails.description}</p>
                    <p>Timeframe: {stepDetails.timeframe.value} days</p>
                </div>
            ))}
        </div> */}
          <div>
            {/* Directly access and display Step 1 */}
        {setLatestGoalStep && setLatestGoalStep['Step 1'] && (
          <div className='bg-gray-100 p-2 rounded-lg border  border-solid m-2'>
            <h1><strong>Todays Step</strong></h1>
            <br/>
            <p><strong>Description:</strong> {setLatestGoalStep['Step 1'].description}</p>
            <br/>
            <p><strong>Timeframe: </strong>{setLatestGoalStep['Step 1'].timeframe.value} days</p>
            <br/>
            <p>You should be aiming to complete this step by <strong>{formattedCompletionDate}</strong>.</p>
            <br/>
            <p>Do You want to Add this step to the Daily Actions? : {latestGoalStep[0].statusadd}</p>
            <p>Have you completed this step? : {latestGoalStep[0].statuscomplete}</p>
            <UpdateStepAI id={paramsid}/>
          </div>
        )}
          </div>
          <div>
  
            <DayStepChat todaysStep={step1Detail.description} todaysTime={stepCompletion}/>
          </div>
        <div className = "rounded-xl flex min-w-full bg-gray-100 ">
            
               <div className='text-black text-xl bg-black-300 rounded-xl p-2 m-2 w-1/2'>
                
            
                
                
            </div>
           
            <div>
            
            </div>
        </div>
        </div>
    );
}


