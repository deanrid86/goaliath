// Import the necessary modules and functions
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { fetchSpecificLevelStepsAdd, fetchSpecificLevelStepsComplete } from "@/app/lib/data";
import { addDaysToChatTime, calculateDaysLeft } from "@/app/lib/utils";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const specificgoal = await fetchSpecificLevelStepsAdd();
    const specificgoalcomplete = await fetchSpecificLevelStepsComplete();

    const specificGoalsHtml = specificgoal.map((goal, index) => {
      return `
        <div>
          <strong>Main Goal Step:</strong> ${goal.stepdescription}<br/>
          Timeframe: ${goal.timeframe} days<br/>
          <strong>Step to Work on Today:</strong> ${goal.specificparsedresult}<br/>
          Timeframe: To be completed within ${goal.timeframe} days to keep your goal on track.<br/>
          <strong>Deadline:</strong> ${addDaysToChatTime(goal.specificchattime, goal.timeframe)}<br/>
          <strong>Days Left Until Completion:</strong> ${calculateDaysLeft(addDaysToChatTime(goal.specificchattime, goal.timeframe))}
        </div><br/>
      `;
    }).join('');

    const completedGoalsHtml = specificgoalcomplete.map((goal, index) => {
      return `
        <div>
          <strong>Main Goal Step:</strong> ${goal.stepdescription}<br/>
          <strong>Completed Steps:</strong> ${goal.specificparsedresult}
        </div><br/>
      `;
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
      subject: 'Today\'s Goals to Complete',
      html: `<h1>Today's Actions</h1><h3>What Steps do you want to Complete Today?</h3>${specificGoalsHtml}<h3>Your Completed Steps</h3>${completedGoalsHtml}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email Sent Successfully' });
  } catch (error) {
    console.error('Failed to send Email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
