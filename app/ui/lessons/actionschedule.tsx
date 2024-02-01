import React, { useState } from 'react';
import OpenAI from 'openai';
import { fetchLessons } from '@/app/lib/data';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const GoaltoChat = () => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: apiKey, // Replace with your actual API key
    dangerouslyAllowBrowser: true
  });

  const fetchAdvice = async () => {
    setIsLoading(true);
    try {
      const lessons = await fetchLessons();
      const latestLesson = lessons[0]; // Assuming the first one is the latest

      if (!latestLesson) {
        throw new Error('No lessons available');
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are my personal life coach designed to help me maximise my ability to meet goals and learn and intergrate lessons." },
          { role: "system", content: `Create 10 activities I can do today that help me ${latestLesson.lesson}. The lesson was taken from ${latestLesson.lessonauthor}` },
        ],
      });

      const result = completion.choices[0]?.message?.content || "";
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to fetch advice.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchAdvice} disabled={isLoading} className='text-white'>
        {isLoading ? 'Loading...' : 'Get Advice'}
      </button>
      {response && <p className='text-black bg-white'>{response}</p>}
    </div>
  );
};

export default GoaltoChat;