export interface Todo {
  id: string;
  text: string;
  complete: boolean;
}

export interface TodoState {
  todos: Todo[];
}
