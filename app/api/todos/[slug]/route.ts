import { NextRequest, NextResponse } from "next/server";
import { fetchATodo, deleteATodo, editATodo } from "@/data/firestore";

//GET
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get("query");

    const fetchedTodo = await fetchATodo((await params).slug);

    if (fetchedTodo === null) {
        return new Response(null, { status: 204 });
    }

    const response = {
        message: "단일 할일 가져오기 성공",
        data: fetchedTodo,
    };
    return NextResponse.json(response, { status: 200 });
}

//DELETE
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const deletedTodo = await deleteATodo((await params).slug);

    if (deletedTodo === null) {
        return new Response(null, { status: 204 });
    }

    const response = {
        message: "단일 할일 삭제 성공!",
        data: deletedTodo,
    };
    return NextResponse.json(response, { status: 200 });
}

//UPDATE
export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { title, is_done } = await request.json();

    const editedTodo = await editATodo((await params).slug, { title, is_done });

    if (editedTodo === null) {
        return new Response(null, { status: 204 });
    }

    const response = {
        message: "단일 할일 수정 성공!",
        data: editedTodo,
    };
    return NextResponse.json(response, { status: 200 });
}
