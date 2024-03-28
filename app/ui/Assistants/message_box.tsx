"use client";

import React, { ChangeEvent, useState } from 'react';
import OpenAI from "openai";
import { waitForRunCompletion } from '@/app/lib/assistant_functions';
import { insertContributionData } from '@/app/lib/actions';
import { v4 as uuidv4 } from 'uuid';


const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

export default function MessageBox({ thread_id, assistant_id }: { thread_id: string, assistant_id: string }) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add a loading state

    interface ThreadMessage {
        id: string;
        content: {
          type: string;
          text?: {
            value: string;
          };
        }[];
        // Add other necessary fields from your message structure
      }
    
    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
        
    };

   

    

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true); // Indicate the start of a process

    try {
        // Create a thread message
        await openai.beta.threads.messages.create(thread_id, {
            role: "user",
            content: message,
        });

        // Initiate a run and wait for it to complete
        const run = await openai.beta.threads.runs.create(thread_id, {
            assistant_id: assistant_id,
        });
        await waitForRunCompletion(thread_id, run.id);

        // Retrieve the latest message from the thread
        const response = await openai.beta.threads.messages.list(thread_id);
        if (response.data && response.data.length > 0) {
            const messages: ThreadMessage[] = response.data;
            const latestmessage = messages[0].content;
            const description = latestmessage[0].text?.value;


            // Preparing dynamic fields for insertion
            const contributionID = uuidv4();
            const title = "Dynamic Title"; // This could be assigned dynamically
            const category = "Dynamic Category"; // This could be assigned dynamically
            const status = "Dynamic Status"; // This could be assigned dynamically
            const createdat = Math.floor(Date.now() / 1000); // Current Unix time
            const updatedat = createdat;

            // Insert data into the database
            await insertContributionData(contributionID, thread_id, title, description || "", category, status, createdat, updatedat);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        setMessage(''); // Clear the message field after submission
        setIsLoading(false); // Reset loading state
    }
};


    return (
        <form className="border border-black rounded-lg p-5 w-message-box-width h-message-box-height flex flex-col" onSubmit={handleSubmit}>
            <input
                id="message"
                name="message"
                type="text"
                className="w-full p-2 bg-gray-100 border-none"
                style={{ lineHeight: '20px' }}
                placeholder="Enter your message ..."
                value={message}
                onChange={handleMessageChange}
            />
            <div className="flex justify-end">
            <button type="submit" className="text-white bg-green-300 rounded-lg p-2" >
                    {isLoading ? 'Running...' : 'Run'}
                </button>
            </div>
        </form>
    );
}

