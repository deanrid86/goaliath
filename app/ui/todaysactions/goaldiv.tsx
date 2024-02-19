
"use client";


import { useEffect, useState } from 'react';
import { fetchLatestGoalStep } from "@/app/lib/data";

export default function GoalDiv() {
  const [latestGoalStep, setLatestGoalStep] = useState<GoalSteps | null>(null);

  // Define the interface for the structure of each step
interface GoalStepDetail {
  description: string;
  timeframe: {
    value: number;
  };
}

// Define the interface for the entire JSON object structure
interface GoalSteps {
  [key: string]: GoalStepDetail;
}

  useEffect(() => {
    async function fetchAndSetGoalStep() {
      const data = await fetchLatestGoalStep();
      if (data && data.length > 0) {
        // Ensure the parsing line knows what type it is working with
        const parsedData: GoalSteps = JSON.parse(data[0].specificgoalresult);
        setLatestGoalStep(parsedData);
      }
    }

    fetchAndSetGoalStep();
  }, []);

  if (!latestGoalStep) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-white text-xl bg-black-300 rounded-xl p-2 m-2'>
      <form action = {fetchLatestGoalStep}>
      {Object.entries(latestGoalStep).map(([step, details]) => (
        <div key={step}>
          <h2>{step}</h2>
          {/* TypeScript now knows the structure of `details`, no error should be shown */}
          <p>Description: {details.description}</p>
          <p>Timeframe: {details.timeframe.value} days</p>
        </div>
      ))}
      </form>
    </div>
  );
}
