"use client";

import React, { useState } from 'react';
import CombinedForm from './combinedform';

export default function ToggleButton () {
    const [isFormVisible, setIsFormVisible] = useState(false);
    return (

        <div>
            {/* Toggle button for CombinedForm */}
            <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="my-4 flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                {isFormVisible ? 'Hide Step Input Form' : 'Show Step Input Form'}
            </button>

            {/* Conditionally render CombinedForm based on isFormVisible */}
            {isFormVisible && (
            <div className="w-1/2 m-2 p-2">
                <CombinedForm />
            </div>
            )}
        </div>
    );
}