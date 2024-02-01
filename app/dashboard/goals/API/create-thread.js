import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('https://api.openai.com/v1/beta/threads', {}, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v1'
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({ error: 'Error creating thread' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}