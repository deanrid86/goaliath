"use client";

import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { insertChatData, insertCoachData, insertHighLevelStep, updateHighLevelStep, updateSpecificStep } from '@/app/lib/actions';
import {fetchLatestGoals} from '@/app/lib/data';
import { v4 as uuidv4 } from 'uuid';



//This is the origional page
export default function Page() {
  const [goalResult, setGoalResult] = useState('');
  const [userFirstGoal, setUserFirstGoal] = useState('');
  const [userFirstGoalTimeline, setUserFirstGoalTimeline] = useState('');
  const [userFirstGoalAvailableHours, setUserFirstGoalAvailableHours] = useState('');
  const [chatId, setChatId] = useState('');
  const [chatTime, setChatTime] = useState('');
  const [stepChatId, setStepChatId] = useState('');
  const [stepChatTime, setStepChatTime] = useState('');
  const [parsedGoalResult, setParsedGoalResult] = useState(null);
  const [parsedAPIResult, setParsedAPIResult] = useState(null);
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCoachLoading, setIsCoachLoading] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [updateGoals, setUpdateGoals] = useState<HighStepDetail[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const [stepPercent, setStepPercent] = useState(0);
  const [highLevelSteps, setHighLevelSteps] = useState([]);
  const [tempStatusUpdates, setTempStatusUpdates] = useState<TempStatusUpdates>({});
  const [tempSpecificStatusUpdates, setTempSpecificStatusUpdates] = useState<TempStatusUpdates>({});
  

  //Interfaces: The contract or rules that the object they are implemented on have to use.

  interface Goal {
    uniqueid: string;
    chatid: string;
    chattime: string;
    usergoal: string;
    usertimeline: number;
    userhours: number;
    // Add any other properties as needed
  }

  interface StepDetail {
    description: string;
    timeframe: {
      value: number;
      unit: string;
    };
  }
  
  interface APIResult {
    [key: string]: DetailedStep;
  }

  interface StepDetailCount {
    [key: string]: unknown; // Use `any` or a more specific type instead of `unknown` if you know the structure of the value
  }

  interface HighStepDetail {
    id: string;
    description: string;
    timeframe: number; // Assuming timeframe is just a number; adjust as needed
    statuscomplete: 'Yes' | 'No';
    statusadd: 'Yes' | 'No';
  }

  interface DetailedStep {
    id: string;
    highlevelid: string;
    description: string;
    timeframe: number; // Assuming timeframe is a number of days, adjust as needed
    statuscomplete: 'Yes' | 'No'; // Assuming these are the only two possible values
    statusadd: 'Yes' | 'No';
  }

  interface TempStatusUpdates {
    [goalId: string]: {
      statusadd?: string;
      statuscomplete?: string;
    };
  }
  
  //API key variable that stores CHAT GPT API
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  //This is the function responsible for the spinning icon that shows loading when a button is pressed.
   const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  function countSteps(jsonData: Record<string, unknown>): number {
    // Filter keys that start with "Step" and count them
    const stepKeys = Object.keys(jsonData).filter(key => key.startsWith("Step"));
    return stepKeys.length;
  }


  {/*This is the Async function that is responsible for interacting with chat GPT, sending it a message with inserted  dynamic variabels from the input boxes 
   and storing the result, the chat id and the time created in variables*/}
  const GoaltoChat = async () => {
    setIsLoading(true); // Start loading
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `You are now my personal life coach and business assistant. This is the goal I would like to achieve:${userFirstGoal}.
          I would like to achieve this goal within ${userFirstGoalTimeline} months. Provide me with a detailed strategy to maximise my chances of achieving the goal, from a beginning to goal completion. 
           The response has be strictly shown in JSON format only with steps such as Step 1 and then Step 2 being keys and there content being the value etc. Within this value, I also want you
          to state how many days you think it will take me to complete this step (bearing in mind that the whole goal should take ${userFirstGoalTimeline} months.) Within the value of the step should strictly include 5 keys at all times. One being the detailed
          description of the step, 2 being a key that says "timeframe" and a "value" that is the timeframe in days i.e. 2, 3 being statuscomplete with the default value of "No", 4 being statusadd with the default value also 
          being "No" and 5 called id being a UUIDv4 number that is uniquely set to each step . 
          The answer given to me will start from step 1 immediately without any other introductory sentence. ` },

        ],
      });

      const result = completion.choices[0]?.message?.content || "Content Unavailable at this time";
      console.log ("NEW CHAT GPT RESPONSE", result);
      setGoalResult(result);
      const chatid = completion.id;
      const chattime = completion.created;
      setChatId(chatid);
      setChatTime(new Date(chattime * 1000).toISOString().replace('T', ' ').substring(0, 19));
      
    } catch (error) {
      console.error("Error gettin ChatGPT data:", error);
    }
     finally {
    setIsLoading(false); // Stop loading regardless of success or failure
  }
  };

  useEffect(() => {
    if (goalResult) {
      try {
        const parsedData = JSON.parse(goalResult);
        console.log("Parsed Data:", parsedData); // Debug log
        setParsedGoalResult(parsedData);
      } catch (error) {
        console.error("Error parsing goalResult:", error);
        setParsedGoalResult(null);
        
      }
    }
  }, [goalResult]);

  const saveData = async () => {
    if (chatId && goalResult) {
      try {
        const uniqueID = uuidv4();

        const parsedData = JSON.parse(goalResult);
        // Save the original JSON blob and other goal details to the goalplanner table
        await insertChatData(uniqueID, chatId, chatTime, goalResult, userFirstGoal, userFirstGoalTimeline, userFirstGoalAvailableHours);
        
        
        // Assuming you have a function to insert a single high-level step
        Object.entries(parsedData).forEach(async ([stepKey, stepValue], index) => {
          // Assuming stepValue is an object that fits the StepDetail interface
          const stepDetails: HighStepDetail = stepValue as HighStepDetail;
          
          const id = stepDetails.id;
          const stepdescription = stepDetails.description;
          const timeframe = stepDetails.timeframe;
          const statuscomplete = stepDetails.statuscomplete;
          const statusadd = stepDetails.statusadd;

          await insertHighLevelStep(id, uniqueID, stepdescription, timeframe, statuscomplete, statusadd, index);
        });
  
        console.log('Data saved to database successfully');
      } catch (error) {
        console.error('Error saving data to database:', error);
        // Handle error
      }
    }
  };
  
  useEffect(() => {
    saveData();
  }, [chatId, goalResult]);

  


  /**/
  const handleGoalDetail = async (stepContent:string, totalTime:number, higherid: string ) => {
    setIsCoachLoading(true); // Start loading
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  
    try {
      const stepcompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `You are my personal life coach and business assistant. This is the goal I would like to achieve: ${stepContent}. 
          This goal also gives you the expected time frame in which to complete the whole step. Provide me with a detailed strategy with incremental steps 
          on how to complete this goal within the time frame described in the goal knowing I have ${userFirstGoalAvailableHours} hours available ech day. 
           The answer returned has to strictly be in JSON format only. The steps should have the key Step 1, Step 2 and so on.  Within the value of the step should strictly include 6 keys at all times. One being the detailed
           description of the step, 2 being a key that says "timeframe" and a "value" that is the timeframe in days i.e. 2, 3 being statuscomplete with the default value of "No", 4 being statusadd with the default value also 
           being "No" and 5 being called highlevelid with the value of ${higherid} and 6 being called id being a UUIDv4 number that is uniquely set to each step. The total amount of time for the whole step cannot exceed ${totalTime}.I want the response to start with Step 1 without any introductory 
          sentence.` },
        ],
      });
  
      // Update the state with the API response
    const stepResult = (stepcompletion.choices[0]?.message?.content || "No response received.");
    console.log (stepResult);
    setApiResponse (stepResult)
    const stepchatid = stepcompletion.id;
    const stepchattime = stepcompletion.created;
    setStepChatId (stepchatid)
    setStepChatTime (new Date(stepchattime * 1000).toISOString().replace('T', ' ').substring(0, 19));
    
  } catch (error) {
    console.error("Error calling API:", error);
    setApiResponse("Error occurred while fetching data.");
  }
  finally {
    setIsCoachLoading(false); // Stop loading regardless of success or failure
  }
};

