"use client";

import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { sql } from '@vercel/postgres';
import { insertChatData } from '@/app/lib/actions';
import StrategyDisplay from '@/app/ui/goalplanner/strategy_display';
import LatestGoalsCard from '@/app/ui/goalplanner/latest-goals';
import {fetchLatestGoals} from '@/app/lib/data';



export default  function Page() {
  const [goalResult, setGoalResult] = useState('');
  const [userFirstGoal, setUserFirstGoal] = useState('');
  const [userFirstGoalTimeline, setUserFirstGoalTimeline] = useState('');
  const [userFirstGoalAvailableHours, setUserFirstGoalAvailableHours] = useState('');
  const [chatId, setChatId] = useState('');
  const [chatTime, setChatTime] = useState('');
  const [parsedGoalResult, setParsedGoalResult] = useState(null);
  const [parsedAPIResult, setParsedAPIResult] = useState(null);
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [latestGoals, setLatestGoals] = useState<Goal[]>([]);
  const [isCoachLoading, setIsCoachLoading] = useState(false);
  const [showGoals, setShowGoals] = useState(false); // New state for toggling visibility

  interface Goal {
  
    chatID: string;
    chatTime: string;
    userGoal: string;
    userTimeline: string;
    userHours: string;
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
  // Function to toggle the showGoals states
  const toggleShowGoals = () => {
    setShowGoals(!showGoals);
  };
  
   const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

   const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

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
          I want the response to be shown in JSON format only with steps such as Step 1 and then Step 2 being keys and there content being the value etc. Within this value, I also want you
          to states how many days you think it will take me to complete this step (bearing in mind that the whole goal should take ${userFirstGoalTimeline} months.)  
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
          await insertChatData( chatId, chatTime, goalResult, userFirstGoal, userFirstGoalTimeline, userFirstGoalAvailableHours );
          
          console.log('Data saved to database successfully');
        } catch (error) {
          console.error('Error saving data to database:', error);
        }
      }
    };

    saveData();
  }, [chatId,goalResult]);

  // Fetch the latest goals when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const goals = await fetchLatestGoals();
        console.log('Fetched goals:', goals); // Log to check the fetched data
        setLatestGoals(goals);
        console.log('Latest goals state updated:', latestGoals);
      } catch (error) {
        console.error('Failed to fetch latest goals:', error);
      }
    };
    fetchData();
  }, []);


  /**/
  const handleGoalDetail = async (stepContent:string) => {
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
          I want the answer returned in JSON. the steps should have the key Step 1, Step 2 and so on. Within the value of the step hould include the detailed
          description of the step plus another key that says "timeframe" and a "value" that is the timeframe in days i.e. 2. I want the response to describe to start with Step 1 without any introductory 
          sentence.` },
        ],
      });
  
      // Update the state with the API response
    setApiResponse(stepcompletion.choices[0]?.message?.content || "No response received.");
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



  return (
    <div>
      <div className="space-y-4">
        
        <h1 className='text-white'>Goal Planner</h1>
        <div>
          <p>
            
          </p>
        </div>

        {/* Timeline Input */}
        <div className="flex items-center">
          <label htmlFor="timelineInput" className="mr-2 text-white w-48">Approximate time to achieve (Months):</label>
          <input
            id="timelineInput"
            type="number"
            placeholder='Enter your expected  goal timeframe....'
            value={userFirstGoalTimeline}
            onChange={(e) => setUserFirstGoalTimeline(e.target.value)}
            className='text-black rounded-lg p-2 block flex-grow'
          />
        </div>

        {/* Hours Per Day Input */}
        <div className="flex items-center">
          <label htmlFor="hoursInput" className="mr-2 text-white w-48">Free hours per day:</label>
          <input
            id="hoursInput"
            type="number"
            placeholder='Enter the amount of free hours a day to achieve your goal....'
            value={userFirstGoalAvailableHours}
            onChange={(e) => setUserFirstGoalAvailableHours(e.target.value)}
            className='text-black rounded-lg p-2 block flex-grow'
          />
        </div>


        <button onClick={GoaltoChat} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>{isLoading ? <LoadingSpinner /> : "Start a Plan"}</button>

        <div className='bg-white p-4 rounded-lg'>
        {parsedGoalResult && Object.entries(parsedGoalResult).map(([stepKey, stepValue], index) => (
        <div key={index} className='bg-gray-100 p-4 rounded-lg'>
          <p>
            <strong>{stepKey}</strong>: {stepValue as string}
          </p>
          <button onClick={() => handleGoalDetail(stepValue as string)} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>{isCoachLoading ? <LoadingSpinner /> : "Ask Coach"}</button>
        </div>
))}
          </div>
        
        <div className="api-response bg-white p-4 rounded-lg">
        {parsedAPIResult && Object.entries(parsedAPIResult as APIResult).map(([stepKey, stepDetails], index) => (
  <div key={index} className='bg-gray-100 p-4 rounded-lg'>
    <p><strong>{stepKey}</strong>: {stepDetails.description}</p>
    <p>Timeline: {stepDetails.timeframe.value} {stepDetails.timeframe.unit}</p>
  </div>
))}
      </div>
      
      </div>
    </div>
  );
};
