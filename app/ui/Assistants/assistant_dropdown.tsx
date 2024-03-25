"use client";

import React, { useState } from "react";
import ThreadBox from "./thread_box";
import MessageBox from "./message_box";

export default function AssistantInteraction() {
    // Update the state to hold both threadId and assistantId
    const [selectedThreadId, setSelectedThreadId] = useState('');
    const [selectedAssistantId, setSelectedAssistantId] = useState('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [threadId, assistantId] = event.target.value.split(",");
        setSelectedThreadId(threadId);
        setSelectedAssistantId(assistantId);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="m-2">
                <select id="assistantSelect" onChange={handleSelectChange} className="w-full p-2 bg-gray-100 border-black rounded-lg">
                    <option value="">Select an Assistant</option>
                    {/* Keep combining threadId and assistantId */}
                    <option value="thread_1qegTogz8FKzFC8kUUvnCv6h,asst_cywPHDDm90MN1KLDJcHbTJWI">Marketing Assistant</option>
                    <option value="thread_yHD0dsYReACJ7wt0vIc2Ecs3,asst_Ige5jUJ6IghGq8mmtMq0LhMg">Finance Assistant</option>
                </select>
            </div>
            <div className="flex-grow">
                {/* ThreadBox container with a fixed maximum height and overflow-auto for scroll */}
                <div className="border border-black rounded-lg p-5 m-5 max-h-[60vh] overflow-auto">
                    {/* Now pass the correct string value as props */}
                    <ThreadBox thread_id={selectedThreadId} />
                </div>
            </div>
            <div className="w-full">
                {/* Here too, pass the correct string value as props */}
                <MessageBox thread_id={selectedThreadId} assistant_id={selectedAssistantId} />
            </div>
        </div>
    );
}
