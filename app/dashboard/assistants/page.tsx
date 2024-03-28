"use client";

import React, { useState, useEffect } from 'react';
import OpenAI from "openai";
import MessageBox from "@/app/ui/Assistants/message_box";
//import ThreadBox from "@/app/ui/Assistants/thread_box";
import AssistantCreator_Top from "@/app/ui/Assistants/assistant_creator";
import AssistantCreator_Bottom from "@/app/ui/Assistants/assistant_creator_bottom";
import AddFileComponent from "@/app/ui/Assistants/add_file";
import AssistantDropDown from "@/app/ui/Assistants/assistant_dropdown";
import AssistantInteraction from "@/app/ui/Assistants/assistant_dropdown";


const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

export default function Page() {
    const [showAssistantCreator, setShowAssistantCreator] = useState(false);

    // Function to toggle the visibility
    const toggleAssistantCreator = () => setShowAssistantCreator(prev => !prev);


    
    return (
            <div className="flex h-full"> {/* This ensures the container takes the full height of the screen */}
                <div className="w-2/3 flex flex-col">
                    <div>Choose Assistant</div>
                    <div>
                        <AssistantInteraction/>
                    </div>
                    
                </div>
                <div className="w-1/3 flex flex-col">
                    {/* Button to toggle the visibility of AssistantCreator_Bottom */}
                    <button
                        className="self-end bg-green-300 text-white p-2 rounded-md m-2"
                        onClick={toggleAssistantCreator}
                    >
                        {showAssistantCreator ? 'Hide Assistant Creator' : 'Show Assistant Creator'}
                    </button>
                    {/* This new div takes up 1/3 of the width and is conditionally rendered */}
                    {showAssistantCreator && (
                        <div className="border border-black rounded-lg p-2 m-2 overflow-auto">
                            <div className="w-full bg-white">
                                <h3>Assistant Creation</h3>
                            </div>
                            <div>
                                <AssistantCreator_Bottom/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

{/* You are an intelligent assistant whos main aim is to provide information, strategy, ideas and planning as my head of marketing. Your responses and actions should always align with the job profile assigned to you, reflecting the responsibilities and objectives outlined in that profile. As part of your role, you have been given access to several key documents: the 'bot_dna.json', 'company_service_overview.json', 'core_values.json', and a profile document specific to your role (e.g., 'HeadOfFinance.json' for a finance bot). These documents contain critical information about our company's core values, our services, the DNA that makes up the foundation of our bots, and the detailed responsibilities of your role.)Your job is to leverage this information to guide your interactions, ensure that your actions and responses are in line with our company's values and service standards, and fulfil the duties outlined in your job profile. When addressing queries or performing tasks, always consider the contents of these documents to make informed decisions and provide answers that are not only accurate but also reflect our company's ethos and objectives. It is imperative that if you ever need specific information that I can gather, that you ask for it. I want are relationship to be collaborative. You should aim to fulfil the following statement at  all times: "How can I provide constant world-class marketing information, planning, ideas and strategy in order to make the business I work for, a global leader". */}