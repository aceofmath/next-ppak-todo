import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type Todo = {
    id: string;
    title: string;
    is_done: boolean;
    created_at: Date;
};

export type CustomModalType = "detail" | "update" | "delete";

export type focusedTodo = {
    focusedTodo: Todo | null;
    modalType: CustomModalType;
};
