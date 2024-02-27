// Import the necessary types from 'next'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { fetchLatestGoalStep } from "@/app/lib/data";


  


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  interface Step {
    description: string;
    timeframe: {
      value: number;
      unit: string; // Assuming there is a 'unit' based on your earlier code
    };
  }
  
  // Assuming the structure for the parsed goal result looks something like this
  interface Steps {
    [key: string]: Step;
  }
  try {
    const goals = await fetchLatestGoalStep();
    
    const { subject = 'Today\'s Goals to Complete', message = 'Here are your goals for today:' } = req.body;


    const goalsHtml = goals.map(goal => {
      // Parse the 'specificgoalresult' JSON string into an object
      // and assert its type
      const steps: Steps = JSON.parse(goal.specificgoalresult);

      // Now iterate over the steps object to format it into HTML
      const stepsHtml = Object.entries(steps).map(([stepKey, { description, timeframe }]) => {
        return `<li><strong>${stepKey}:</strong> ${description}<br/>Timeframe: ${timeframe.value} days</li>`;
      }).join('');

      return `<div><strong>Goal ID:</strong> ${goal.id}<ul>${stepsHtml}</ul></div>`;
    }).join('');

    // Configure the mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Define mail options
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL, // Use the actual recipient's email here
      subject,
      html: `<h3>${subject}</h3><p>${message}</p>${goalsHtml}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json ({Message: 'Email Sent Successfully'}, {status: 200})
  } catch (error) {
    return NextResponse.json ({Message: 'Failed to send Email'}, {status: 500})
  }

  

}
