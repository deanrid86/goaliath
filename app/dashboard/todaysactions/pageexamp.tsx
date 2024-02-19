

import GoalViewer from "@/app/ui/todaysactions/goalviewer";







export default function DisplayGoals({  }) {
  

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
      <div>
            <div className='text-white text-xl p-2 m-2'>
              <h1 >Todays Actions</h1>
            </div>
            <div className='text-white text-xl bg-black-300 rounded-xl p-2 m-2' >
                <h3 >Here are your goal steps to work on today</h3>
            </div>   
            <GoalViewer/>
            <button onClick = {sendEmail} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Send Email
                </button>
                
      </div>
      
  );
}