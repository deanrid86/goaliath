

import React from "react";
import { AddFile } from '@/app/lib/assistant_functions';
import { createFile } from '@/app/lib/actions';

export default function AddFileComponent () {
    return (
        <form action={createFile}>
        <div>
            <div className="flex-1">
            <h3>Files</h3>
            <input
                id="filename"
                name="filename"
                type="file"
                multiple
                className="mb-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">
                Add Files
            </button>
        </div>
        </div>
        </form>
    );

}