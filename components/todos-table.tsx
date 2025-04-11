"use client";

import { CustomModalType, focusedTodo, Todo } from "@/types";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { DatePicker } from "@heroui/date-picker";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { VerticalDotsIcon } from "./icons";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { CustomModal } from "./custom-modal";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function TodosTables({ todos }: { todos: Todo[] }) {
    //할일 추가 가능 여부
    const [todoAddEnable, setTodoAddEnable] = useState(false);

    //입력된 할일
    const [newTodoInput, setNewTodoInput] = useState("");

    //로딩상태
    const [isLoading, setIsLoading] = useState(false);

    // 오픈 모달 상태
    const [currentModalData, setCurrentModalData] = useState<focusedTodo>({
        focusedTodo: null,
        modalType: "detail" as CustomModalType,
    });

    const router = useRouter();

    const applyIsDoneUI = (isDone: boolean) => (isDone ? "line-through text-gray-900/50 dark: text-white/40" : "");

    const TodoRow = (aTodo: Todo) => {
        return (
            <TableRow key={aTodo.id}>
                <TableCell className={applyIsDoneUI(aTodo.is_done)}>{aTodo.id.slice(0, 4)}</TableCell>
                <TableCell className={applyIsDoneUI(aTodo.is_done)}>{aTodo.title}</TableCell>
                <TableCell>{aTodo.is_done ? "✅" : "❓"}</TableCell>
                <TableCell className={applyIsDoneUI(aTodo.is_done)}>{`${aTodo.created_at.toString().split("T")[0]}`}</TableCell>
                <TableCell className={applyIsDoneUI(aTodo.is_done)}>{`${aTodo.created_at.toString().split("T")[0]}`}</TableCell>
                <TableCell className={applyIsDoneUI(aTodo.is_done)}>{`${aTodo.created_at.toString().split("T")[1].slice(0, 8)}`}</TableCell>
                <TableCell>
                    <div className="relative flex justify-center items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                onAction={(key) => {
                                    console.log(`aTodo.id : ${aTodo.id}, key : ${key}`);
                                    setCurrentModalData({ focusedTodo: aTodo, modalType: key as CustomModalType });
                                    onOpen();
                                }}
                            >
                                <DropdownItem key="detail">상세보기</DropdownItem>
                                <DropdownItem key="update">수정</DropdownItem>
                                <DropdownItem key="delete">삭제</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </TableCell>
            </TableRow>
        );
    };

    const addATodoHandler = async (title: string) => {
        console.log("title", title);
        if (!todoAddEnable) {
            return;
        }

        setTodoAddEnable(false);
        setIsLoading(true);
        // setTimeout(() => {
        //   console.log("....");
        // }, 5000);
        await new Promise((f) => setTimeout(f, 600));

        console.log("addATodoHandler called");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: "POST",
            body: JSON.stringify({
                title: title,
            }),
            cache: "no-store",
        });

        setNewTodoInput("");
        router.refresh();
        setIsLoading(false);
        notifySuccessEvent("할일 추가 되었습니다.");
        console.log(`할일 추가 완료 : ${newTodoInput}`);
    };

    const editATodoHandler = async (id: string, editedTitle: string, editedIsDone: boolean) => {
        setIsLoading(true);
        // setTimeout(() => {
        //   console.log("....");
        // }, 5000);
        await new Promise((f) => setTimeout(f, 600));

        console.log("editATodoHandler called");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method: "POST",
            body: JSON.stringify({
                title: editedTitle,
                is_done: editedIsDone,
            }),
            cache: "no-store",
        });

        router.refresh();
        setIsLoading(false);
        notifySuccessEvent("할일 수정 되었습니다.");
        console.log(`할일 수정 완료 : ${newTodoInput}`);
    };

    const deleteATodoHandler = async (id: string) => {
        setIsLoading(true);
        // setTimeout(() => {
        //   console.log("....");
        // }, 5000);
        await new Promise((f) => setTimeout(f, 600));

        console.log("deleteATodoHandler called");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method: "DELETE",
            cache: "no-store",
        });

        router.refresh();
        setIsLoading(false);
        notifySuccessEvent("할일이 삭제 되었습니다.");
        console.log(`할일 삭제 완료 : ${newTodoInput}`);
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
    const notifySuccessEvent = (msg: string) => toast.success(msg);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const ModalComponent = () => {
        return (
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) =>
                        currentModalData.focusedTodo && (
                            <CustomModal
                                focusedTodo={currentModalData.focusedTodo}
                                modalType={currentModalData.modalType}
                                onClose={onClose}
                                onEdit={async (id, title, isDone) => {
                                    console.log(id, title, isDone);
                                    await editATodoHandler(id, title, isDone);
                                    onClose();
                                }}
                                onDelete={async (id) => {
                                    console.log(id);
                                    await deleteATodoHandler(id);
                                    onClose();
                                }}
                            />
                        )
                    }
                </ModalContent>
            </Modal>
        );
    };

    return (
        <div className="flex flex-col space-y-2">
            <ModalComponent />
            <div>
                <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            </div>
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
                    <>
                        <DatePicker className="max-w-[284px]" defaultValue={today(getLocalTimeZone())} label="예정일자" />
                        <Button
                            color="warning"
                            className="h-14"
                            onPress={async () => {
                                await addATodoHandler(newTodoInput);
                            }}
                        >
                            추가
                        </Button>
                    </>
                ) : (
                    DisabledTodoAddButton()
                )}
            </div>
            <div className="h-2">{isLoading && <Spinner size="sm" color="warning" />}</div>

            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn className="w-14">아이디</TableColumn>
                    <TableColumn className="min-w-60">할일내용</TableColumn>
                    <TableColumn className="w-18">완료여부</TableColumn>
                    <TableColumn className="w-18">완료일</TableColumn>
                    <TableColumn className="w-18">생성일</TableColumn>
                    <TableColumn className="w-14">생성시간</TableColumn>
                    <TableColumn className="grid place-items-center">기능</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"조회된 데이터가 없습니다."}>{todos && todos.map((aTodo: Todo) => TodoRow(aTodo))}</TableBody>
            </Table>
        </div>
    );
}
