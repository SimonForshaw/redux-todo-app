# Redux + TypeScript Todo App

## TypeScript

Fully typed Redux implementation with:

- Type-safe actions, reducers, and selectors
- Custom typed hooks (`useAppSelector`, `useAppDispatch`)
- Autocomplete and compile-time error checking throughout

**Key files**: `todo.types.ts`, `actionTypes.ts`, `store.ts`, `hooks.ts`

### How Types Flow Through the App

The types connect everything together, creating a chain of type safety from data models all the way to components:

Todo → TodoState → Action Types → Actions → Reducer → Store Types → Typed Hooks → Components

Define the data shape once, and TypeScript ensures everything stays consistent throughout.

## Project Structure

src/
├── components/
│ ├── TodoForm.tsx
│ ├── TodoItem.tsx
│ └── TodoList.tsx
├── redux/
│ ├── actions/ # Action creators and types
│ ├── reducers/ # Redux reducers
│ ├── types/ # TypeScript type definitions
│ ├── hooks.ts # Typed Redux hooks
│ └── store.ts # Store configuration
└── App.tsx