/*This section is responsible taking the JSON created by Chat GPT and Parsing it*/
useEffect(() => {
  try {
    if (apiResponse) {
      const apiparsedData = JSON.parse(apiResponse);
      setParsedAPIResult(apiparsedData);
      console.log("Parsing successful:", apiparsedData);
    }
  } catch (error) {
    console.error("Error parsing goalResult:", error);
    setParsedAPIResult(null);
  }
}, [apiResponse]);

/*This section is resposnible taking the 2nd Chat GPTs response and inserting it into a database*/

  const saveCoachData = async () => {
    if (parsedAPIResult ) { // Ensure currentHighLevelStepID is defined
      try {
        // Assume parsedAPIResult conforms to DetailedSteps interface.
        const secondstepresult: APIResult = parsedAPIResult;
       
        // Loop through each detailed step and save it to the database.
        Object.entries(secondstepresult).forEach(async ([stepKey, stepValue], index) => {
          // Directly use the parsed data without additional parsing.
          const id = stepValue.id;
          const parsedResult = stepValue.description;
          const highlevelid = stepValue.highlevelid;
          console.log("Inserting coach data with highlevelid:", highlevelid);
          const timeframe = stepValue.timeframe;
          const statuscomplete = stepValue.statuscomplete || 'No'; // Use default value if not provided.
          const statusadd = stepValue.statusadd || 'No'; // Use default value if not provided.
         

        await insertCoachData (id, highlevelid, apiResponse, stepChatId , stepChatTime, parsedResult, statuscomplete, statusadd, timeframe, index );
      });
        console.log('Specific Data saved to database successfully');
      } catch (error) {
        console.error('Error saving specific data to database:', error);
      }
    }
  };

  useEffect(() => {
    saveCoachData();
  }, [parsedAPIResult]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const latestGoals = await fetchLatestGoals();
      setGoals(latestGoals);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    }
  };

  fetchData();
}, []); // Empty dependency array means this effect runs once on mount

