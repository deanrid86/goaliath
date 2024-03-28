import { createAssistant } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function AssistantCreator_Bottom() {

    

return (
        <form action={createAssistant}>
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
                        id="name"
                        name="name"
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
                        id="instructions"
                        name="instructions"
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
                id="model"
                name="model"

                className="block w-full p-2 bg-gray-100 border-black rounded-xl mb-4"
            >
                <option value="">Chat Model</option>
                <option value="gpt-4-turbo-preview">GPT 4 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
            </select>
        </div>

        {/* Tools Section */}
        <div className="flex-1">
            <h3>Tools</h3>
            <div className="space-y-2 border border-black">
                <div className=" border border-black">
                   <label>
                    <input
                        id="code_interpreter"
                        name="tools"
                        type="checkbox"
                        value="code_interpreter"
                        className="mr-2"
                    />
                    Code interpreter
                </label> 
                </div>
                <div className=" border border-black">
                    <label>
                    <input
                        id="retrieval"
                        name="tools"
                        type="checkbox"
                        value="retrieval"
                        className="mr-2"
                    />
                    Retrieve
                </label> 
                </div>
                <div className=" border border-black">
                <label>
                    <input
                        id="function"
                        name="tools"
                        type="checkbox"
                        value="function"
                        className="mr-2"
                    />
                    Functions
                </label>
               </div>
                
            </div>
        </div>
        <div>
        <Button type="submit" className="bg-green-300">Create Assistant</Button>
        </div>
    </div>
    </form>
);
}