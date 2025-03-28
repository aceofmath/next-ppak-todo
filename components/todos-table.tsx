"use client";

import { Todo } from "@/types";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodosTables({ todos }: { todos: Todo[] }) {
    //할일 추가 가능 여부
    const [todoAddEnable, setTodoAddEnable] = useState(false);

    //입력된 할일
    const [newTodoInput, setNewTodoInput] = useState("");

    const router = useRouter();

    const TodoRow = (aTodo: Todo) => {
        return (
            <TableRow key={aTodo.id}>
                <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
                <TableCell>{aTodo.title}</TableCell>
                <TableCell>{aTodo.is_done ? "✅" : "❓"}</TableCell>
                <TableCell>{`${aTodo.created_at}`}</TableCell>
            </TableRow>
        );
    };

    const addATodoHandler = async (title: string) => {
        console.log("title", title);
        if (!todoAddEnable) {
            return;
        }

        console.log("addATodoHandler called");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: "POST",
            body: JSON.stringify({
                title: title,
            }),
            cache: "no-store",
        });
        router.refresh();
        console.log(`할일 추가 완료 : ${newTodoInput}`);
    };

    const DisabledTodoAddButton = () => {
        return (
            <Popover placement="top">
                <PopoverTrigger>
                    <Button color="default" className="h-14">
                        추가
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className="text-small font-bold">🦉</div>
                        <div className="text-tiny">할일을 입력해주세요!</div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    };
    return (
        <>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                    label="새로운 할일"
                    type="text"
                    value={newTodoInput}
                    onValueChange={(changedInput) => {
                        setNewTodoInput(changedInput);
                        setTodoAddEnable(changedInput.length > 0);
                    }}
                />
                {todoAddEnable ? (
                    <Button
                        color="warning"
                        className="h-14"
                        onPress={async () => {
                            await addATodoHandler(newTodoInput);
                        }}
                    >
                        추가
                    </Button>
                ) : (
                    DisabledTodoAddButton()
                )}
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>아이디</TableColumn>
                    <TableColumn>할일내용</TableColumn>
                    <TableColumn>완료여부</TableColumn>
                    <TableColumn>생성일</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"조회된 데이터가 없습니다."}>{todos && todos.map((aTodo: Todo) => TodoRow(aTodo))}</TableBody>
            </Table>
        </>
    );
}
