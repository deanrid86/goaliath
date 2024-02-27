"use client";

import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { insertChatData, insertCoachData } from '@/app/lib/actions';
import {fetchLatestGoals} from '@/app/lib/data';
import { v4 as uuidv4 } from 'uuid';




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

  //Interfaces: The contract or rules that the object they are implemented on have to use.

  interface Goal {
    uniqueid: string;
    chatid: string;
    chattime: string;
    usergoal: string;
    usertimeline: string;
    userhours: string;
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
    [key: string]: StepDetail;
  }
  
  //API key variable that stores CHAT GPT API
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  //This is the function responsible for the spinning icon that shows loading when a button is pressed.
   const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

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
          to state how many days you think it will take me to complete this step (bearing in mind that the whole goal should take ${userFirstGoalTimeline} months.) Within the value of the step should strictly include the detailed
          description of the step plus another key that says "timeframe" and a "value" that is the timeframe in days i.e. 2. 
          The answer given to me will start from step 1 immediately without any other introductory sentence. ` },

        ],
      });

      const result = completion.choices[0]?.message?.content || "Content Unavailable at this time";
      setGoalResult(result);
      const chatid = completion.id;
      const chattime = completion.created;
      setChatId(chatid);
      setChatTime(new Date(chattime * 1000).toLocaleString());
      
    } catch (error) {
      console.error("Error gettin ChatGPT data:", error);
    }
     finally {
    setIsLoading(false); // Stop loading regardless of success or failure
  }
  };

  /*This section is responsible taking the JSON created by Chat GPT and Parsing it*/
  useEffect(() => {
    try {
      if (goalResult) {
        const parsedData = JSON.parse(goalResult);
        setParsedGoalResult(parsedData);
        console.log("Parsing successful:", parsedData);
      }
    } catch (error) {
      console.error("Error parsing goalResult:", error);
      setParsedGoalResult(null);
    }
  }, [goalResult]);

  /*This section is resposnible taking Chat GPTs response and inserting it into a database*/
  useEffect(() => {
    const saveData = async () => {
      if (chatId && goalResult) {
        try {
          const uniqueID = uuidv4();
          await insertChatData(uniqueID, chatId, chatTime, goalResult, userFirstGoal, userFirstGoalTimeline, userFirstGoalAvailableHours );
          
          console.log('Data saved to database successfully');
        } catch (error) {
          console.error('Error saving data to database:', error);
        }
      }
    };

    saveData();
  }, [chatId,goalResult]);

  


  /**/
  const handleGoalDetail = async (stepContent:string, totalTime:number) => {
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
           The answer returned has to strictly be in JSON format only. The steps should have the key Step 1, Step 2 and so on. Within the value of the step should include the detailed
          description of the step plus another key that says "timeframe" and a "value" that is the timeframe in days i.e. 2 (This has to strictly be included on every answer). The total amount of time for the whole step cannot exceed ${totalTime}.I want the response to describe to start with Step 1 without any introductory 
          sentence.` },
        ],
      });
  
      // Update the state with the API response
    const stepResult = (stepcompletion.choices[0]?.message?.content || "No response received.");
    setApiResponse (stepResult)
    const stepchatid = stepcompletion.id;
    const stepchattime = stepcompletion.created;
    setStepChatId (stepchatid)
    setStepChatTime (new Date(stepchattime * 1000).toLocaleString());
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
useEffect(() => {
  const saveCoachData = async () => {
    if (parsedAPIResult) {
      try {
        const specificuniqueID = uuidv4();
        await insertCoachData (specificuniqueID, apiResponse, stepChatId , stepChatTime, parsedAPIResult );
        
        console.log('Specific Data saved to database successfully');
      } catch (error) {
        console.error('Error saving specific data to database:', error);
      }
    }
  };

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

  return (
    <div>
      <div className="space-y-4">
        <div >
          <h1 className='text-white text-xl'>Goal Planner</h1>
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
      <p><strong>Timeline:</strong> {stepDetails.timeframe.value} {stepDetails.timeframe.unit}</p>
          <button onClick={() => handleGoalDetail(stepDetails.description, stepDetails.timeframe.value)} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>{isCoachLoading ? <LoadingSpinner /> : "Ask Coach"}</button>
        </div>
))}
          </div>
        
        <div className="api-response bg-black-300 p-4 rounded-lg w-1/2 p-2 m-2">
        <h1 className='text-white'>Goal Specifics</h1>
        {parsedAPIResult && Object.entries(parsedAPIResult as APIResult).map(([stepKey, stepDetails], index) => (
  <div key={index} className='bg-gray-100 p-4 rounded-lg border border-black-600 border-solid'>
    <p><strong>{stepKey}</strong>: {stepDetails.description}</p>
    <br/>
    <p><strong>Timeline:</strong> {stepDetails.timeframe.value} {stepDetails.timeframe.unit}</p>
  </div>
))}
      </div>
      </div>
      </div>
    </div>
  );
};
