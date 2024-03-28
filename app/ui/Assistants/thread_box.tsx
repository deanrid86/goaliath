"use client";

import React, { useState, useEffect } from 'react';
import { RetrieveMessageList } from "@/app/lib/assistant_functions";
import OpenAI from "openai";
import { insertContributionData } from '@/app/lib/actions';
import { v4 as uuidv4 } from 'uuid';



const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  




export default function ThreadBox({ thread_id }: { thread_id: string }) {

    const [reversedMessages, setReversedMessages] = useState<ThreadMessage[]>([]);
    const [latestMessage, setLatestMessage] = useState<ThreadMessage[]>([]);
    const [runCompleted, setRunCompleted] = useState(false);
    

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

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await openai.beta.threads.messages.list(thread_id);
            if (response.data) {
              const messages: ThreadMessage[] = response.data;
              const latestmessage = messages[0];
              setLatestMessage([latestmessage]); // Now correctly typed
              const reversed = [...messages].reverse();
              setReversedMessages(reversed);
              setRunCompleted(false); // Reset run completion status whenever thread_id changes or new messages are fetched
            }
          } catch (error) {
            console.error('Failed to fetch messages:', error);
          }
        };
        fetchData();
    }, [thread_id, runCompleted]);

{/*useEffect(() => {
  if (latestMessage.length > 0) {
    // Assuming latestMessage[0] contains the structure you've provided
    const latestResponseContent = latestMessage[0].content;
    if (latestResponseContent && latestResponseContent.length > 0) {
      // Assuming the first item in content array is the text type you're interested in
      const latestResponseText = latestResponseContent[0].text;
      if (latestResponseText && latestResponseText.value) {
        const description = latestResponseText.value;
        console.log(description);
        const contributionID = uuidv4();; // Assuming this ID is suitable, otherwise generate or retrieve as needed
        console.log (contributionID)
        const threadid = thread_id; // Example, replace with actual logic to get assistantID if needed
        console.log (threadid)
        const title = "N/A";
        console.log (title)
        const category = "N/A";
        console.log (category)
        const status = "N/A";
        console.log (status)
        const now = new Date();

        // To get the Unix timestamp (number of milliseconds since January 1, 1970)
        const unixTimestamp = now.getTime();

        // To get the Unix time (number of seconds since January 1, 1970)
        const unixTime = Math.floor(unixTimestamp / 1000);
        const createdat= unixTime;
        console.log (createdat)
        const updatedat = unixTime;
        console.log (updatedat)
        insertContributionData(contributionID, threadid, title, description, category, status, createdat, updatedat)
          .then(() => console.log('Contribution inserted'))
      .catch(error => console.error('Failed to insert contribution:', error));}
    }
  }
}


, [latestMessage, thread_id]);*/}
    
   // const messages = await RetrieveMessageList(thread_id);
    // Assuming messages is an array and we reverse it for rendering only
   // const reversedMessages = [...messages].reverse(); // Create a reversed copy of the messages array

   
    
 return (
    <div>
      {reversedMessages.map((message, index) => (
        <div key={message.id || index}>
          {message.content.map((contentItem, contentIndex) =>
            contentItem.type === 'text' ? (
              // Use optional chaining to safely access contentItem.text.value
              <p key={contentIndex} className="whitespace-pre-wrap">
                {contentItem.text?.value}
              </p>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
}

 {/* useEffect(() => {
        const fetchData = async () => {
          try {
            // Directly making the API call to retrieve thread messages
            const response = await openai.beta.threads.messages.list(thread_id);
            if (response.data && response.data.length > 0) {
              // Assuming the data is in the format that you need
              // Select just the last message, which is the latest one
              const latestMessage = response.data [0];
              setReversedMessages([latestMessage]); // Store it in an array if your state expects an array
            }
          } catch (error) {
            console.error('Failed to fetch messages:', error);
          }
        };
    
        fetchData();
    }, [thread_id]);*/}