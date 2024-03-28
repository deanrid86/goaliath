import { uploadFile } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import React from "react";
import fs from 'fs'
import OpenAI from "openai";
import { CreateAssistantFile, ListAssistantFiles, ListFiles } from "@/app/lib/assistant_functions";


const openai = new OpenAI();
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const assistant_id = "asst_cywPHDDm90MN1KLDJcHbTJWI";

export default async function Page () {

const fileList = await ListFiles ();
const fileListAssistant = await ListAssistantFiles (assistant_id);


 async function Create (formData: FormData) {
    "use server";
    const file = formData.get ("filePath") as File;
    console.log (file)
    {/*const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
 console.log ("This is an array Buffer", buffer)*/}

    const fileUpload = await openai.files.create({
        file: fs.createReadStream("@/app/dashboard/assistants/dean.txt"),
        purpose: "assistants",
      });
      console.log (fileUpload)

 }

    return (
        <div>
            <div>
                <h3>
                File Room
                </h3>
            
            </div>
            <form action = {Create}>
                <div>
                    <input type="text" name="filePath"/>
                </div>
                <Button type="submit">Upload File</Button>
            
            </form>    
            <div>
            <div className="border border-black m-2">
        <h3>File List</h3>
        {fileList.length > 0 ? fileList.map((file) => (
          <p key={file.id}><strong>Title</strong>: {file.filename} File ID: {file.id}</p>
        )) : <p>No files found.</p>}
      </div>
      <div className="border border-black m-2">
        <h3>Assistant Files List: {assistant_id}</h3>
        {fileListAssistant.length > 0 ? fileListAssistant.map((file) => (
          <p key={file.id}><strong>Title</strong>: {file.object} File ID: {file.id}</p>
        )) : <p>No files attached to assistant.</p>}
      </div>
            </div>
           
            </div>
       


    );
};