import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const response = {
        message: "호호호",
        data: "aceofmath",
    };
    return NextResponse.json(response, { status: 200 });
}
