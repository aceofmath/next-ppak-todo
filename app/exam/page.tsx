import { title } from "@/components/primitives";
import Link from "next/link";

export default async function Exam() {
  return (
    <>
      <h1>😁별코딩 예제</h1>
      <h2>🎁01.useState</h2>
      <div className="my-4">
        <h3>- 구문 : const[state, setState] = useState(초기값);</h3>
        <h3>- 이전 State 값 : prevState</h3>

        <h5>
          <Link href="/exam/0101">예제1</Link> <Link href="/exam/0102">예제2</Link>
        </h5>
      </div>
      <h2>🎁02.useEffect</h2>
      <div className="my-4">
        <h3>- 구문 : useEffect()</h3>
        <h3>- 이전 State 값 : prevState</h3>

        <h5>
          <Link href="/exam/0201">예제1</Link> <Link href="/exam/0102">예제2</Link>
        </h5>
      </div>
    </>
  );
}
