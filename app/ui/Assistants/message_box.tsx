"use client";

import React, { ChangeEvent, useState } from 'react';
import OpenAI from "openai";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

export default function MessageBox({ thread_id, assistant_id }: { thread_id: string, assistant_id: string }) {
    const [message, setMessage] = useState('');

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const threadMessages = await openai.beta.threads.messages.create(
                thread_id,
                { role: "user", content: message }
            );
            console.log("Thread message created:", threadMessages);

            const run = await openai.beta.threads.runs.create(
                thread_id,
                {assistant_id: assistant_id},
            );
            console.log("Run created with ID:", run.id);

            // Make sure you have defined waitForRunCompletion to wait for the run to complete

            // Retrieve the messages after the run completes
            const completedMessages = await openai.beta.threads.messages.list(thread_id);
            console.log("Completed messages:", completedMessages);

        } catch (error) {
            console.error("An error occurred:", error);
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
                <button type="submit" className="text-white bg-green-300 rounded-lg p-2">
                    Run
                </button>
            </div>
        </form>
    );
}
