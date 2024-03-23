'use server';



import { object, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from "openai";
import { CreateThread } from './assistant_functions';
import fs from 'fs'


const openai = new OpenAI();

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
  });
   
  const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  }

  const FormSchemaLesson = z.object({
    id: z.string(),
    lesson: z.string(),
    lessonnotes: z.string(),
    lessontype: z.string(),
    lessonuse: z.string(),
    lessonsource: z.string(),
    lessonauthor: z.string(),
    lessondate: z.string(),
  });

  

  const CreateLesson = FormSchemaLesson.omit({ id: true, lessondate: true });

  export async function createLesson(formData: FormData) {
      const { lesson, lessonnotes, lessontype, lessonuse, lessonsource, lessonauthor } = CreateLesson.parse({
        lesson: formData.get('lesson'),
        lessonnotes: formData.get('lessonnotes'),
        lessontype: formData.get('lessontype') || '',
        lessonuse: formData.get('lessonuse'),
        lessonsource: formData.get('lessonsource'),
        lessonauthor: formData.get('lessonauthor'),
      });
      
      const date = new Date().toISOString().split('T')[0];
  
      await sql`
      INSERT INTO lessonfields (lesson, lessonnotes, lessontype, lessonuse, lessonsource, lessonauthor, lessondate)
      VALUES (${lesson}, ${lessonnotes}, ${lessontype}, ${lessonuse}, ${lessonsource}, ${lessonauthor}, ${date})
    `;
  
    revalidatePath('/dashboard/lessons');
    redirect('/dashboard/lessons');
    }

    const FormSchemaAssistant = z.object({
      id: z.string(),
      name: z.string(),
      instructions: z.string(),
      model: z.string(),
      tools: z.string(),
      
    });
  
    
  
    const CreateAssistant = FormSchemaAssistant.omit({ id: true });
  
    export async function createAssistant(formData: FormData) {
        const { name, instructions, model } = CreateAssistant.parse({
          name: formData.get('name'),
          instructions: formData.get('instructions'),
          model: formData.get('model'),
          tools: formData.get('tools'),
          
        });
        
       
    
        
          const myAssistant = await openai.beta.assistants.create({
            instructions: instructions,
            name: name ,
            tools: [{ type: "code_interpreter" }, { type: "retrieval" } ],
            model: model,
          });
        
          console.log(myAssistant);

          // After successfully creating the assistant, create a new thread
        const threadId = await CreateThread();
        console.log("New thread created with ID:", threadId);
        
        // Create an object to store the assistant and thread information
        const assistantData = {
          assistantId: myAssistant.id,
          assistantName: myAssistant.name,
          threadId: threadId
      };

      // Convert the object to a JSON string
      const jsonContent = JSON.stringify(assistantData, null, 2);

      // Write the JSON string to a file
// Correct
fs.writeFile('app/ui/Assistants/assistant_data.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('Failed to write file', err);
  } else {
    console.log('File written successfully');
  }
});

      console.log("Assistant and thread data saved:", assistantData);

      // Return the assistant data object if needed
      return assistantData;

      revalidatePath('/dashboard/assistants');
      redirect('/dashboard/assistants');
      };

   
     const FormSchemaGoal = z.object({
      id: z.string(),
      goaltype: z.string(),
      goal: z.string(),
      goalnotes: z.string(),
      goaltimeline: z.string(),
      goalurgency: z.string(),
      goalrealisation: z.string(),
      goalreminder: z.enum(['no', 'yes']),
      goalachieved: z.enum(['no', 'yes']),
      goaldate: z.string(),
    });

    const CreateGoals = FormSchemaGoal.omit({ id: true, goaldate: true });

  export async function createGoals(formData: FormData) {
      const { goaltype, goal, goalnotes, goaltimeline, goalurgency, goalrealisation, goalreminder, goalachieved } = CreateGoals.parse({
        goaltype: formData.get('goaltype'),
        goal: formData.get('goal'),
        goalnotes: formData.get('goalnotes') || '',
        goaltimeline: formData.get('goaltimeline'),
        goalurgency: formData.get('goalurgency'),
        goalrealisation: formData.get('goalrealisation'),
        goalreminder: formData.get('goalreminder'),
        goalachieved: formData.get('goalachieved'),
      });
      
      const date = new Date().toISOString().split('T')[0];
  
      await sql`
      INSERT INTO goals (goaltype, goal, goalnotes, goaltimeline, goalurgency, goalrealisation, goalreminder, goalachieved, goaldate)
      VALUES (${goaltype}, ${goal}, ${goalnotes}, ${goaltimeline}, ${goalurgency}, ${goalrealisation}, ${goalreminder},${goalachieved}, ${date})
    `;
  
    revalidatePath('/dashboard/goals');
    redirect('/dashboard/goals');
    }
  
    const UpdateGoals = FormSchemaGoal.omit({ id: true, goaldate: true });

  export async function updateGoal(id: string, formData: FormData) {
    const { goaltype, goal, goalnotes, goaltimeline, goalurgency, goalrealisation, goalreminder, goalachieved } = UpdateGoals.parse({
        goaltype: formData.get('goaltype'),
        goal: formData.get('goal'),
        goalnotes: formData.get('goalnotes') || '',
        goaltimeline: formData.get('goaltimeline'),
        goalurgency: formData.get('goalurgency'),
        goalrealisation: formData.get('goalrealisation'),
        goalreminder: formData.get('goalreminder'),
        goalachieved: formData.get('goalachieved'),
    });

   
   
    await sql`
      UPDATE goals
      SET goaltype = ${goaltype}, goal= ${goal}, goalnotes = ${goalnotes}, goaltimeline = ${goaltimeline}, goalurgency = ${goalurgency}, goalrealisation = ${goalrealisation}, goalreminder = ${goalreminder}, goalachieved = ${goalachieved}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/goals');
    redirect('/dashboard/goals');
  }

  // Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }




  const UpdateLesson = FormSchemaLesson.omit({ id: true, lessondate: true });

  export async function updateLesson(id: string,formData: FormData) {
    const { lesson, lessonnotes, lessontype, lessonuse, lessonsource, lessonauthor } = UpdateLesson.parse({
      lesson: formData.get('lesson'),
      lessonnotes: formData.get('lessonnotes'),
      lessontype: formData.get('lessontype'),
      lessonuse: formData.get('lessonuse'),
      lessonsource: formData.get('lessonsource'),
      lessonauthor: formData.get('lessonauthor'),
    });

   
   
    await sql`
      UPDATE lessonfields
      SET lesson = ${lesson}, lessonnotes= ${lessonnotes}, lessontype = ${lessontype}, lessonuse = ${lessonuse}, lessonsource = ${lessonsource}, lessonauthor = ${lessonauthor}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/lessons');
    redirect('/dashboard/lessons');
  }

  export async function deleteLesson(id: string) {
    await sql`DELETE FROM lessonfields WHERE id = ${id}`;
    revalidatePath('/dashboard/lessons');
  }

  export async function deleteGoal(id: string) {
    await sql`DELETE FROM goals WHERE id = ${id}`;
    revalidatePath('/dashboard/goals');
  }

 
  // Function to insert chat data into the database
