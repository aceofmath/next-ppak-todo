"use client";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { CustomModalType, focusedTodo, Todo } from "@/types";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { useEffect, useState } from "react";
import { CircularProgress } from "@heroui/progress";

export const CustomModal = ({ focusedTodo, modalType, onClose, onEdit, onDelete }: { focusedTodo: Todo; modalType: CustomModalType; onClose: () => void; onEdit: (id: string, title: string, isDone: boolean) => void; onDelete: (id: string) => void }) => {
    // 수정된 선택(완료여부)
    const [isDone, setIsDone] = useState<boolean>(focusedTodo.is_done);

    // 수정된 선택(할일내용)
    const [editedTodoInput, setEditedTodoInput] = useState<string>(focusedTodo.title);
    // const [editedTodoInput, setEditedTodoInput] = useState<string>("");

    // useEffect(() => {
    //     setEditedTodoInput(focusedTodo.title);
    // }, []);

    // 로딩 상태
    const [isBLoading, setIsBLoading] = useState<boolean>(false);

    const DetailModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">할일 상세</ModalHeader>
                <ModalBody>
                    <p>
                        <span className="font-bold">ID : {focusedTodo.id}</span>
                    </p>
                    <p>
                        <span className="font-bold">할일 내용 : {focusedTodo.title}</span>
                    </p>
                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">완료여부 : </span>
                        <p>{focusedTodo.is_done ? "완료" : "미완료"}</p>
                    </div>
                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">작성일 : </span>
                        <p>{`${focusedTodo.created_at}`}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" onPress={onClose}>
                        닫기
                    </Button>
                </ModalFooter>
            </>
        );
    };

    const EditModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
                <ModalBody>
                    <p>
                        <span className="font-bold">ID : {focusedTodo.id}</span>
                    </p>
                    <Input label="할일내용" placeholder="할일을 입력해주세요" variant="bordered" isRequired defaultValue={focusedTodo.title} value={editedTodoInput} onValueChange={setEditedTodoInput} />
                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">완료여부 : </span>
                        <Switch color="warning" defaultSelected={focusedTodo.is_done} onValueChange={setIsDone} aria-label="Automatic updates" />
                        <p>{isDone ? "완료" : "미완료"}</p>
                    </div>
                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">작성일 : </span>
                        <p>{`${focusedTodo.created_at}`}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="warning"
                        variant="flat"
                        onPress={() => {
                            setIsBLoading(true);
                            onEdit(focusedTodo.id, editedTodoInput, isDone);
                            onClose();
                        }}
                    >
                        {isBLoading ? <CircularProgress aria-label="Loading..." color="warning" /> : "수정"}
                    </Button>
                    <Button color="default" onPress={onClose}>
                        닫기
                    </Button>
                </ModalFooter>
            </>
        );
    };

    const DeleteModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">할일 삭제</ModalHeader>
                <ModalBody>
                    <p>
                        <span className="font-bold">ID : {focusedTodo.id}</span>
                    </p>
                    <p>
                        <span className="font-bold">할일 내용 : {focusedTodo.title}</span>
                    </p>
                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">완료여부 : </span>
                        <p>{focusedTodo.is_done ? "완료" : "미완료"}</p>
                    </div>
                    <div className="flex py-2 space-x-4">
                        <span className="font-bold">작성일 : </span>
                        <p>{`${focusedTodo.created_at}`}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                            setIsBLoading(true);
                            onDelete(focusedTodo.id);
                            onClose();
                        }}
                    >
                        {isBLoading ? <CircularProgress aria-label="Loading..." color="danger" /> : "삭제"}
                    </Button>
                    <Button color="default" onPress={onClose}>
                        닫기
                    </Button>
                </ModalFooter>
            </>
        );
    };

    const getModal = (type: CustomModalType) => {
        switch (type) {
            case "detail":
                return DetailModal();
            case "update":
                return EditModal();
            case "delete":
                return DeleteModal();
            default:
                break;
        }
    };

    return <>{getModal(modalType)}</>;
};
