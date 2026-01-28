import { ADD_TODO, DELETE_TODO, UPDATE_TODO, TOGGLE_TODO } from "./actionTypes";
import type {
  AddTodoAction,
  DeleteTodoAction,
  UpdateTodoAction,
  ToggleTodoAction,
} from "./actionTypes";

export const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: { text },
});

export const deleteTodo = (id: string): DeleteTodoAction => ({
  type: DELETE_TODO,
  payload: { id },
});

export const updateTodo = (id: string, text: string): UpdateTodoAction => ({
  type: UPDATE_TODO,
  payload: { id, text },
});

export const toggleTodo = (id: string): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: { id },
});
