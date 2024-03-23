import React from "react";

export default async function MessageBox () {
    return (
        <div className="border border-black rounded-lg p-5 w-message-box-width h-message-box-height flex flex-col ">
            <input
                type="text"
                className="w-full p-2 bg-gray-100 border-none"
                style={{ lineHeight: '20px' }}
                placeholder="Enter your message ..."
            />
            <div>
                <div className="flex justify-end">
                    <button className="text-white bg-green-300 rounded-lg p-2 ">
                        Run
                    </button>
                </div>
                
            </div>
        </div>
    );
}