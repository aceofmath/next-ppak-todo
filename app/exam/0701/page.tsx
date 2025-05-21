"use client";
import { Button } from "@heroui/button";
import { useEffect, useReducer, useState } from "react";

// reducer : state를 업데이트 하는 역할(은행)
// dispatch : state 업데이트를 위한 요구
// action : 요구의 내용

const ACTION_TYPES = {
    deposite: "deposite",
    withdraw: "withdraw",
};

const reducer = (state: number, action: any) => {
    console.log("reduce가 일을 합니다.", state, action);
    switch (action.type) {
        case ACTION_TYPES.deposite:
            return state + action.payload;
        case ACTION_TYPES.withdraw:
            return state - action.payload;
        default:
            return state;
    }
};

export default function Exam0701() {
    const [number, setNumber] = useState(0);
    const [money, dispatch] = useReducer(reducer, 0);

    return (
        <>
            <p className="text-2xl">7.useReducer</p>
            <h2>useReducer 은행에 오신것을 환영합니다.</h2>
            <p>잔고 : {money}</p>
            <div className="flex">
                <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} step="1000" />
                <br />
                <Button
                    color="primary"
                    onPress={() => {
                        dispatch({ type: ACTION_TYPES.deposite, payload: number });
                    }}
                >
                    예금
                </Button>
                <Button
                    color="danger"
                    onPress={() => {
                        dispatch({ type: ACTION_TYPES.withdraw, payload: number });
                    }}
                >
                    출금
                </Button>
            </div>
        </>
    );
}
