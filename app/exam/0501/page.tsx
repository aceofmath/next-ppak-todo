"use client";
import { useMemo, useState } from "react";

const hardCalculate = (number: number) => {
  console.log("어려운 계산!");
  for (let i = 0; i < 99999999; i++) {} // 생각하는 시간
  return number + 10000;
};

const easyCalculate = (number: number) => {
  console.log("쉬운 계산!");
  return number + 1;
};

export default function Exam0501() {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  // useMemo 적용 전
  // const hardSum = hardCalculate(hardNumber);

  // useMemo 적용 후
  const hardSum = useMemo(() => {
    return hardCalculate(hardNumber);
  }, [hardNumber]);
  const easySum = easyCalculate(easyNumber);

  return (
    <>
      <p className="text-2xl">5.useMemo</p>

      <h3>어려운 계산기</h3>
      <input type="number" value={hardNumber} onChange={(e) => setHardNumber(parseInt(e.target.value))} />
      <span> + 10000 = {hardSum}</span>

      <h3>쉬운 계산기</h3>
      <input type="number" value={easyNumber} onChange={(e) => setEasyNumber(parseInt(e.target.value))} />
      <span> + 1 = {easySum}</span>
    </>
  );
}
