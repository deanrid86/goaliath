
import {  fetchCompletionPercentage, fetchLessonsByAddStatus, fetchMentalModelsByAddStatus, fetchSpecificCompletionPercentage, fetchSpecificLevelStepsAdd, fetchSpecificLevelStepsComplete} from "@/app/lib/data";
import {addDaysToChatTime, calculateDaysLeft } from "@/app/lib/utils";
import { AddSpecificStepNoDA, CompleteSpecificStepDA } from "@/app/ui/goals/buttons";
import { RemoveLessonDA } from "@/app/ui/lessons/buttons";
import { RemoveMentalModelDA } from "@/app/ui/mentalmodels/buttons";
import { ProgressBar } from "@/app/ui/progressbar";
import FormEmail from "@/app/ui/todaysactions/formemail";
import { ArrowTrendingUpIcon, BellAlertIcon, BoltIcon, CalendarDaysIcon, ClockIcon, ListBulletIcon } from "@heroicons/react/24/outline";

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
const specificLessons = await fetchLessonsByAddStatus ();
const dean = await fetchCompletionPercentage ();




const currenttime = new Date ();
const currentimestring = currenttime.toISOString();


return (

        <div>
         <div className="mx-auto max-w-4xl p-4">
                <h1 className="text-3xl font-bold text-center">Your Action Plan for Today</h1>
                <p className="mt-4 text-lg text-gray-600">
                On this page, you will encounter a detailed schedule of your daily action plan, meticulously organized to support your personal and professional aspirations. Each item listed represents not only a task to be accomplished but also an opportunity for growth and learning. By engaging with the contents of this page, you will be able to access the specific goals and steps you have set for yourself, integrate wisdom from external lessons, and apply mental models to enhance your decision-making processes. This setup is crafted to ensure that each day you are equipped with the tools and knowledge necessary to progress effectively towards your objectives, making every action meaningful and every lesson impactful.
                </p>
          </div>
        <div >
          <h3 className='text-orange-300 text-xl bg-teal-300 rounded-xl p-2 '>What Steps do you want to Complete Today?</h3>
        </div>
          <div>
            <div className="border border-black m-2 p-2">
            {/* Directly access and display Step 1 */}
            {specificgoal.map((step, index) => (
    <div key={index}>
      <div className="bg-gray-100 m-2 flex items-center border border-black-500 rounded-xl p-2">
        <ListBulletIcon className="h-5 w-5 mr-2" />
        <div>
          <strong>Main Goal Step:</strong> {step.stepdescription}
          <br />
          Timeframe: {step.specific_timeframe} days
        </div>
      </div>
      
      <div className="bg-gray-50 m-2">
        <div className="flex items-center mb-2">
          <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
          <p><strong>Step to Work on Today:</strong> {step.specificparsedresult}</p>
        </div>
        <div className="flex items-center mb-2">
          <CalendarDaysIcon className="h-5 w-5 mr-2" />
          <p><strong>Timeframe:</strong> To be completed within {step.specific_timeframe} days to keep your goal on track.</p>
        </div>
        <div className="flex items-center mb-2">
          <ClockIcon className="h-5 w-5 mr-2" />
          <p><strong>Deadline:</strong> {addDaysToChatTime(step.specificchattime, step.specific_timeframe)}</p>
        </div>
        <div className="flex items-center mb-2">
          <BellAlertIcon className="h-5 w-5 mr-2" />
          <p><strong>Days Left Until Completion:</strong> {calculateDaysLeft(addDaysToChatTime(step.specificchattime, step.specific_timeframe))}</p>
        </div>
        <div className="flex justify-center items-center">
  <div style={{ width: '33%' }}>
    <ProgressBar 
      timeframe={step.specific_timeframe} 
      daysLeft={calculateDaysLeft(addDaysToChatTime(step.specificchattime, step.specific_timeframe))} 
    />
  </div>
</div>
            
              <div className="flex flex-row justify-right p-2">
                <CompleteSpecificStepDA id={step.specific_id}/>
                <AddSpecificStepNoDA id={step.specific_id}/>
              </div>
            </div>
          </div>
        ))}
           
          </div>
       
          </div>
         
          <h3 className='text-orange-300 text-xl bg-teal-300 rounded-xl p-2 '>
            Added Mental Models
          </h3>
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
            <div>
              <RemoveMentalModelDA id={step.modelid}/>
            </div>
          </div>
        ))}
        </div>
        
          <h3 className='text-orange-300 text-xl bg-teal-300 rounded-xl p-2 '>
            Added Lessons
          </h3>
          <div>
            <div className="border border-black m-2 p-2">
            {/* Directly access and display Step 1 */}
            {specificLessons.map((step, index) => (
            <div key={index}>
            <div className="bg-gray-300 m-2" >
              <strong>Lesson :</strong> {step.lesson} 
            </div>
            <div className="bg-gray-200 m-2">
              <p><strong>Description:</strong> {step.lessonnotes} </p>
              <br/>
              <p><strong>How to use the lesson:</strong>{step.lessonuse}</p>
              <br />
              <p><strong>Resources:</strong> {step.lessonsource}</p>
            </div>
            <div>
              <RemoveLessonDA id={step.id}/>
            </div>
          </div>
        ))}
        </div>
        </div>

        </div>
        </div>
    );
}


