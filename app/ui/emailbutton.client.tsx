import React, { useState } from 'react';

// Define a type for your content prop if using TypeScript
interface EmailContent {
  subject: string;
  body: string;
}

// Update the component to accept props
interface EmailButtonProps {
  content: EmailContent;
}

// Use the props in your component
export default function EmailButton({ content }: EmailButtonProps) {
  const [emailStatus, setEmailStatus] = useState('');
  
  const handleSendEmail = async () => {
    // Use the content prop instead of a hardcoded string
    const emailBody = `Subject: ${content.subject}\n\n${content.body}`;

    // Make a POST request to your API route
    const response = await fetch('app/dashboard/todaysactions/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: emailBody }),
    });

    const data = await response.json();

    if (data.success) {
      setEmailStatus('Email sent successfully.');
    } else {
      setEmailStatus(`Failed to send email: ${data.error}`);
    }
  };

  return (
    <div>
      <button onClick={handleSendEmail}>Send Email</button>
      {emailStatus && <p>{emailStatus}</p>}
    </div>
  );
}
