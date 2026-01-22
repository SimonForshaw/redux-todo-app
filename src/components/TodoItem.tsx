import { use, useState } from "react";
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

  if (isEditing) {
    return (
      <div>
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
      </div>
    );
  }
};
