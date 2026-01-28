# Redux + TypeScript To-Do App - Complete Learning Checklist

## Phase 1: Project Setup & Installation

### 1 Create Fresh TypeScript Project

### 1.1 Create GitHub Repository

- [x] Go to GitHub and create a new repository (name it something like `redux-todo-app`)
- [x] Clone the repository to your local machine: `git clone <your-repo-url>`
- [x] Navigate into the project folder: `cd redux-todo-app`

### 1.2 Initialize Vite + React Project

- [x] Run: `npm create vite@latest . -- --template react-ts`
  - The `-ts` suffix gives you TypeScript instead of JavaScript
  - This creates `.tsx` files instead of `.jsx`
- [x] Select "Ignore files and continue" when prompted
- [x] Select "No" for rolldown (experimental)
- [x] Install dependencies: `npm install`
- [x] Test the setup: `npm run dev` (you should see the default Vite + React page)
- [x] Stop the server (Ctrl+C)

### 1.3 Install Redux Dependencies

- [x] Install Redux core and React-Redux bindings: `npm install redux react-redux`
- [x] Install TypeScript types for React-Redux: `npm install --save-dev @types/react-redux`
  - **Why?** TypeScript needs type definitions to understand Redux's API
  - These provide autocomplete and type checking for Redux hooks

### 1.4 Install and Configure Tailwind CSS - [Tailwind CSS Docs](https://tailwindcss.com/docs/installation/using-vite)

- [x] Install Tailwind: `npm install -D tailwindcss postcss autoprefixer`
- [x] Initialize Tailwind: `node node_modules/tailwindcss/lib/cli.js init -p`
  - This creates `tailwind.config.js` and `postcss.config.js`
- [x] Open `tailwind.config.js` and replace the `content` array with:
  ```js
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
  ```
- [x] Open `src/index.css` and replace everything with:

  ```css
  @import "tailwindcss";
  ```

  npm install -D tailwindcss@next

- [x] Test Tailwind: Add `className="text-blue-500 text-2xl"` to something in `App.tsx` and verify it works

### 1.5 Clean Up Project Structure

- [x] Delete `src/App.css` (using Tailwind instead)
- [x] Clean out default content in `src/App.tsx` (keep just the basic component)
- [x] Commit: `git add .` then `git commit -m "Initial TypeScript setup with Vite, React, Redux, and Tailwind"`

---

## Phase 2: TypeScript Fundamentals (Quick Primer)

**Before diving into Redux, let's review key TypeScript concepts you'll use:**

### 2.1 Types vs Interfaces

```typescript
// TYPE - good for primitives, unions, and simple objects
type ID = string | number;
type Status = "active" | "completed" | "deleted";

// INTERFACE - good for object shapes, especially when extending
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
```

**Rule of thumb:** Use `interface` for objects, `type` for everything else

### 2.2 Generics (The `<T>` syntax)

Generics let you create reusable type-safe code:

```typescript
// Without generics - not reusable
function getFirstString(arr: string[]): string {
  return arr[0];
}

// With generics - works for any type
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// Usage
const firstNumber = getFirst<number>([1, 2, 3]); // returns number
const firstString = getFirst<string>(["a", "b"]); // returns string
```

**You'll see this in Redux:** `useSelector<RootState, Todo[]>` means "selector that reads from RootState and returns Todo[]"

### 2.3 Type Assertions

Sometimes you know more than TypeScript:

```typescript
const myElement = document.getElementById("root") as HTMLElement;
// "as HTMLElement" tells TS "trust me, this will be an HTMLElement"
```

---

## Phase 3: Understanding Redux + TypeScript Architecture

**Redux Flow:** Action → Reducer → Store → Component (via selector) → Dispatch Action (cycle repeats)

**TypeScript adds type safety to each step:**

- **Actions:** Typed objects with strict shape
- **Reducers:** Typed functions with state and action types
- **Store:** Knows the exact shape of your state
- **Hooks:** Type-safe useSelector and useDispatch

