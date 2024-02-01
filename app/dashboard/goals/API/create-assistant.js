import axios from 'axios';

export const createAssistant = async () => {
    try {
        const response = await axios.post('https://api.openai.com/v1/beta/assistants', {
            name: "Goal Assistant",
            instructions: "You are my personal life coach and goal scheduler.",
            tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
            model: "gpt-4-1106-preview"
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'OpenAI-Beta': 'assistants=v1'
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating goal assistant:", error);
        // Additional error details can be added here for more specific error handling
        let errorMessage = "Failed to create assistant";
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Error data:", error.response.data);
            console.error("Error status:", error.response.status);
            errorMessage = error.response.data.error || error.response.statusText;
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Error request:", error.request);
            errorMessage = "No response received from server";
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", error.message);
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
};