function capitalizeFirstLetter(string:string) { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const handleRadioChange = (goalId: string, field: 'statusadd' | 'statuscomplete', value: string) => {
  setTempStatusUpdates((prev: TempStatusUpdates) => ({
    ...prev,
    [goalId]: {
      ...prev[goalId],
      [field]: value,
    },
  }));
};

const handleSubmit = async (goalId:string) => {
  const updates = tempStatusUpdates[goalId];
  if (!updates) return;

  try {
    // Assuming updates contain both statuscomplete and statusadd
    await updateHighLevelStep(goalId, updates.statuscomplete ?? 'No', updates.statusadd ?? 'No');

    console.log("Status updated successfully");

    // Optionally, update your main goals state here if needed to reflect the change
    setUpdateGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates, statusadd: updates.statusadd as 'Yes' | 'No', statuscomplete: updates.statuscomplete as 'Yes' | 'No' } : goal
    ));

    // Clear the temporary choice after submission
    setTempStatusUpdates(prev => {
      const newState = { ...prev };
      delete newState[goalId];
      return newState;
    });

  } catch (error) {
    console.error("Failed to update status:", error);
  }
};

const handleSpecificRadioChange = (goalId: string, field: 'statusadd' | 'statuscomplete', value: string) => {
  setTempSpecificStatusUpdates(prev => ({
    ...prev,
    [goalId]: {
      ...prev[goalId],
      [field]: value,
    },
  }));
};

