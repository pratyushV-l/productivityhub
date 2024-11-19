import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    return NextResponse.json(data);
}