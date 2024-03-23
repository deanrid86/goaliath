"use client";


import React, { useState, useEffect, ChangeEvent } from 'react';
import { ListFiles } from '@/app/lib/assistant_functions'; 




export default function AssistantCreator_Bottom() {

    type FileObject = {
        id: string;
        object: string;
        bytes: number;
        created_at: number;
        filename: string;
        purpose: string;
      };

      type FileType = {
        name: string;
    };

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedRadioOption, setSelectedRadioOption] = useState('');
    const [files, setFiles] = useState<FileType[]>([]);
    const [filesList, setFilesList] = useState<FileObject[]>([]);

   

    // Handles changes for the dropdown
    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    // Handles changes for the radio buttons
    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedRadioOption(event.target.value);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        event.target.value = '';
    };

    useEffect(() => {
        const fetchFiles = async () => {
            const files = await ListFiles();
            setFilesList(files); // Update state with the fetched files list
        };
        fetchFiles();
    }, []); // Empty dependency array means this effect runs once on component mount


    return (
        <div className="flex flex-col h-full divide-y divide-black">
         {/*This Section is to add a name for the Assistant */}
         <div className = "flex-1">
                <div>
                    <h3>
                        Name
                    </h3>
                </div>
                <div>
                    <input
                        type="text"
                        className="w-full p-2 bg-gray-100 border-black rounded-xl"
                        style={{ lineHeight: '20px' }}
                        placeholder="Enter assistants name ..."
                    />
                </div>
            </div>
            {/*This Section is to input the Instructions for the Assistant */}
            <div className = "flex-1">
                <div>
                    <h3>
                        Instructions
                    </h3>
                </div>
                <div>
                    <textarea
                        className="w-full p-2 bg-gray-100 border-black rounded-xl overflow-auto"
                        rows={6} // Specifies the initial number of lines
                        placeholder="Enter instructions for assistant ..."
                        style={{ lineHeight: '20px' }}
                    />
                </div>
             </div>
        {/* Model Section */}
        <div className="flex-1">
            <h3>Model</h3>
            <select
                value={selectedOption}
                onChange={handleDropdownChange}
                className="block w-full p-2 bg-gray-100 border-black rounded-xl mb-4"
            >
                <option value="">Chat Model</option>
                <option value="Option1">GPT 4 Turbo</option>
                <option value="Option2">GPT-4</option>
                <option value="Option3">GPT-3.5-Turbo</option>
            </select>
        </div>

        {/* Tools Section */}
        <div className="flex-1">
            <h3>Tools</h3>
            <div className="space-y-2 border border-black">
                <div className=" border border-black">
                   <label>
                    <input
                        type="radio"
                        value="Option1"
                        name="radioOption"
                        checked={selectedRadioOption === 'Option1'}
                        onChange={handleRadioChange}
                        className="mr-2"
                    />
                    Code interpreter
                </label> 
                </div>
                <div className=" border border-black">
                    <label>
                    <input
                        type="radio"
                        value="Option2"
                        name="radioOption"
                        checked={selectedRadioOption === 'Option2'}
                        onChange={handleRadioChange}
                        className="mr-2"
                    />
                    Retrieve
                </label> 
                </div>
                <div className=" border border-black">
                <label>
                    <input
                        type="radio"
                        value="Option3"
                        name="radioOption"
                        checked={selectedRadioOption === 'Option3'}
                        onChange={handleRadioChange}
                        className="mr-2"
                    />
                    Functions
                </label>
               </div>
                
            </div>
        </div>

        {/* Files Section */}
        <div className="flex-1">
            <h3>Files</h3>
            <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="mb-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">
                Add Files
            </button>
            <div className="flex flex-wrap">
                {filesList.map((file, index) => (
                    <div key={index} className="mr-2">
                        <p>{file.filename}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex justify-end p-4"> {/* Padding is added for some spacing around the edges */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Create
            </button>
        </div>
    </div>
);
}