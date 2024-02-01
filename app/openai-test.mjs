import OpenAI from "openai";
import {fetchGoals} from '@/app/lib/data';


let firstGoalTimeline;
let firstGoal;

fetchGoals()
  .then((EditGoals) => {
    // Now you have access to the fetched goals
    if (EditGoals.length > 0) {
      const firstGoal = EditGoals[0].goal;
      const firstGoalTimeline = EditGoals[0].goaltimeline;

      console.log("First goal:", firstGoal);
      console.log("First goal timeline:", firstGoalTimeline);
    } else {
      console.log("No goals found.");
    }
  })
  .catch((error) => {
    console.error("Error fetching goals:", error);
  });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export default async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: `Create me a daily schedule over ${firstGoalTimeline} months with the ultimate goal being: ${firstGoal}` }],
    
  });

  console.log(completion.choices[0]);
}

main();