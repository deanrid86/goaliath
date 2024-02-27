import OpenAI from 'openai';

//API key variable that stores CHAT GPT API
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export async function GoaltoChat (userFirstGoal:string, userFirstGoalTimeline:string ) {
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

    return (
      
    );
  }