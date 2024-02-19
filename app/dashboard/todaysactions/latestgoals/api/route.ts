// pages/api/latestGoalStep.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { GoalPlannerStep } from '@/app/lib/definitions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await sql<GoalPlannerStep>`
        SELECT goalplannerspecific.specificuniqueid, goalplannerspecific.specificgoalresult
        FROM goalplannerspecific
        LIMIT 1`;
  
      // Log the raw data response from the query
      console.log("Raw data response:", data);
  
      const latestGoalStep = data.rows.map((step) => ({
        ...step,
      }));
  
      // Log the processed data that will be returned
      console.log("Processed latestGoalStep:", latestGoalStep);
  
      return latestGoalStep;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest goal step.');
    }
  }