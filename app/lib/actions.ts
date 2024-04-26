'use server';



import { object, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from "openai";
import { CreateRun, CreateThread, waitForRunCompletion } from './assistant_functions';
import fs from 'fs'
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import { CombinedPlannerStep, GoalPlannerDetail, GoalPlannerStep, HighLevelDetail, User } from './definitions';
import bcrypt from 'bcrypt';
import { createSession } from '@/app/lib/session'
import { deleteSession } from '@/app/lib/session'


const openai = new OpenAI();
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

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

    const GenderEnum = z.enum(['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say']);

    const FormSchemaUserProfile = z.object({
      id: z.string(),
      firstname: z.string(),
      middlenames: z.string(),
      surname: z.string(),
      dob: z.string(),
      gender: GenderEnum,
      occupation: z.string(),
      about: z.string(),
      interests: z.string(),
      ambition: z.string(),
    });


  
   
  
    const CreateUserProfile = FormSchemaUserProfile.omit({ id: true });
  
    export async function createUserProfile(formData: FormData) {
        const { firstname, middlenames, surname, dob, gender, occupation, about, interests, ambition } = CreateUserProfile.parse({
          firstname: formData.get('firstname'),
          middlenames: formData.get('middlenames'),
          surname: formData.get('surname'),
          dob: formData.get('dob'),
          gender: formData.get('gender'),
          occupation: formData.get('occupation'),
          about: formData.get('about'),
          interests: formData.get('interests'),
          ambition: formData.get('ambition'),
        });
        
    
        await sql`
        INSERT INTO users (firstname, middlenames, surname, dob, gender, occupation, about, interests, ambition )
        VALUES (${firstname}, ${middlenames}, ${surname}, ${dob}, ${gender}, ${occupation}, ${about}, ${interests}, ${ambition} )
      `;
    
      revalidatePath('/dashboard/profile');
      redirect('/dashboard/profile');
      }

    const FormSchemaAssistant = z.object({
      id: z.string(),
      name: z.string(),
      instructions: z.string().default(" You are an intelligent assistant whos main aim is to provide information, strategy, ideas and planning as my head of whatever your job description is from the attached documents. Your responses and actions should always align with the job profile assigned to you, reflecting the responsibilities and objectives outlined in that profile. As part of your role, you have been given access to several key documents: the 'bot_dna.json', 'company_service_overview.json', 'core_values.json', and a profile document specific to your role (e.g., 'HeadOfFinance.json' for a finance bot). These documents contain critical information about our company's core values, our services, the DNA that makes up the foundation of our bots, and the detailed responsibilities of your role.)Your job is to leverage this information to guide your interactions, ensure that your actions and responses are in line with our company's values and service standards, and fulfil the duties outlined in your job profile. When addressing queries or performing tasks, always consider the contents of these documents to make informed decisions and provide answers that are not only accurate but also reflect our company's ethos and objectives. It is imperative that if you ever need specific information that I can gather, that you ask for it. I want are relationship to be collaborative. You should aim to fulfil the following statement at  all times: How can I provide constant world-class information, planning, ideas and strategy in order to make the business I work for, a global leader"),
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
        

       


       await sql`
       INSERT INTO assistants (threadid, name, type, createdat, lastactiveat)
       VALUES (
           ${threadId}, 
           ${myAssistant.id},
           ${myAssistant.name},
           ${myAssistant.created_at},
           ${myAssistant.created_at}
       )
   `;

      revalidatePath('/dashboard/assistants');
      redirect('/dashboard/assistants');
      };

      const FormSchemaMessage = z.object({
        id: z.string(),
        message: z.string(),
        thread_id: z.string(),
        assistant_id: z.string(),
       
        
        
      });
    
      
    
      const CreateMessage = FormSchemaMessage.omit({ id: true });
    
      export async function createMessage(formData: FormData) {
          const { message, thread_id, assistant_id } = CreateMessage.parse({
            message: formData.get('message'),
            thread_id: formData.get('thread_id'),
            assistant_id: formData.get('assistant_id'),
          
          });
          
         const threadMessages = await openai.beta.threads.messages.create(
                thread_id,
              { role: "user", content: message }
            );
          
            console.log(threadMessages);

            const run = await CreateRun(thread_id,assistant_id)

            // Wait for the run to complete
    await waitForRunCompletion(thread_id, run);

    // Retrieve the messages after the run completes
    const completedMessages = await openai.beta.threads.messages.list(thread_id);
    console.log ("This is the returned message: ", completedMessages)
    

              
    };

    const FormSchemaAssistantDropDown = z.object({
      id: z.string(),
      thread_id: z.string(),
      assistant_id: z.string(),
      assistant_name: z.string(),
     
      
    });

    const CreateMessageList = FormSchemaAssistantDropDown.omit({ id: true });

    export async function createMessageList(formData: FormData) {
      const {thread_id, assistant_id, assistant_name } = CreateMessageList.parse({
        assistant_id: formData.get('assistant_id'),
        thread_id: formData.get('thread_id'),
        assistant_name: formData.get('assistant_name'),
      
      });
      const threadMessages = await openai.beta.threads.messages.list(
          thread_id
      );
          console.log(threadMessages.data);
          return threadMessages.data;
    }




    //UPLAD FILE SECTION

    const FormSchemaFileUpload = z.object({
      filePath: z.string(),
       });

    export async function uploadFile(formData: FormData) {
      const {filePath} = FormSchemaFileUpload.parse({
        filePath: formData.get('filePath'),
       
      
      });

        const fileUpload = await openai.files.create({
          file: fs.createReadStream(filePath),
          purpose: "fine-tune",
        });
        console.log (fileUpload)
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

const FormSchemaMentalModel = z.object({
  modelid: z.string(),
  addstatus: z.enum(['no', 'yes']),
 
});
  // Use Zod to update the expected types
  const UpdateMentalModelStatus = FormSchemaMentalModel.omit({ modelid: true});
 
  // ...
   
  export async function updateMentalModelStatus(id: string, formData: FormData) {
    const parsedData  = UpdateMentalModelStatus.parse({
      addstatus: formData.get('addstatus'),
    });
   
    // Extract the addstatus value from the parsedData object
    const { addstatus } = parsedData;
   
    await sql`
      UPDATE mentalmodels
      SET addstatus = ${addstatus}
      WHERE modelid = ${id}
    `;
   
    revalidatePath('/dashboard/mentalmodels');
    redirect('/dashboard/mentalmodels');
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
    await sql`DELETE FROM goalplanner WHERE uniqueid = ${id}`;
    revalidatePath('/dashboard/goals');
  }

  export async function completeGoal(id: string) {
    await sql`
      UPDATE goalplanner 
      SET completestatus = CASE 
                              WHEN completestatus = 'yes' THEN 'no' 
                              ELSE 'yes' 
                            END
      WHERE uniqueid = ${id};
    `;
    revalidatePath('/dashboard/goals');
    redirect('/dashboard/goals');
  }

  export async function completeStep(id: string) {
    await sql`
      UPDATE highlevelsteps 
      SET statuscomplete = 'Yes'
      WHERE id = ${id};
    `;
    revalidatePath('/dashboard/goals');
    redirect('/dashboard/goals');
}

export async function completeStepNo(id: string) {
  await sql`
    UPDATE highlevelsteps 
    SET statuscomplete = 'No'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/goals');
  redirect('/dashboard/goals');
}

export async function addStep(id: string) {
  await sql`
    UPDATE highlevelsteps 
    SET statusadd = 'yes'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/goals');
  redirect('/dashboard/goals');
}



export async function addStepNo(id: string) {
  await sql`
    UPDATE highlevelsteps 
    SET statusadd = 'no'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/goals');
  redirect('/dashboard/goals');
}

export async function createSpecificSteps(id: string) {
  await sql`

    SELECT 
    highlevelsteps.stepdescription
    FROM highlevelsteps 
    
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/goals');
  redirect('/dashboard/goals');
}
 
export async function completeSpecificStep(id: string) {
  await sql`
    UPDATE goalplannerspecific 
    SET statuscomplete = 'Yes'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/goals');
  redirect('/dashboard/goals');
}

export async function completeSpecificStepDA(id: string) {
  await sql`
    UPDATE goalplannerspecific 
    SET statuscomplete = 'Yes'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/todaysactions');
  redirect('/dashboard/todaysactions');
}

export async function completeSpecificStepNo(id: string) {
  await sql`
    UPDATE goalplannerspecific 
    SET statuscomplete = 'No'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/goals');
  redirect('/dashboard/goals');
}

export async function addSpecificStep(id: string) {
  await sql`
    UPDATE goalplannerspecific 
    SET statusadd = 'Yes'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/goals');
  redirect('/dashboard/goals');
}

export async function addSpecificStepNo(id: string) {
  await sql`
    UPDATE goalplannerspecific 
    SET statusadd = 'No'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/goals');
  redirect('/dashboard/goals');
}

export async function addSpecificStepNoDA(id: string) {
  await sql`
    UPDATE goalplannerspecific 
    SET statusadd = 'No'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/todaysactions');
  redirect('/dashboard/todaysactions');
}

export async function addMentalModel(id: string) {
  await sql`
    UPDATE mentalmodels 
    SET addstatus = 'Yes'
    WHERE modelid = ${id};
  `;
  revalidatePath('/dashboard/mentalmodels');
  redirect('/dashboard/mentalmodels');
}

export async function removeMentalModel(id: string) {
  await sql`
    UPDATE mentalmodels 
    SET addstatus = 'no'
    WHERE modelid = ${id};
  `;
  revalidatePath('/dashboard/mentalmodels');
  redirect('/dashboard/mentalmodels');
}

export async function removeMentalModelDA(id: string) {
  await sql`
    UPDATE mentalmodels 
    SET addstatus = 'no'
    WHERE modelid = ${id};
  `;
  revalidatePath('/dashboard/todaysactions');
  redirect('/dashboard/todaysactions');
}

export async function addLesson(id: string) {
  await sql`
    UPDATE lessonfields 
    SET addstatus = 'Yes'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/lessons');
  redirect('/dashboard/lessons');
}

export async function removeLesson(id: string) {
  await sql`
    UPDATE lessonfields 
    SET addstatus = 'no'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/lessons');
  redirect('/dashboard/lessons');
}

export async function removeLessonDA(id: string) {
  await sql`
    UPDATE lessonfields 
    SET addstatus = 'no'
    WHERE id = ${id};
  `;
  revalidatePath('/dashboard/todaysactions');
  redirect('/dashboard/todaysactions');
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

  // Function to insert contribution data into the database
  export async function insertContributionData(contributionID: string, threadID: string, title: string, description:string, category:string, status:string,  createdat: number, updatedat: number) {
    try {
      
      
      await sql`
        INSERT INTO contributions (contributionid, threadid, title, description, category, status, createdat, updatedat)
        VALUES (${contributionID}, ${threadID}, ${title}, ${description}, ${category}, ${status}, ${createdat}, ${updatedat})
      `;
  
      console.log('Contribution data inserted into the database.');
  
    } catch (error) {
      console.error('Error inserting contribution data into the database:', error);
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

    export async function authenticate(
      prevState: string | undefined,
      formData: FormData,
    ) {
      try {
        await signIn('credentials', formData);
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return 'Invalid credentials.';
            default:
              return 'Something went wrong.';
          }
        }
        throw error;
      }
    }

    //Chat GPT API Calls

    const FormSchemaGoalInput = z.object({
      fakeid: z.string(),
      usergoal: z.string(),
      usertimeline: z.string(),
      userFirstGoalAvailableHours:z.string(),
      
    });

    interface HighStepDetail {
      id: string;
      description: string;
      timeframe: number;
      statuscomplete: 'Yes' | 'No';
      statusadd: 'Yes' | 'No';
  }
     
    const CreateGoalInput = FormSchemaGoalInput.omit({ fakeid: true });
  
    export async function createGoalGPT(formData: FormData) {
      const { usergoal, usertimeline, userFirstGoalAvailableHours } = CreateGoalInput.parse({
          usergoal: formData.get('usergoal'),
          usertimeline: formData.get('usertimeline'),
          userFirstGoalAvailableHours: formData.get('userFirstGoalAvailableHours'),
      });
  
      const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is securely managed
      });
  
      try {
          const completion = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [
                  {
                      role: "system",
                      content: `You are now my personal life coach and business assistant. This is the goal I would like to achieve: ${usergoal}. 
                      I would like to achieve this goal within ${usertimeline} months. Provide me with a detailed strategy to maximize my chances of achieving the goal, 
                      from beginning to goal completion. The response must be strictly shown in JSON format only with steps such as Step 1 and then Step 2 etc being keys
                       and their content being the value etc. In addition, the response must always start in a format like this ({ "Step 1":) and not with the word literal
                        word  "json". Within this value, I also want you to state how many days you think it will take me to complete this step (bearing in mind that the whole goal should take ${usertimeline} months.) Each value of the step should strictly include 5 keys at all times. One being the detailed description of the step, 2 being a key that says 'timeframe' and a 'value' that is the timeframe in days, 3 being 'statuscomplete' with the default value of 'No', 4 being 'statusadd' with the default value also being 'No' and 5 called 'id' being a UUIDv4 number that is uniquely set to each step. The answer given to me will start from step 1 immediately without any other introductory sentence.`
                  }
              ]
          });
  
          const result = completion.choices[0].message.content || "Content Unavailable at this time";
          const chatid = completion.id;
          const chattime = new Date(completion.created * 1000).toISOString();
          const uniqueID = uuidv4();
          console.log("NEW CHAT GPT RESPONSE", result);
  
          await sql <GoalPlannerDetail>`
            INSERT INTO goalplanner (uniqueid, chatid, chattime, goalresult, usergoal, usertimeline, userhours)
            VALUES (${uniqueID}, ${chatid}, ${chattime}, ${result}, ${usergoal}, ${usertimeline}, ${userFirstGoalAvailableHours})
          `;
  
          const parsedData = JSON.parse(result);
          
          Object.entries(parsedData).forEach(async ([stepKey, stepValue], index) => {
            // Assuming stepValue is an object that fits the StepDetail interface
            const stepDetails: HighStepDetail = stepValue as HighStepDetail;

           
            
              await sql <HighLevelDetail>`
                INSERT INTO highlevelsteps (id, goalid, stepdescription, timeframe, statuscomplete, statusadd, orderindex)
                VALUES (${stepDetails.id}, ${uniqueID}, ${stepDetails.description}, ${stepDetails.timeframe}, ${stepDetails.statuscomplete}, ${stepDetails.statusadd}, ${index})
              `;
          });
  
      } catch (error) {
          console.error("Error getting ChatGPT data:", error);
          throw error;  // Rethrow the error after logging
      }

      revalidatePath('/dashboard/test');
    redirect('/dashboard/test');
  
  }

  interface APIResult {
    [key: string]: DetailedStep;
  }

  interface DetailedStep {
    id: string;
    highlevelid: string;
    description: string;
    timeframe: number; // Assuming timeframe is a number of days, adjust as needed
    statuscomplete: 'Yes' | 'No'; // Assuming these are the only two possible values
    statusadd: 'Yes' | 'No';
  }

  export async function createSpecificStepGPT(id: string) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is securely managed
    });

    // Correct the SQL query and use parameters properly
    try {
        const data = await sql`
            SELECT 
              highlevelsteps.id AS parent_id,
              highlevelsteps.stepdescription,
              goalplanner.userhours
            FROM 
              highlevelsteps 
            JOIN 
              goalplanner ON highlevelsteps.goalid = goalplanner.uniqueid
            WHERE 
              highlevelsteps.id = ${id};`;

        // Check if data was found
        if (!data.rows.length) {
            console.error('No data found for given ID:', id);
            return;
        }

        const { parent_id, stepdescription, userhours } = data.rows[0];

        // Proceed to make a request to OpenAI with the retrieved data
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are my personal life coach and business assistant. This is the goal I would like to achieve: ${stepdescription}. 
                    Provide me with a detailed strategy with incremental steps on how to complete this goal, knowing I have ${userhours} hours available each day. 
                    The response must be in JSON format only with steps labeled Step 1, Step 2, etc. In addition, the response must always start in a 
                    format like this ({ "Step 1":) and not with the word literal
                    word  "json". Each step should include: detailed description, timeframe in days (just say the number dont add days), and
                     highlevelid equals ${parent_id}.`
                }
            ]
        });

        console.log("Completion:", completion);
        const result = completion.choices[0]?.message?.content || "Content Unavailable at this time";
        const chatid = completion.id;
        const chattime = new Date(completion.created * 1000).toISOString();
        const parsedData = JSON.parse(result);
        console.log ("This is the parsed Data for Second Step", parsedData)

        // Assume parsedAPIResult conforms to DetailedSteps interface.
        const secondstepresult: APIResult = parsedData;

        // Loop through each detailed step and save it to the database.
        Object.entries(secondstepresult).forEach(async ([stepKey, stepValue], index) => {
          // Directly use the parsed data without additional parsing.
          
          const parsedResult = stepValue.description;
          const highlevelid = stepValue.highlevelid;
          console.log("Inserting coach data with highlevelid:", highlevelid);
          const timeframe = stepValue.timeframe;
          const statuscomplete = "No";
          const statusadd = "No";
          const id = uuidv4();

          await sql <GoalPlannerStep>`
                INSERT INTO goalplannerspecific (id, highlevelid, specificgoalresult, specificchatid, specificchattime, specificparsedresult, statuscomplete, statusadd, timeframe, orderindex)
                VALUES (${id}, ${highlevelid}, ${result}, ${chatid}, ${chattime}, ${JSON.stringify(parsedResult)}, ${statuscomplete}, ${statusadd}, ${timeframe}, ${index})
              `;
          });

    } catch (error) {
        console.error('Database or OpenAI API Error:', error);
        throw error; // Rethrow the error after logging
    }
}

//Authentication action

 
const SignupFormSchema = z.object({
  firstname: z
    .string() //Makes Sure its a string
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(), //Makes sure it gets rid of white space
  surname: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        firstname?: string[]
        surname?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

  export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      firstname: formData.get('firstname'),
      surname: formData.get('surname'),
      email: formData.get('email'),
      password: formData.get('password'),
    })
   
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
   
    // 2. Prepare data for insertion into database
  const { firstname, surname, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // Insert the user into the database
  try {
    const result = await sql`
        INSERT INTO users (firstname, surname, email, password)
        VALUES (${firstname}, ${surname}, ${email}, ${hashedPassword})
        RETURNING id;  
    `;
 
  // Check if insertion was successful
  if (result.rowCount === 0) {  // Use `rowCount` to check how many rows were affected
    return {
        message: 'An error occurred while creating your account.',
    };
}

// Retrieve the inserted user's ID if needed
const userId = result.rows[0].id;  // Access the `id` of the inserted user
await createSession(userId)
return {
    message: 'Account successfully created.',
    userId: userId,
    
};



} catch (error) {
  console.error('Database Error:', error);
  return {
      message: 'An error occurred while creating your account.',
  };
}



}

  
export async function logout() {
  deleteSession()
  redirect('/login')
}



  // 5. Redirect user
  //redirect('/profile')