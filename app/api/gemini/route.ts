// app/api/gemini/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      console.error('No message provided.');
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('API Key is missing.');
      return NextResponse.json({ error: 'API key is not configured.' }, { status: 500 });
    }

    // Construct the payload
    const payload = {
      contents: [{
        parts: [{ text: message }]
      }]
    };

    console.log('Sending request to Google Generative AI API with payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Received response status:', response.status);

    const responseData = await response.json();
    console.log('Received response data:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      console.error('API Error Details:', responseData);
      return NextResponse.json({ error: 'Failed to fetch from Gemini API.', details: responseData }, { status: response.status });
    }

    // Updated extraction based on the response structure
    const reply = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
    console.log('Generated reply:', reply);

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error('Handler Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}