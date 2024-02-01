"use client";

import { useState } from "react";

const dormant = "Not in use";

export default function ChatResult () {
    var [chatState, setChatState] = useState(dormant);

    return (
        <div>
            <p>The Assistant is {chatState}</p>
            <button onClick={()=>setChatState(chatState = "initiating")}>
                Create Assistant
            </button>
        </div>
    );

}