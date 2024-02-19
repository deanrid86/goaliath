import { createGoalStep } from "@/app/lib/actions";
import { fetchGoalStepInput } from "@/app/lib/data";
import { sql } from "@vercel/postgres";

export default async function GoalViewer() {
   const goalStepInput = await fetchGoalStepInput ();

 

 
    const sendEmail = async () => {
       
        const message = `Today's Step:`; // Use the input value as the message
        try {
            const response = await fetch('todaysactions/api', { // Adjust the API route as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: 'Your Subject Here',
                    message: message, // Send the input value
                }),
            });
            if (response.ok) {
                ('Email Sent Successfully');
                (''); // Optionally clear the input field after sending
            } else {
                throw new Error('Email sending failed');
            }
        } catch (error) {
            console.error("Failed to send email:", error);
            ('Failed to Send Email');
        }
    };

   

    return (
        <div className=' text-xl bg-black-300 rounded-xl p-2 m-2'>
            {/* Goal Input */}
            <div className="rounded-xl flex min-w-full bg-black-300 ">
            <div className="w-1/2 m-2 p-2">
              <form action = {createGoalStep}>
                <div className="flex items-center my-2">
              <input
                    type="text"
                    name="date"
                    placeholder="What is todays date"
                    className='flex-grow text-black rounded-lg p-2'
                    required
                />
                </div>
                <div className="flex items-center my-2">
                <input
                    type="text"
                    name="goalstep"
                    placeholder="Write Todays Steps to Take"
                    className='flex-grow text-black rounded-lg p-2'
                    required
                />
                </div>
                <div className="flex items-center my-2">
                <input
                    type="text"
                    name="goalhours"
                    placeholder="How many hours will you dedicate to this today"
                    className='flex-grow text-black rounded-lg p-2'
                    required
                />
                </div>
                
                <button className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
                    Add Step
                </button>
                </form>
                </div>
              <div className='text-white bg-black-500 p-2 m-2 rounded-xl w-1/2'>
                <ul>
                {goalStepInput.map((step) => (
                <li key={step.uniqueid}>{step.goalstep}</li>
                ))}
              </ul>
              </div>
            </div>
            
           {/* <button action = {sendEmail} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Send Email
                </button>*/}
            
        </div>
    );
}