export async function insertChatData(uniqueID: string, chatID: string, chatTime:string,  goalResult: string, userGoal: string, userTimeline: string, userHours: string ) {
  try {
    
    //After several weeks of frustration with API, I found that the API will call the vercel database if you keep column names small caps (and when calling on pages also)!!!
    await sql`
      INSERT INTO goalplanner (uniqueid, chatid, chattime, goalresult, usergoal, usertimeline, userhours)
      VALUES (${uniqueID}, ${chatID}, ${chatTime}, ${goalResult}, ${userGoal}, ${userTimeline}, ${userHours})
    `;

    console.log('Chat data inserted into the database.');

  } catch (error) {
    console.error('Error inserting chat data into the database:', error);
  }
}

  // Function to insert chat data into the database
  export async function insertCoachData(id:string, highlevelid:string,  apiResponse: string, stepChatId: string , stepChatTime: string, parsedResult: string, statuscomplete: string, statusadd: string, timeframe: number, index: number ) {
    try {
      
      await sql`
        INSERT INTO goalplannerspecific (id, highlevelid, specificgoalresult, specificchatid, specificchattime, specificparsedresult, statuscomplete, statusadd, timeframe, orderindex )
        VALUES (${id}, ${highlevelid}, ${apiResponse}, ${stepChatId}, ${stepChatTime}, ${JSON.stringify(parsedResult)}, ${statuscomplete}, ${statusadd}, ${timeframe}, ${index})
      `;
  
      console.log('Specific Chat data inserted into the database.');
      
    } catch (error) {
      console.error('Error inserting specific chat data into the database:', error);
    }
  }

    // Function to insert chat data into the database
    export async function insertHighLevelStep(id: string, uniqueID: string, stepdescription: string, timeframe: number, statuscomplete:string, statusadd:string, index: number) {
      try {
        
        await sql`
          INSERT INTO highlevelsteps (id, goalid, stepdescription, timeframe, statuscomplete, statusadd, orderindex )
          VALUES (${id}, ${uniqueID}, ${stepdescription}, ${timeframe}, ${statuscomplete}, ${statusadd}, ${index})
        `;
    
        console.log('High Level data inserted into the database.');
        
      } catch (error) {
        console.error('Error inserting High Level data into the database:', error);
      }
    }

     // Function to insert chat data into the database
     export async function updateHighLevelStep(id: string,statuscomplete:string, statusadd:string) {
      try {
        
        await sql`
          UPDATE highlevelsteps
          SET statuscomplete = ${statuscomplete}, statusadd = ${statusadd}
          WHERE id = ${id}
        `;
    
        console.log('High Level data updated in the database.');
        
      } catch (error) {
        console.error('Error inserting updated High Level data into the database:', error);
      }
    }

  export async function insertActionData(uniqueID: string, lessonauthor:string,  lesson: string, lessonnotes: string) {
    try {
      // Generate a unique UUID
     
      await sql`
        INSERT INTO todays_actions (actionid, lessonauthor, lesson, lessonnotes)
        VALUES (${uniqueID}, ${lessonauthor}, ${lesson}, ${lessonnotes})
      `;
  
      console.log('Action data inserted into the database.');
    } catch (error) {
      console.error('Error inserting Action data into the database:', error);
    }
  }

  

  const FormSchemaGoalChat = z.object({
    chatID: z.string(),
    uniqueID: z.string(),
    chatTime: z.string(),
    goalResult: z.string(),
    userGoal: z.string(),
    userTimeline: z.string(),
    userHours: z.string(),
    
  });


  const CreateGoal = FormSchemaGoalChat.omit({ chatID: true, uniqueID: true });

  export async function createGoal(formData: FormData) {
      const { chatTime, goalResult, userGoal, userTimeline, userHours } = CreateGoal.parse({
        chatTime: formData.get('chatTime'),
        goalResult: formData.get('goalResult'),
        userGoal: formData.get('userGoal') || '',
        userTimeline: formData.get('userTimeline'),
        userHours: formData.get('userHours'),
      });
      
  
      await sql`
      INSERT INTO goalplanner (chatTime, goalResult, userGoal, userTimeline, userHours)
      VALUES (${chatTime}, ${goalResult}, ${userGoal}, ${userTimeline}, ${userHours})
    `;
  
    revalidatePath('/dashboard/goal-planner');
    redirect('/dashboard/goal-planner');
    }


    const FormSchemaGoalStep = z.object({
      id: z.string(),
      date: z.string(),
      goalstep: z.string(),
      stephours: z.string(),
      statuscomplete: z.enum(['No', 'Yes']),
      statusadd: z.enum(['No', 'Yes']),
      
    });

    const CreateGoalStep = FormSchemaGoalStep.omit({id: true });

    export async function createGoalStep(formData: FormData) {
        const { date, goalstep, stephours, statuscomplete, statusadd} = CreateGoalStep.parse({
          date: formData.get('date'),
          goalstep: formData.get('goalstep'),
          stephours: formData.get('stephours'),
          statuscomplete: formData.get('statuscomplete') || 'No', // Default value
          statusadd: formData.get('statusadd') || 'No', // Default value
          
        });
        
        
    
        await sql`
        INSERT INTO goalstepinput ( date, goalstep, stephours, statuscomplete, statusadd )
        VALUES ( ${date}, ${goalstep}, ${stephours}, ${statuscomplete}, ${statusadd} )
      `;
    
      revalidatePath('/dashboard/todaysactions/stepinput');
      redirect('/dashboard/todaysactions/stepinput');
      }

      const UpdateGoalStep = FormSchemaGoalStep.omit({ id: true});

  export async function updateGoalStep(id: string,formData: FormData) {
    const { date, goalstep, stephours,statuscomplete, statusadd } = UpdateGoalStep.parse({
      date: formData.get('date'),
      goalstep: formData.get('goalstep'),
      stephours: formData.get('stephours'),
      statuscomplete: formData.get('statuscomplete'),
      statusadd: formData.get('statusadd'),
    });

   
   
    await sql`
      UPDATE goalstepinput
      SET date = ${date}, goalstep= ${goalstep}, stephours = ${stephours}, statuscomplete = ${statuscomplete}, statusadd = ${statusadd}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/todaysactions/stepinput');
    redirect('/dashboard/todaysactions/stepinput');
  }

  const FormSchemaGoalStepAI = z.object({
    id: z.string(),
    statuscomplete: z.enum(['No', 'Yes']),
    statusadd: z.enum(['No', 'Yes']),
    
  });

  const UpdateGoalStepAI = FormSchemaGoalStepAI.omit({ id: true});

  export async function updateGoalStepAI(id: string,formData: FormData) {
    const { statuscomplete, statusadd } = UpdateGoalStepAI.parse({

      statuscomplete: formData.get('statuscomplete'),
      statusadd: formData.get('statusadd'),
    });

   
   
    await sql`
      UPDATE goalplannerspecific
      SET statuscomplete = ${statuscomplete}, statusadd = ${statusadd}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/todaysactions');
    redirect('/dashboard/todaysactions');
  }


  
  // Function to insert chat data into the database
  export async function updateSpecificStep(id: string,statuscomplete:string, statusadd:string) {
    try {
      
      await sql`
      UPDATE goalplannerspecific
      SET statuscomplete = ${statuscomplete}, statusadd = ${statusadd}
      WHERE id = ${id}
    `;
  
      console.log('Specific Level data updated in the database.');
      
    } catch (error) {
      console.error('Error inserting updated Specific Level data into the database:', error);
    }
  }

  {/*export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices'); 
  }*/}

      export async function deleteStepInput(id: string) {
        await sql`DELETE FROM goalstepinput WHERE id = ${id}`;
        revalidatePath('/dashboard/todaysactions/stepinput');
      }

      export async function sendEmail ()  {
       
        
        try {
            const response = await fetch('http://localhost:3000/dashboard/todaysactions/api', { // Adjust the API route as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: 'Today\'s Steps to Complete',
                    message: 'Here are the steps for today:',
                }),
            });
            if (response.ok) {
                console.log ('Email Sent Successfully');
                (''); // Optionally clear the input field after sending
            } else {
                throw new Error('Email sending failed');
            }
        } catch (error) {
            console.error("Failed to send email:", error);
            ('Failed to Send Email');
        }
    };