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
```
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
```
<img width="768" height="360" alt="Screenshot 2026-01-28 174558" src="https://github.com/user-attachments/assets/df8a4594-3e64-4ff1-b143-a0b4bf0487b9" />

<img width="828" height="343" alt="Screenshot 2026-01-28 174637" src="https://github.com/user-attachments/assets/aa1cfb42-4a7b-4b86-9e03-9e3d66147e7f" />

<img width="826" height="351" alt="Screenshot 2026-01-28 174649" src="https://github.com/user-attachments/assets/a18bbf6a-4c0d-484c-b6c7-7a5e73c9eb99" />

<img width="868" height="363" alt="Screenshot 2026-01-28 174701" src="https://github.com/user-attachments/assets/9cafa71a-bb4e-4333-9afb-377db11ac1da" />
