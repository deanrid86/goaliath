
import OpenAI from "openai";


const openai = new OpenAI();

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

//API key variable that stores CHAT GPT API

  {/*

  OpenAI Creation Functions
  
 */}

  export async function CreateAssistant(assistant_instructions: string, assistant_name: string, tool_type:string) {
    const myAssistant = await openai.beta.assistants.create({
      instructions: assistant_instructions,
      name: assistant_name ,
      tools: [{ type: "code_interpreter" }, { type: "retrieval" } ],
      model: "gpt-4",
    });
  
    console.log(myAssistant);
  }

  

  export async function CreateThread() {
    const emptyThread = await openai.beta.threads.create();
    console.log("This is the ID", emptyThread.id);
    return emptyThread.id
    
  }
  
  
  export async function CreateMessage(thread_id:string, message: string) {
    const threadMessages = await openai.beta.threads.messages.create(
        thread_id,
      { role: "user", content: message }
    );
  
    console.log(threadMessages);
  }

  export async function CreateRun(thread_id:string, assistant_id:string) {
    const run = await openai.beta.threads.runs.create(
        thread_id,
      { assistant_id: assistant_id }
    );
    
  
    console.log(run);
    return run.id
  }

 
  

  {/*

  OpenAI Retrieve Functions
  
 */}
 export async function RetrieveAssistant(assistant_id:string) {
    const myAssistant = await openai.beta.assistants.retrieve(
      assistant_id
    );
  
    console.log(myAssistant);
  }
  
  export async function RetrieveThread(thread_id:string) {
      const myThread = await openai.beta.threads.retrieve(
        thread_id
      );

      console.log(myThread);
      return myThread;
    }

    export async function RetrieveMessageList(thread_id:string) {
    const threadMessages = await openai.beta.threads.messages.list(
        thread_id
    );
        console.log(threadMessages.data);
        return threadMessages.data;
 
}
  
export async function RetrieveRun(thread_id:string, run_id:string) {
      const run = await openai.beta.threads.runs.retrieve(
          thread_id,
          run_id
      );
    
      console.log(run);
    }


export async function ListFiles() {
        const list = await openai.files.list();
      
        for await (const file of list) {
          console.log(file);
        }
        return list.data
      }
    //modal.dump.json is put at the end of functions to return json

    export async function waitForRunCompletion(thread_id:string, run_id:string) {
      return new Promise((resolve, reject) => {
        const checkInterval = 500; // milliseconds
    
        const checkRunStatus = async () => {
          try {
            const runStatus = await openai.beta.threads.runs.retrieve(
              thread_id,
              run_id,
            );
    
            if (runStatus.status === 'completed') {
              resolve(runStatus);
            } else {
              setTimeout(checkRunStatus, checkInterval);
            }
          } catch (error) {
            console.error('Error checking run status:', error);
            reject(error);
          }
        };
    
        checkRunStatus();
      });
    }