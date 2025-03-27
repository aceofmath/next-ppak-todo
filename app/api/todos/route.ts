import { NextRequest, NextResponse } from "next/server";
import dummytodos from "@/data/dummy.json";

//READ
export async function GET(request: NextRequest) {
    const response = {
        message: "todos 몽땅 가져오기",
        data: dummytodos,
    };
    return NextResponse.json(response, { status: 200 });
}

//INSERT
export async function POST(request: NextRequest) {
    const { title } = await request.json();

    const newTodo = {
        id: "10",
        title,
        is_done: false,
    };

    const response = {
        message: "할일 추가 성공!",
        data: newTodo,
    };
    return NextResponse.json(response, { status: 201 });
}
