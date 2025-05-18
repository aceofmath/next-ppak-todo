"use client";

import { Button } from "@heroui/button";
import { ACTION_TYPES } from "@/components/primitives";

export const Student = ({ name, dispatch, id, isHere }: { name: string; dispatch: any; id: string; isHere: boolean }) => {
  return (
    <div>
      <span
        style={{
          textDecoration: isHere ? "line-through" : "none",
          color: isHere ? "red" : "white",
        }}
        onClick={() => {
          dispatch({ type: ACTION_TYPES.chk, payload: { id } });
        }}
      >
        {name}
      </span>
      <Button
        size="sm"
        className="ml-2"
        onPress={() => {
          dispatch({ type: ACTION_TYPES.del, payload: { id } });
        }}
      >
        삭제
      </Button>
    </div>
  );
};
