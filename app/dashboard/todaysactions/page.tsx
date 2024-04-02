
import {  fetchMentalModelsByAddStatus, fetchSpecificLevelStepsAdd, fetchSpecificLevelStepsComplete} from "@/app/lib/data";
import {addDaysToChatTime, calculateDaysLeft } from "@/app/lib/utils";
import { ProgressBar } from "@/app/ui/progressbar";
import FormEmail from "@/app/ui/todaysactions/formemail";

interface StepDetail {
  description: string;
  timeframe: {
    value: number;
    
  };
}

interface Steps {
  [key: string]: StepDetail;
}

export default async function GoalViewer() {
 
const specificgoal = await fetchSpecificLevelStepsAdd ();
const specificgoalcomplete = await fetchSpecificLevelStepsComplete ();
const specificMentalModels = await fetchMentalModelsByAddStatus ();
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
              <p><strong>Deadline:</strong> {addDaysToChatTime(step.specificchattime, step.timeframe)}</p>
              <br />
              <p><strong>Days Left Until Completion:</strong> {calculateDaysLeft(addDaysToChatTime(step.specificchattime, step.timeframe))}</p>
              {/* ProgressBar component usage */}
              <ProgressBar 
                timeframe={step.timeframe} 
                daysLeft={calculateDaysLeft(addDaysToChatTime(step.specificchattime, step.timeframe))} 
              />
            </div>
          </div>
        ))}
           
          </div>
        <FormEmail/>
          </div>
          <div>
        <div >
          <h3 className='text-white text-xl bg-black-600 rounded-xl p-2 '>Your Completed Steps</h3>
        </div>
              <div className="border border-black m-2 p-2">
                {/* Directly access and display Step 1 */}
            {specificgoalcomplete.map((step, index) => (
            <div key={index}>
            <div className="bg-gray-300 m-2" >
              <strong>Main Goal Step:</strong> {step.stepdescription} 
            </div>
            <div className="bg-gray-200 m-2">
              <p><strong>Completed Steps:</strong> {step.specificparsedresult} </p>
              <br/>
              <p><strong>How Long you Took to Complete:</strong></p>
             
            </div>
          </div>
        ))}
              </div>
              
          </div>
          <h1 className='text-white text-xl bg-black-600 rounded-xl p-2 '>
            Added Mental Models
          </h1>
          <div>
            <div className="border border-black m-2 p-2">
            {/* Directly access and display Step 1 */}
            {specificMentalModels.map((step, index) => (
            <div key={index}>
            <div className="bg-gray-300 m-2" >
              <strong>Mental Model :</strong> {step.modelname} 
            </div>
            <div className="bg-gray-200 m-2">
              <p><strong>Description:</strong> {step.description} </p>
              <br/>
              <p><strong>Real Life Examples</strong>{step.realexamples}</p>
              <br />
              <p><strong>Resources:</strong> {step.sourcesreferences}</p>
            </div>
          </div>
        ))}
        </div>
        </div>
        </div>
    );
}


