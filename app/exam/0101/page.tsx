"use client";
import { Button } from "@heroui/button";
import { useState } from "react";

export default function Exam0101() {
    const [time, setTime] = useState(1);

    const handleClick = () => {
        let newTime;
        if (time >= 12) {
            newTime = 1;
        } else {
            newTime = time + 1;
        }
        setTime(newTime);
    };

    return (
        <>
            <p className="text-2xl">1.useState</p>
            <p>현재 시각 : {time}</p>
            <Button color="primary" onPress={handleClick}>
                Update
            </Button>
        </>
    );
}