---

## Phase 4: Set Up Redux with TypeScript

### 4.1 Create Folder Structure

- [x] Create these folders in `src/`:
  - `src/redux/`
  - `src/redux/actions/`
  - `src/redux/reducers/`
  - `src/redux/types/` ← **NEW: TypeScript types**
  - `src/components/`

### 4.2 Define TypeScript Types for Your Todo

- [x] Create file: `src/redux/types/todo.types.ts`
- [x] Define the Todo interface:

  ```typescript
  export interface Todo {
    id: string;
    text: string;
    completed: boolean;
  }
  ```

  **Why interface?** It describes the shape of an object (your todo)

- [x] Define the state type:
  ```typescript
  export interface TodoState {
    todos: Todo[];
  }
  ```
  **Why?** Redux store needs to know what shape your state has

### 4.3 Define Action Types (Constants + TypeScript Types)

- [x] Create file: `src/redux/actions/actionTypes.ts`
- [x] Define action type constants:
  ```typescript
  export const ADD_TODO = "ADD_TODO" as const;
  export const DELETE_TODO = "DELETE_TODO" as const;
  export const UPDATE_TODO = "UPDATE_TODO" as const;
  export const TOGGLE_TODO = "TOGGLE_TODO" as const;
  ```
  **What is `as const`?** It makes TypeScript treat these as literal types, not just strings. `'ADD_TODO'` instead of `string`.

### 4.4 Define Action Payload Types

- [x] In the same file (`actionTypes.ts`), add:

  ```typescript
  import { Todo } from "../types/todo.types";

  // Each action has a specific shape
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

  // Union type: an action can be ANY of these
  export type TodoActionTypes =
    | AddTodoAction
    | DeleteTodoAction
    | UpdateTodoAction
    | ToggleTodoAction;
  ```

**Understanding this:**

- Each interface describes one action's exact shape
- `typeof ADD_TODO` means the literal string 'ADD_TODO', not any string
- `TodoActionTypes` is a **union type** - an action must be one of these four types
- This gives you autocomplete and catches typos!

### 4.5 Create Type-Safe Action Creators

- [x] Create file: `src/redux/actions/todoActions.ts`
- [x] Write typed action creators:

  ```typescript
  import {
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO,
    TOGGLE_TODO,
  } from "./actionTypes";

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
  ```

**TypeScript benefits here:**