const handleSpecificSubmit = async (goalId: string) => {
  const updates = tempSpecificStatusUpdates[goalId];
  if (!updates) return;

  try {
    await updateSpecificStep(goalId, updates.statuscomplete ?? 'No', updates.statusadd ?? 'No');
    console.log("Specific status updated successfully");

    // Update the state if necessary, similar to the high-level goals
    // This step is optional and depends on your application's requirements

    // Clear the temporary choice after submission
    setTempSpecificStatusUpdates(prev => {
      const newState = { ...prev };
      delete newState[goalId];
      return newState;
    });
  } catch (error) {
    console.error("Failed to update specific status:", error);
  }
};
 
  return (
    <div>
      <div className="space-y-4">
        <div >
          <h1 className='text-xl'>Goal Planner</h1>
        </div>
        <div >
          <h3 className='text-white text-xl bg-black-300 rounded-xl p-2'>Your Latest Goals</h3>
        </div>
        {/*<LatestGoalCards/>*/}
       

       <div >
          <h3 className='text-white text-xl bg-black-300 rounded-xl p-2'>What Do You Want To Achieve?</h3>
       </div>
        
       <div className = "rounded-xl flex min-w-full bg-black-300 ">
       <div className="w-1/2 m-2 p-2">
    {/* Goal Input */}
    <div className="flex items-center my-2">
      <label htmlFor="goalInput" className="mr-2 text-white w-48">Enter your first goal:</label>
      <input
        id="goalInput"
        type="text"
        placeholder='e.g. Start an online business'
        value={userFirstGoal}
        onChange={(e) => setUserFirstGoal(capitalizeFirstLetter(e.target.value))}
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>

    {/* Timeline Input */}
    <div className="flex items-center my-2">
      <label htmlFor="timelineInput" className="mr-2 text-white w-48">Approximate time to achieve (Months):</label>
      <input
        id="timelineInput"
        type="number"
        placeholder='e.g. 12'
        value={userFirstGoalTimeline}
        onChange={(e) => setUserFirstGoalTimeline(e.target.value)}
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>

    {/* Hours Per Day Input */}
    <div className="flex items-center my-2">
      <label htmlFor="hoursInput" className="mr-2 text-white w-48">Free hours per day:</label>
      <input
        id="hoursInput"
        type="number"
        placeholder='e.g. 3'
        value={userFirstGoalAvailableHours}
        onChange={(e) => setUserFirstGoalAvailableHours(e.target.value)}
        className='flex-grow text-black rounded-lg p-2'
      />
    </div>
  </div>
       
        <div className='bg-black-500 p-2 m-2 rounded-xl w-1/2'>
          <p className="text-white">We aim to assist you in achieving your goals effectively. Please provide the following information:
            <br/>
            <br/>
            Your primary goal.
            <br/>
            The desired timeline for achieving this goal.
            <br/>
            The number of free hours you can dedicate to this goal daily.
            <br/>
            <br/>
            We will use AI to create a personalized schedule and blueprint to maximize your chances of success. Your goal schedule outline will be displayed below on the left, and you can request detailed plans for each milestone on the right.
          </p>
        </div>
        </div>
       

        <button onClick={GoaltoChat} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>{isLoading ? <LoadingSpinner /> : "Start a Plan"}</button>
       
        <div >
          <h3 className='text-white text-xl bg-black-300 rounded-xl p-2'>Your Big Plan</h3>
        </div>

        <div className = "flex min-w-full">
          
        <div className='bg-black-300 p-4 rounded-lg w-1/2 p-2 m-2'>
  <h1 className='text-white'>Goal Structure</h1>
  {parsedGoalResult && Object.entries(parsedGoalResult as APIResult).map(([stepKey, stepDetails], index) => (
    <div key={index} className='bg-gray-100 p-4 rounded-lg border border-black-600 border-solid'>
      <p><strong>{stepKey}</strong>: {stepDetails.description}</p>
      <br/>
      <p><strong>Timeline:</strong> {stepDetails.timeframe}</p>
      <button onClick={() => handleGoalDetail(stepDetails.description, stepDetails.timeframe, stepDetails.id)} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>{isCoachLoading ? <LoadingSpinner /> : "Ask Coach"}</button>
      {/* Include the radio button code here for Add Goal and Goal Complete */}
      <div className='border border-solid black p-4 rounded-lg w-1/2 p-2 m-2'>
      <div>
        <label>Add Goal:</label>
        <input
          type="radio"
          value="Yes"
          name={`add-goal-${stepDetails.id}`}
          checked={tempStatusUpdates[stepDetails.id]?.statusadd === 'Yes'}
          onChange={() => handleRadioChange(stepDetails.id, 'statusadd', 'Yes')}
        /> Yes
        <input
          type="radio"
          value="No"
          name={`add-goal-${stepDetails.id}`}
          checked={tempStatusUpdates[stepDetails.id]?.statusadd === 'No'}
          onChange={() => handleRadioChange(stepDetails.id, 'statusadd', 'No')}
        /> No
      </div>

      <div>
        <label>Goal Complete:</label>
        <input
          type="radio"
          value="Yes"
          name={`complete-goal-${stepDetails.id}`}
          checked={tempStatusUpdates[stepDetails.id]?.statuscomplete === 'Yes'}
          onChange={() => handleRadioChange(stepDetails.id, 'statuscomplete', 'Yes')}
        /> Yes
        <input
          type="radio"
          value="No"
          name={`complete-goal-${stepDetails.id}`}
          checked={tempStatusUpdates[stepDetails.id]?.statuscomplete === 'No'}
          onChange={() => handleRadioChange(stepDetails.id, 'statuscomplete', 'No')}
        /> No
      </div>
          
          <button onClick={() => handleSubmit(stepDetails.id)}  className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>Submit</button>
        </div>
        </div>
))}
          </div>
        
        <div className="api-response bg-black-300 p-4 rounded-lg w-1/2 p-2 m-2">
        <h1 className='text-white'>Goal Specifics</h1>
        {parsedAPIResult && Object.entries(parsedAPIResult as APIResult).map(([stepKey, stepDetails], index) => (
  <div key={index} className='bg-gray-100 p-4 rounded-lg border border-black-600 border-solid'>
    <p><strong>{stepKey}</strong>: {stepDetails.description}</p>
    <br/>
    <p><strong>Timeline:</strong> {stepDetails.timeframe}</p>
    <p><strong>ID</strong> {stepDetails.id}</p>
   {/* Radio Buttons and Submit Button for Specific Goal */}
   <div className='flex justify-between items-center'>
      {/* Radio Buttons */}
      <div>
        {/* Status Add Radio Buttons */}
        <div>
          <label>Add Goal:</label>
          <input
            type="radio"
            value="Yes"
            name={`add-detail-goal-${stepDetails.id}-Yes`}
            checked={tempSpecificStatusUpdates[stepDetails.id]?.statusadd === 'Yes'}
            onChange={() => handleSpecificRadioChange(stepDetails.id, 'statusadd', 'Yes')}
          /> Yes
          <input
            type="radio"
            value="No"
            name={`add-detail-goal-${stepDetails.id}-No`}
            checked={tempSpecificStatusUpdates[stepDetails.id]?.statusadd === 'No'}
            onChange={() => handleSpecificRadioChange(stepDetails.id, 'statusadd', 'No')}
          /> No
        </div>
        {/* Status Complete Radio Buttons */}
        <div>
          <label>Goal Complete:</label>
          <input
            type="radio"
            value="Yes"
            name={`complete-detail-goal-${stepDetails.id}-Yes`}
            checked={tempSpecificStatusUpdates[stepDetails.id]?.statuscomplete === 'Yes'}
            onChange={() => handleSpecificRadioChange(stepDetails.id, 'statuscomplete', 'Yes')}
          /> Yes
          <input
            type="radio"
            value="No"
            name={`complete-detail-goal-${stepDetails.id}-No`}
            checked={tempSpecificStatusUpdates[stepDetails.id]?.statuscomplete === 'No'}
            onChange={() => handleSpecificRadioChange(stepDetails.id, 'statuscomplete', 'No')}
          /> No
        </div>
      </div>
      {/* Submit Button */}
      <button 
        onClick={() => handleSpecificSubmit(stepDetails.id)}
        className='flex  h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
      >
        Submit
      </button>
    </div>
  </div>
))}
          </div>
      </div>
      </div>
    </div>
  );
};
