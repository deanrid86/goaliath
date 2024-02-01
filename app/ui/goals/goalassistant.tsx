import axios from 'axios';

// Function to create an assistant
const createAssistant = async () => {
  try {
    const response = await axios.post('https://api.openai.com/v1/beta/assistants', {
      name: "Lessons Assistant",
      instructions: "You are an assistant that helps with understanding and applying lessons.",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-4-1106-preview"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating assistant:", error);
  }
};

// Call the function to create the assistant
createAssistant().then(assistant => {
  console.log("Assistant created:", assistant);
});