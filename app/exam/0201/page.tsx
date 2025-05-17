"use client";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";

export default function Exam0201() {
  const [count, setCount] = useState(1);

  const handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {});

  return (
    <>
      <p className="text-2xl">2.useEffect</p>
      <p>Count : {count}</p>
      <Button color="primary" onPress={handleClick}>
        Update
      </Button>
    </>
  );
}
