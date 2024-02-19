
import { fetchGoalStepInput, fetchLatestGoalStep, fetchLatestGoals } from "@/app/lib/data";
import { getDateDaysFromToday, formatDateToLocal } from "@/app/lib/utils";
import { DeleteStepInput } from "@/app/ui/todaysactions/buttons";
import Form from "@/app/ui/todaysactions/form";
import FormEmail from "@/app/ui/todaysactions/formemail";


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
 
   const goalStepInput = await fetchGoalStepInput ();
   const latestGoalStep = await fetchLatestGoalStep();
  const setLatestGoalStep = latestGoalStep[0].specificparsedresult;
  const step1Detail = setLatestGoalStep ? setLatestGoalStep['Step 1'] : null;
  const stepCompletion = step1Detail.timeframe.value;
 
//Functionality to get the date when the step should be complete
const completionDate = getDateDaysFromToday(stepCompletion);
const formattedCompletionDate = formatDateToLocal(completionDate);



   
   
   

 return (

        <div>
             <div >
          <h1 className='text-white text-xl p-2 m-2'>Todays Actions</h1>
        </div>
        <div >
          <h3 className='text-white text-xl bg-black-300 rounded-xl p-2 m-2'>What steps do you want to complete today?</h3>
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
          <div className='bg-gray-100 p-4 rounded-lg border border-black-600 border-solid'>
            <h3>Todays Step</h3>
            <br/>
            <p><strong>Description:</strong> {setLatestGoalStep['Step 1'].description}</p>
            <br/>
            <p><i>Timeframe: </i>{setLatestGoalStep['Step 1'].timeframe.value} days</p>
            <br/>
            <p>You should be aiming to complete this step by <strong>{formattedCompletionDate}</strong>.</p>
          </div>
        )}
          </div>
        <div className = "rounded-xl flex min-w-full bg-black-300 ">
            {/* Goal Input */}
            <div className="w-1/2 m-2 p-2">
              <Form/>
              </div>
              <div>
                <FormEmail/>
              </div>
              
              
              <div className='text-white text-xl bg-black-300 rounded-xl p-2 m-2 w-1/2'>
                
            {goalStepInput.map((step) => (
                <div key={step.uniqueid} className='text-white text-xl bg-black-600 rounded-xl p-2 m-2'>
                    <p><span>Created:</span> <span className='text-green-500'>{step.date}</span></p>
                    <p><span>Action:</span> <span className='text-green-500'>{step.goalstep}</span></p>
                    <p><span>Allocated time:</span> <span className='text-green-500'>{step.stephours} hours</span></p>
                    <div><DeleteStepInput uniqueid={step.uniqueid}/></div>
                </div>
                ))}
                
                
            </div>
           
            <div>
            
            </div>
        </div>
        </div>
    );
}


