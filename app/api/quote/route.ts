import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://api.quotable.io/random");
        if (!res.ok) {
            throw new Error(`Failed to fetch quote. Status: ${res.status}`);
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching the quote:", error.message, error.stack);
        } else {
            console.error("Error fetching the quote:", error);
        }
        return NextResponse.error();
    }
}