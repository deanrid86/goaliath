'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

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
export async function insertChatData(uniqueID: string, chatID: string, chatTime:string,  goalResult: string, userGoal: string, userTimeline: string, userHours: string) {
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
  export async function insertCoachData(specificuniqueID:string, apiResponse: string, stepChatId: string , stepChatTime: string, parsedAPIResult: string) {
    try {
      
      await sql`
        INSERT INTO goalplannerspecific (specificuniqueid, specificgoalresult, specificchatid, specificchattime, specificparsedresult )
        VALUES (${specificuniqueID}, ${apiResponse}, ${stepChatId}, TO_TIMESTAMP(${stepChatTime}, 'DD/MM/YYYY, HH24:MI:SS'), ${JSON.stringify(parsedAPIResult)})
      `;
  
      console.log('Specific Chat data inserted into the database.');
    } catch (error) {
      console.error('Error inserting specific chat data into the database:', error);
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
      uniqueid: z.string(),
      date: z.string(),
      goalstep: z.string(),
      stephours: z.string(),
      
    });

    const CreateGoalStep = FormSchemaGoalStep.omit({uniqueid: true });

    export async function createGoalStep(formData: FormData) {
        const { date, goalstep, stephours } = CreateGoalStep.parse({
          date: formData.get('date'),
          goalstep: formData.get('goalstep'),
          stephours: formData.get('stephours') || '',
          
        });
        
        const uniqueid = uuidv4();
    
        await sql`
        INSERT INTO goalstepinput (unique_id, date, goalstep, stephours)
        VALUES (${uniqueid}, ${date}, ${goalstep}, ${stephours})
      `;
    
      revalidatePath('/dashboard/todaysactions');
      redirect('/dashboard/todaysactions');
      }

      const UpdateGoalStep = FormSchemaGoalStep.omit({ uniqueid: true});

  export async function updateGoalStep(uniqueid: string,formData: FormData) {
    const { date, goalstep, stephours } = UpdateGoalStep.parse({
      date: formData.get('date'),
      goalstep: formData.get('goalstep'),
      stephours: formData.get('stephours'),
    });

   
   
    await sql`
      UPDATE goalstepinput
      SET date = ${date}, goalstep= ${goalstep}, stephours = ${stephours}
      WHERE unique_id = ${uniqueid}
    `;
   
    revalidatePath('/dashboard/lessons');
    redirect('/dashboard/lessons');
  }

      export async function deleteStepInput(uniqueid: string) {
        await sql`DELETE FROM goalstepinput WHERE unique_id = ${uniqueid}`;
        revalidatePath('/dashboard/todaysactions');
      }

      export async function sendEmail ()  {
       
        
        try {
            const response = await fetch('http://localhost:3000/dashboard/todaysactions/api', { // Adjust the API route as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: 'Today\'s Goals to Complete',
                    message: 'Here are the goals for today:',
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