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
      <h1>1.useState</h1>
      <p>현재 시각 : {time}</p>
      <Button color="primary" onPress={handleClick}>
        Update
      </Button>
    </>
  );
}
