"use client";
import { Student } from "@/components/Student";
import { Button } from "@heroui/button";
import { initializeTraceState } from "next/dist/trace";
import { useEffect, useReducer, useState } from "react";

// reducer : state를 업데이트 하는 역할(은행)
// dispatch : state 업데이트를 위한 요구
// action : 요구의 내용

export const ACTION_TYPES = {
  add: "add",
  del: "del",
  chk: "chk",
};

type studentsInfo = {
  count: number;
  students: any;
};

const initialState = {
  count: 0,
  students: [],
};

const reducer = (state: studentsInfo, action: any) => {
  console.log("reduce가 일을 합니다.", state, action);
  switch (action.type) {
    case ACTION_TYPES.add:
      const name = action.payload.name;
      const NewStudent = {
        id: new Date().toString(),
        name,
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, NewStudent],
      };
    case ACTION_TYPES.del:
      return {
        count: state.count - 1,
        students: state.students.filter((student: any) => student.id != action.payload.id),
      };
    case ACTION_TYPES.chk:
      return {
        count: state.count,
        students: state.students.map((student: any) => {
          if (student.id === action.payload.id) {
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }),
      };
    default:
      return state;
  }
};

export default function Exam0702() {
  const [name, setName] = useState("");
  const [studentsInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p className="text-2xl">7.useReducer(2)</p>
      <h1>출석부</h1>
      <p>총 학생 수 : {studentsInfo.count}</p>
      <input type="text" placeholder="이름을 입력해주세요" value={name} onChange={(e) => setName(e.target.value)} />
      <Button
        color="primary"
        size="sm"
        onPress={() => {
          dispatch({ type: ACTION_TYPES.add, payload: { name } });
        }}
      >
        추가
      </Button>
      <br />
      <hr />
      {studentsInfo.students.map((student: any) => {
        return <Student key={student.id} name={student.name} dispatch={dispatch} id={student.id} isHere={student.isHere} />;
      })}
    </>
  );
}
