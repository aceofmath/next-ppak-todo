"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";

const heavyWork = () => {
  console.log("엄청 무거운 작업!!!!");
  return ["홍길동", "김민수"];
};

export default function Exam0102() {
  const [names, setNames] = useState(heavyWork);
  const [input, setInput] = useState("");

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleUpload = () => {
    setNames((prevState) => {
      console.log("이전 state : ", prevState);
      return [input, ...prevState];
    });
  };

  return (
    <div>
      <h1>1.useState-2</h1>
      <Input type="text" value={input} onChange={handleInputChange} />
      <Button color="primary" onPress={handleUpload}>
        Upload
      </Button>

      <hr className="my-4" />
      {names.map((name, idx) => {
        return <p key={idx}>{name}</p>;
      })}
    </div>
  );
}
