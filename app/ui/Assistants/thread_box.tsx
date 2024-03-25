"use client";

import React, { useState, useEffect } from 'react';
import { RetrieveMessageList } from "@/app/lib/assistant_functions";
import OpenAI from "openai";


const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  

// origional const thread_id = "thread_yHD0dsYReACJ7wt0vIc2Ecs3";
const thread_id = "thread_1qegTogz8FKzFC8kUUvnCv6h";


export default function ThreadBox({ thread_id }: { thread_id: string }) {

    const [reversedMessages, setReversedMessages] = useState<ThreadMessage[]>([]);

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
            // Directly making the API call to retrieve thread messages
            const response = await openai.beta.threads.messages.list(thread_id);
            if (response.data) {
              const messages = response.data;
              // Assuming the data is in the format that you need, reverse the messages
              const reversed = [...messages].reverse();
              setReversedMessages(reversed);
            }
          } catch (error) {
            console.error('Failed to fetch messages:', error);
          }
        };
    
        fetchData();
      }, [thread_id]);

    
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