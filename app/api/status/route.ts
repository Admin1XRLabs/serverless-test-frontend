import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { error: 'Missing id parameter' },
            { status: 400 }
        );
    }

    const apiKey = process.env.RUNPOD_API_KEY;
    const serverlessId = process.env.RUNPOD_SERVERLESS_ID;

    if (!apiKey || !serverlessId) {
        return NextResponse.json(
            { error: 'Server configuration error: Missing API Key or Serverless ID' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(`https://api.runpod.ai/v2/${serverlessId}/status/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error in /api/status:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
