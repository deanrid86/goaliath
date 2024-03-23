import React from "react";
import { RetrieveMessageList } from "@/app/lib/assistant_functions";

const thread_id = "thread_yHD0dsYReACJ7wt0vIc2Ecs3";

export default async function ThreadBox() {
    const messages = await RetrieveMessageList(thread_id);
    // Assuming messages is an array and we reverse it for rendering only
    const reversedMessages = [...messages].reverse(); // Create a reversed copy of the messages array
    
    return (
        <div className="overflow-auto max-h-[500px]">
            {reversedMessages.map((message, index) => (
                <div key={message.id || index} className="border-b border-gray-200 pb-4">
                    {message.content.map((contentItem, contentIndex) => (
                        contentItem.type === 'text' ? (
                            <p key={contentIndex} className="whitespace-pre-wrap">
                                {contentItem.text.value}
                            </p>
                        ) : null
                    ))}
                </div>
            ))}
        </div>
    );
}