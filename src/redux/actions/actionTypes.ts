export const ADD_TODO = "ADD_TODO" as const;
export const DELETE_TODO = "DELETE_TODO" as const;
export const UPDATE_TODO = "UPDATE_TODO" as const;
export const TOGGLE_TODO = "TOGGLE_TODO" as const;

export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: {
    text: string;
  };
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: {
    id: string;
  };
}

export interface UpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: {
    id: string;
    text: string;
  };
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: {
    id: string;
  };
}

export type TodoActionTypes =
  | AddTodoAction
  | DeleteTodoAction
  | UpdateTodoAction
  | ToggleTodoAction;
