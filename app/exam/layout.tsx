import Link from "next/link";
export default function ExamLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <h1> ⭐😁별코딩 예제</h1>
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁React HOOK</div>
                    <div>
                        <p>내용</p>
                    </div>
                    <div>예제</div>
                </div>
                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁01.useState</div>
                    <div>
                        <p>- 구문 : const[state, setState] = useState(초기값);</p>
                        <p> - 이전 State 값 : prevState</p>
                    </div>
                    <div>
                        <Link href="/exam/0101" className="bg-sky-500 hover:bg-sky-700">
                            예제1
                        </Link>{" "}
                        <Link href="/exam/0102" className="bg-sky-500 hover:bg-sky-700">
                            예제2
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁02.useEffect</div>
                    <div>
                        <p>- 구문 : useEffect()</p>
                        <p>- 이전 State 값 : prevState</p>
                    </div>

                    <div>
                        <Link href="/exam/0201" className="bg-sky-500 hover:bg-sky-700">
                            예제1
                        </Link>{" "}
                        <Link href="/exam/0102" className="bg-sky-500 hover:bg-sky-700">
                            예제2
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁03.useRef</div>
                    <div>
                        <p>- 구문 : useRef()</p>
                        <p>- 변수관리, DOM 요소 접근</p>
                    </div>
                    <div></div>
                </div>

                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁04.useContext</div>
                    <div>
                        <p>- 구문 : useContext()</p>
                        <p>- 변수관리, DOM 요소 접근</p>
                    </div>
                    <div>- 준비중</div>
                </div>

                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁05.useMemo</div>
                    <div>
                        <p>- 구문 : useMemo()</p>
                    </div>
                    <div>
                        <Link href="/exam/0501" className="bg-sky-500 hover:bg-sky-700">
                            예제1
                        </Link>{" "}
                        <Link href="/exam/0502" className="bg-sky-500 hover:bg-sky-700">
                            예제2
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁06.useCallback</div>
                    <div>
                        <p>- 구문 : useCallback()</p>
                    </div>
                    <div>- 준비중</div>
                </div>

                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁07.useReducer</div>
                    <div>
                        <p>- 구문 : useReducer()</p>
                    </div>
                    <div>
                        <Link href="/exam/0701" className="bg-sky-500 hover:bg-sky-700">
                            예제1
                        </Link>{" "}
                        <Link href="/exam/0702" className="bg-sky-500 hover:bg-sky-700">
                            예제2
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁08.React.memo</div>
                    <div>
                        <p>- 구문 : memo</p>
                    </div>
                    <div>-준비중</div>
                </div>

                <div className="grid grid-cols-[200px_1fr_150px] border border-dotted p-0">
                    <div>🎁09.Custom Hooks</div>
                    <div>
                        <p>- 구문 : ()</p>
                    </div>
                    <div>
                        <Link href="/exam/0901" className="bg-sky-500 hover:bg-sky-700">
                            예제1
                        </Link>{" "}
                        <Link href="/exam/0902" className="bg-sky-500 hover:bg-sky-700">
                            예제2
                        </Link>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </section>
    );
}
