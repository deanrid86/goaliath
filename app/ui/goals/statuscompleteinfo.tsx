"use client";

import React, { useState, useEffect } from "react";
import { fetchHighLevelStepsComplete } from "@/app/lib/data";

export const Status = ({id} : {id: string}) => {
    const [isComplete, setIsComplete] = useState(false);

    
        const checkStatus = async () => {
            const complete = await fetchHighLevelStepsComplete(id);
            setIsComplete(complete);
        };

        checkStatus();
     [id];

    return (
        <div>
            {isComplete ? (
                <div>Goal Complete</div>
            ) : null}
        </div>
    );
};