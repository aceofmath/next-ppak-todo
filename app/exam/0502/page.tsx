"use client";
import { Button } from "@heroui/button";
import { useEffect, useMemo, useState } from "react";

export default function Exam0502() {
  const [number, setNumber] = useState(1);
  const [isKorea, setIsKorea] = useState(true);

  // useMemo 적용 전(원시타입)
  // const location = isKorea ? "한국" : "외국";

  // useMemo 적용 전(객체타입)
  // const location = {
  //   country: isKorea ? "한국" : "외국",
  // };

  // useMemo 적용 후(객체타입을 메모이제이션 시키기)
  const location = useMemo(() => {
    return {
      country: isKorea ? "한국" : "외국",
    };
  }, [isKorea]);

  useEffect(() => {
    console.log("useEffect 호출!");
  }, [location]);

  return (
    <>
      <p className="text-2xl">5.useMemo (2)</p>

      <h2>하루에 몇 끼 먹어요?</h2>
      <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} />
      <hr />

      <h2>내가 있는 나라는?</h2>
      <p>나라: {location.country}</p>
      <Button size="sm" color="secondary" onPress={() => setIsKorea(!isKorea)}>
        Update
      </Button>
    </>
  );
}
