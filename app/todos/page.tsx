import { title } from "@/components/primitives";
import TodosTables from "@/components/todos-table";
import { fetchTodos } from "@/data/firestore";

async function fetchTodosApiCall() {
  console.log("fetchTodosApiCall called");
  const res = await fetch(`${process.env.BASE_URL}/api/todos`, {
    cache: "no-cache",
  });
  const contentTypeHeaderValue = res.headers.get("Content-Type");
  //text/html;
  if (contentTypeHeaderValue?.includes("text/html")) {
    console.log("fetchTodosApiCall / contentTypeHeaderValue : ", contentTypeHeaderValue);
    return null;
  }

  return res.json();
}

export default async function TodosPage() {
  const response = await fetchTodosApiCall();

  const fechedTodos = response?.data ?? [];
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      <TodosTables todos={fechedTodos} />
    </div>
  );
}