- Return types ensure each function returns the correct action shape
- Parameters are typed (can't pass number where string is expected)
- If you forget a property, TypeScript will error

### 4.6 Create the Typed Reducer

- [x] Create file: `src/redux/reducers/todoReducer.ts`
- [x] Import types and create reducer:

  ```typescript
  import type { TodoState } from "../types/todo.types";
  import type { TodoActionTypes } from "../actions/actionTypes";
  import {
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO,
    TOGGLE_TODO,
  } from "../actions/actionTypes";

  // Initial state with explicit type
  const initialState: TodoState = {
    todos: [],
  };

  // Reducer function with typed parameters and return
  export const todoReducer = (
    state: TodoState = initialState,
    action: TodoActionTypes,
  ): TodoState => {
    switch (action.type) {
      case ADD_TODO:
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text: action.payload.text,
              completed: false,
            },
          ],
        };

      case DELETE_TODO:
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        };

      case UPDATE_TODO:
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, text: action.payload.text }
              : todo,
          ),
        };

      case TOGGLE_TODO:
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        };

      default:
        return state;
    }
  };
  ```

**TypeScript magic here:**

- Inside each `case`, TypeScript **narrows** the action type
- In `case ADD_TODO:`, TS knows `action.payload.text` exists
- If you try to access `action.payload.id` in ADD_TODO case, TS errors!
- Return type `TodoState` ensures you always return valid state

### 4.7 Create the Redux Store with Types

- [x] Create file: `src/redux/store.ts`
- [x] Set up store and export types:

  ```typescript
  import { createStore } from "redux";
  import { todoReducer } from "./reducers/todoReducer";

  // Create the store
  export const store = createStore(todoReducer);

  // Export RootState type - this is CRUCIAL for TypeScript
  export type RootState = ReturnType<typeof store.getState>;
  // RootState will be: { todos: Todo[] }

  // Export AppDispatch type - used for typed dispatch
  export type AppDispatch = typeof store.dispatch;
  ```

**Understanding these exports:**

- `RootState`: The shape of your entire Redux state
- `ReturnType<typeof store.getState>`: TypeScript utility that infers the return type of getState
- `AppDispatch`: The type of your dispatch function
- **You'll use these types in your components!**

---

## Phase 5: Connect Redux to React with TypeScript

### 5.1 Provide Store to App

- [x] Open `src/main.tsx`
- [x] Import Provider and store:
  ```typescript
  import { Provider } from "react-redux";
  import { store } from "./redux/store";
  ```
- [x] Wrap App with Provider:
  ```typescript
  <Provider store={store}>
    <App />
  </Provider>
  ```

### 5.2 Create Typed Redux Hooks (IMPORTANT!)

- [x] Create file: `src/redux/hooks.ts`
- [x] Create typed versions of useSelector and useDispatch:

  ```typescript
  import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
  } from "react-redux";
  import type { RootState, AppDispatch } from "./store";

  // Typed useDispatch hook
  export const useAppDispatch = () => useDispatch<AppDispatch>();

  // Typed useSelector hook
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  ```

**Why create these?**

- **Without types:** `useSelector(state => state.todos)` - `state` is `any`, no autocomplete
- **With types:** `useAppSelector(state => state.todos)` - `state` is `RootState`, full autocomplete!
- Always use `useAppDispatch` and `useAppSelector` instead of the plain hooks

---

## Phase 6: Build Typed Components

### 6.1 Create TodoForm Component

- [x] Create file: `src/components/TodoForm.tsx`
- [x] Build the component:

  ```typescript
  import React, { useState, type FormEvent } from "react";
  import { useAppDispatch } from "../redux/hooks";
  import { addTodo } from "../redux/actions/todoActions";

  export const TodoForm: React.FC = () => {
    const [text, setText] = useState<string>("");
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (text.trim()) {
        dispatch(addTodo(text));
        setText("");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    );
  };
  ```

**TypeScript notes:**

- `React.FC` - Function Component type (optional but clear)
- `useState<string>('')` - explicitly typed state
- `FormEvent<HTMLFormElement>` - proper event type for forms
- `useAppDispatch()` returns typed dispatch
- When you call `dispatch(addTodo(text))`, TS ensures `addTodo` returns valid action

### 6.2 Create TodoItem Component

- [x] Create file: `src/components/TodoItem.tsx`
- [x] Build with TypeScript:

  ```typescript
  import React, { useState } from "react";
  import { useAppDispatch } from "../redux/hooks";
  import {
    deleteTodo,
    updateTodo,
    toggleTodo,
  } from "../redux/actions/todoActions";
  import { Todo } from "../redux/types/todo.types";

  // Props interface
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
            className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
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
          checked={todo.completed}
          onChange={handleToggle}
          className="w-5 h-5 cursor-pointer"
        />
        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
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
  ```

**TypeScript notes:**

- `interface TodoItemProps` - defines what props this component accepts
- `React.FC<TodoItemProps>` - component is typed with its props
- `{ todo }` is automatically typed as `Todo` from the interface
- If you try to pass wrong props, TypeScript catches it!

### 6.3 Create TodoList Component

- [x] Create file: `src/components/TodoList.tsx`
- [x] Build with typed selector:

  ```typescript
  import React from "react";
  import { useAppSelector } from "../redux/hooks";
  import { TodoItem } from "./TodoItem";

  export const TodoList: React.FC = () => {
    // useAppSelector is fully typed!
    const todos = useAppSelector((state) => state.todos);
    // TypeScript knows: state is RootState, state.todos is Todo[]

    if (todos.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
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
  ```

**TypeScript magic:**

- `state` in the selector is typed as `RootState`
- TypeScript knows `state.todos` is `Todo[]`
- If you type `state.todooos` (typo), you get an error immediately!
- `todos.map()` knows each item is a `Todo`

### 6.4 Update App Component

- [x] Open `src/App.tsx`
- [x] Import and compose:

  ```typescript
  import React from "react";
  import { TodoForm } from "./components/TodoForm";
  import { TodoList } from "./components/TodoList";

  function App() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Redux + TypeScript Todo App
          </h1>
          <div className="bg-gray-50 rounded-xl shadow-lg p-6">
            <TodoForm />
            <TodoList />
          </div>
        </div>
      </div>
    );
  }

  export default App;
  ```

---

## Phase 7: Testing & Understanding TypeScript Benefits

### 7.1 Test the App

- [x] Run: `npm run dev`
- [x] Test all CRUD operations
- [x] Try the toggle complete feature
- [x] Verify everything works!

### 7.2 Experience TypeScript's Benefits

Try these experiments in **TodoForm.tsx** to see TypeScript catch errors before you run the code:

**Experiment 1: Wrong argument type**

- [x] Change `dispatch(addTodo(text))` to `dispatch(addTodo(123))`
- [x] See error: "Argument of type 'number' is not assignable to parameter of type 'string'"
- [x] Change back to `dispatch(addTodo(text))`

**Experiment 2: Missing required argument**

- [x] Change `dispatch(addTodo(text))` to `dispatch(addTodo())`
- [x] See error: "Expected 1 argument, but got 0"
- [x] Change back to `dispatch(addTodo(text))`

**Experiment 3: Wrong action structure**

- [x] Change `dispatch(addTodo(text))` to `dispatch({ type: 'ADD_TODO' })`
- [x] See error about missing 'payload' property
- [x] Change back to `dispatch(addTodo(text))`

**Experiment 4: Wrong state property access**

- [x] Go to TodoList.tsx and change `state.todos` to `state.todoos` (typo)
- [x] See error: "Property 'todoos' does not exist on type 'TodoState'. Did you mean 'todos'?"
- [x] Change back to `state.todos`

**Key Insight:** TypeScript catches all these errors **at compile-time**, before you even run the app!

### 7.3 Understand the Type Flow

Trace how types flow through your app:

1. **Define types**: `Todo` interface, `TodoState`, action interfaces (**`todo.types.ts`**, **`actionTypes.ts`**)
2. **Type actions**: Action creators return typed actions (**`todoActions.ts`**)
3. **Type reducer**: Reducer accepts typed state and actions, returns typed state (**`todoReducer.ts`**)
4. **Type store**: `RootState` and `AppDispatch` inferred from store (**`store.ts`**)
5. **Type hooks**: Custom hooks use `RootState` and `AppDispatch` (**`hooks.ts`**)
6. **Type components**: Props interfaces and typed hooks throughout (**`TodoForm.tsx`**, **`TodoItem.tsx`**, **`TodoList.tsx`**)

**This creates a type-safe chain from actions to state to components!**

---

## Phase 8: TypeScript + Redux Best Practices

### 8.1 Key Patterns You've Learned

- **Always define interfaces** for your data models (Todo)
- **Use action interfaces** for each action type
- **Create union types** for all possible actions (TodoActionTypes)
- **Export RootState and AppDispatch** from store
- **Create typed hooks** (useAppSelector, useAppDispatch)
- **Always use the typed hooks** in components, never plain ones
- **Define Props interfaces** for components that accept props

### 8.2 Common TypeScript + Redux Mistakes

- **DON'T** use `any` type - defeats the purpose of TypeScript
- **DON'T** use plain `useSelector` - always use `useAppSelector`
- **DON'T** forget `as const` on action type constants
- **DON'T** mutate state (same rule as JavaScript Redux)
- **DO** let TypeScript infer types when possible
- **DO** be explicit about function return types for clarity

### 8.3 When You Move to Redux Toolkit

Redux Toolkit (RTK) simplifies TypeScript even more:

- `createSlice` automatically generates action types
- `PayloadAction<T>` type for actions
- Immer lets you write "mutating" code safely
- Much less boilerplate!

But understanding what you just built helps you understand what RTK abstracts away.

---

## Phase 9: Final Polish & Commit

### 9.1 Code Review Checklist

- [x] All files use `.ts` or `.tsx` extensions
- [x] No `any` types anywhere
- [x] All components have proper prop types
- [x] All action creators have return types
- [x] Reducer has typed parameters and return
- [x] Custom hooks are used everywhere
- [x] No TypeScript errors in terminal or editor

### 9.2 Add TypeScript Info to README

- [x] Update README.md to mention TypeScript usage
- [x] Note the type safety benefits you experienced
- [x] Document the type files and their purposes

### 9.3 Final Commit

- [x] Remove any console.logs
- [x] Format code consistently
- [x] Run: `npm run build` to ensure it builds without errors
- [x] `git add .`
- [x] `git commit -m "Complete Redux + TypeScript todo app with full type safety"`
- [x] `git push origin main`

---

## Phase 10: Bonus Challenges

After completing the main exercise, try these to deepen your understanding:

### TypeScript-Specific Challenges

- [ ] Add a filter feature (All/Active/Completed) with a typed filter state
- [ ] Create a custom selector function with proper typing
- [ ] Add a "priority" field to todos (use a union type: 'low' | 'medium' | 'high')
- [ ] Implement an "undo" feature using typed action history
- [ ] Add TypeScript strict mode in `tsconfig.json` and fix any new errors

### Advanced Redux + TypeScript

- [ ] Create a second reducer (e.g., for filters) and combine reducers with proper typing
- [ ] Add localStorage persistence with typed serialization/deserialization
- [ ] Create a middleware with proper TypeScript types
- [ ] Add async actions (simulate API calls) with proper typing

---

## Key TypeScript + Redux Concepts Summary

### Type Safety Benefits You Gained

1. **Autocomplete everywhere** - your editor knows your state shape
2. **Catch errors before runtime** - typos, wrong types, missing properties
3. **Refactoring confidence** - rename a property, TS finds all uses
4. **Self-documenting code** - types serve as inline documentation
5. **Better debugging** - type errors point to exact problems

### The Type Chain

```
Todo interface
  → TodoState interface
    → Action interfaces
      → TodoActionTypes union
        → Reducer types
          → RootState (from store)
            → useAppSelector<RootState>
              → Components
```

### Why This Matters for Redux Toolkit

When you learn RTK, you'll appreciate:

- How much boilerplate TypeScript + vanilla Redux requires
- Why RTK's `createSlice` is so powerful (generates all these types)
- How `PayloadAction<T>` simplifies action typing
- Why RTK is now the recommended way to use Redux

But you'll **understand** RTK because you built the foundation manually!

---

## Reflection Questions

After completing this exercise, you should be able to answer:

1. What is `RootState` and why do we export it? - **Type of entire Redux state. Exported for type-safe selectors.**
2. Why do we create custom typed hooks instead of using plain Redux hooks? - **RootState/AppDispatch already configured for automatic autocomplete.**
3. What does `as const` do on action type constants? - **Makes 'ADD_TODO' a literal type, not just string.**
4. How does TypeScript "narrow" action types in switch cases? - **Switch cases know exact action/payload type.**
5. What's the difference between `type` and `interface` in TypeScript? - **interface for objects, type for unions.**
6. Why is the union type `TodoActionTypes` important? - **Ensures actions match defined types. Prevents invalid actions.**
7. How does `ReturnType<typeof store.getState>` work? - **Automatically extracts state type from store.**
8. What would happen if you removed types and used `any` everywhere? - **No autocomplete, no errors, no type safety. Basically JavaScript.**

---
