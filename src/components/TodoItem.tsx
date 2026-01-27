import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  deleteTodo,
  updateTodo,
  toggleTodo,
} from "../redux/actions/todoActions";
import type { Todo } from "../redux/types/todo.types";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(updateTodo(todo.id, editText));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 px-3 py-1 border border-grey-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={handleToggle}
        className="w-5 h-5 cursor-pointer"
      />
      <span
        className={`flex-1 ${todo.complete ? "line-through text-gray-400" : "text-gray-800"}`}
      >
        {todo.text}
      </span>
      <button
        onClick={handleEdit}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};
