import { ProgressLineBar } from '@/app/lib/chartcomponents';
import { fetchLatestGoals } from '@/app/lib/data';
import {Card} from '@/app/ui/goalplanner/cards';
import {addDaysToChatTime, calculateDaysLeft } from "@/app/lib/utils";
import {addMonthsToChatTime, } from '@/app/lib/utils';
import { ProgressBar } from "@/app/ui/dashboard/progressbar";


export default async function LatestGoalCards() { 
  const latestGoals = await fetchLatestGoals();
    // Placeholder for background and border colors
    const colorSchemes = [
      { container: "bg-cyan-500", card: "bg-cyan-600" },
      { container: "bg-cyan-500", card: "bg-cyan-600" },
      { container: "bg-cyan-500", card: "bg-cyan-600" },
      { container: "bg-cyan-500", card: "bg-cyan-600" },
    ];
    

  
  return (
   
   
        <div className='min-w-full flex justify-around rounded-xl m-2 p-2'>
          
        {latestGoals.slice(0, 4).map((goal, index) => (
    <div key={index} className={`w-1/5 rounded-xl p-2 m-2 border border-black-600 border-solid ${colorSchemes[index].container}`}>
      <Card title={`Goal ${index + 1}`} value={goal.usergoal} type="goals" color={colorSchemes[index].card}/>
      <Card title={`Months to Complete`} value={goal.usertimeline} type="month" color={colorSchemes[index].card}/>
      <Card title={`Daily Hours to Commit`} value={goal.userhours} type="days" color={colorSchemes[index].card}/>
      <Card title={` Estimated Completion Date`} value={addMonthsToChatTime(goal.chattime, goal.usertimeline)} type="month" color={colorSchemes[index].card}/>
      <p><strong>Days Left Until Completion:</strong> {calculateDaysLeft(addMonthsToChatTime(goal.chattime, goal.usertimeline))}</p>
      
    
      
      </div>
    ))}
    <div className = 'bg-white'>
     
      </div>
    </div>
    );
  }