import { ProgressLineBar } from '@/app/lib/chartcomponents';
import { fetchLatestGoals } from '@/app/lib/data';
import {Card} from '@/app/ui/goalplanner/cards';


export default async function LatestGoalCards() { 
  const latestGoals = await fetchLatestGoals();
    // Placeholder for background and border colors
    const colorSchemes = [
      { container: "bg-red-500", card: "bg-red-600" },
      { container: "bg-cyan-500", card: "bg-cyan-600" },
      { container: "bg-green-600", card: "bg-green-500" },
      { container: "bg-purple-600", card: "bg-purple-400" },
    ];
    
   
  return (
   
   
        <div className='min-w-full flex justify-around rounded-xl m-2 p-2'>
          
        {latestGoals.slice(0, 4).map((goal, index) => (
    <div key={index} className={`w-1/5 rounded-xl p-2 m-2 border border-black-600 border-solid ${colorSchemes[index].container}`}>
      <Card title={`Goal ${index + 1}`} value={goal.usergoal} type="goals" color={colorSchemes[index].card}/>
      <Card title={`Months to Complete`} value={goal.usertimeline} type="month" color={colorSchemes[index].card}/>
      <Card title={`Daily Hours to Commit`} value={goal.userhours} type="days" color={colorSchemes[index].card}/>
      <p>Number of Step = {goal.stepcount}</p>
      <p>Percentage per Step = {Math.round(100 / goal.stepcount)}%</p>
      
      </div>
    ))}
    <div className = 'bg-white'>
     
      </div>
    </div>
    );
  }