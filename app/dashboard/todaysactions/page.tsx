
import { fetchHighLevelSteps, fetchLatestGoalStep, fetchSpecificLevelSteps} from "@/app/lib/data";
import { getDateDaysFromToday, formatDateToLocal, addDaysToChatTime } from "@/app/lib/utils";
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
 
const specificgoal = await fetchSpecificLevelSteps ();
console.log (specificgoal);




   
   
   

 return (

        <div>
             <div >
          <h1 className='text-black text-xl p-2 m-2'>Todays Actions</h1>
        </div>
        <div >
          <h3 className='text-white text-xl bg-black-600 rounded-xl p-2 '>What Steps do you want to Complete Today?</h3>
        </div>
          <div>
            <div className="border border-black m-2 p-2">
            {/* Directly access and display Step 1 */}
            {specificgoal.map((step, index) => (
            <div key={index}>
            <div className="bg-gray-300 m-2" >
              <strong>Main Goal Step:</strong> {step.stepdescription} 
              <br/>Timeframe: {step.timeframe} days
            </div>
            <div className="bg-gray-200 m-2">
              <p><strong>Step to Work on Today:</strong> {step.specificparsedresult} </p>
              <br/>
              <p><strong>Timeframe:</strong>To be completed within {step.timeframe} days to keep your goal on track.</p>
              <br />
              <strong>Deadline:</strong> {addDaysToChatTime(step.specificchattime, step.timeframe)}
            </div>
          </div>
        ))}
           
          </div>
        
          </div>
          <div>
  
            {/*<DayStepChat todaysStep={step1Detail.description} todaysTime={stepCompletion}/>*/}
          </div>
        
        </div>
    );
}


