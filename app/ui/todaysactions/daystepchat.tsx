"use client";

import OpenAI from 'openai';
import {useState} from "react";

// Define a TypeScript interface for the component props for type safety
interface DayStepChatProps {
  todaysStep: string;
  todaysTime: string;
}

 //This is the function responsible for the spinning icon that shows loading when a button is pressed.
 const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

export default function DayStepChat ({todaysStep,todaysTime}:DayStepChatProps) {
    const [dayResponse, setDayResponse] = useState('');
    const [DayStepChatId, setDayStepChatId] = useState('');
    const [DayStepChatTime, setDayStepChatTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //API key variable that stores CHAT GPT API
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const dayChatDetail = async () => {
      setIsLoading(true); // Start loading
        const openai = new OpenAI({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true
        });
      
       try {
          const daystepcompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: `You are my personal life coach and business assistant. I want you to provide me with a detailed strategy with resources and website links in order to complete the following goal: 
        ${todaysStep}.  The aim is to complete this within ${todaysTime} days. I want you to always begin the sentence with the phrase "How to complete today's step:" then continue to give the infromation.  ` },
            ],
          });
      
          // Update the state with the API response
        const daystepResult = (daystepcompletion.choices[0]?.message?.content || "No response received.");
        setDayResponse (daystepResult)
        const daystepchatid = daystepcompletion.id;
        const daystepchattime = daystepcompletion.created;
        setDayStepChatId (daystepchatid)
        setDayStepChatTime (new Date(daystepchattime * 1000).toLocaleString());
      } catch (error) {
        console.error("Error calling API:", error);
        setDayResponse("Error occurred while fetching data.");
      } 
      finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
      
    };

return (
    <div>
      <div>
        <p className='bg-gray-100 p-4 rounded-lg border border-black-600 border-solid p-2 m-2'>{dayResponse}</p>
        <button onClick={dayChatDetail} className='flex h-10 items-center rounded-lg bg-black-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 p-2 m-2'>{isLoading ? <LoadingSpinner /> : "Daily Advice"}</button>
      </div>
    </div>
);
};