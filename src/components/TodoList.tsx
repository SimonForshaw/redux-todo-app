import React from "react";
import { useAppSelector } from "../redux/hooks";
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);

  if (todos.length === 0) {
    return (
      <div className="text-center text-grey-500 py-8">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
