import OpenAI from 'openai';
import {useState} from "react";

export default function DayStepChat () {
    const [dayResponse, setDayResponse] = useState('');
    const [DayStepChatId, setDayStepChatId] = useState('');
    const [DayStepChatTime, setDayStepChatTime] = useState('');

    //API key variable that stores CHAT GPT API
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const dayChatDetail = async (stepContent:string, totalTime:number) => {
        
        const openai = new OpenAI({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true
        });
      
       {/*} try {
          const daystepcompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: `You are my personal life coach and business assistant. I want you to provide me with a detailed strategy, resources and web links in order to complete the following goal: 
        ${}. The aim is to complete this within ${} days. ` },
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
      } */}
      
    };

return (
    <div>

    </div>
);
};