import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import {cache} from 'react';
import { User } from './definitions';
import { sql } from '@vercel/postgres';

 
export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})



  export async function getUser() {
    // First, verify the session and obtain the user ID from it
    const session = await verifySession();
    if (!session || !session.userId) {
        throw new Error('Unauthorized access'); // or handle this scenario as you see fit
    }

    try {
        // Fetch user details only for the logged-in user
        const data = await sql<User>` 
            SELECT users.id, users.firstname
            FROM users
            WHERE users.id = ${session.userId}
        `;

        const user = data[0];

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the user.');
    }
}
   