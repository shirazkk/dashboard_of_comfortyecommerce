import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const myEmail = process.env.EMAIL;
    const myPassword = process.env.PASSWORD;

    // Check credentials
    if (email === myEmail && password === myPassword) {
        // Authentication successful
        return NextResponse.json({ success: true }, { status: 200 });
    } else {
        // Invalid credentials
        return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }
}
