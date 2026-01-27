import React from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br fromblue-50 to-indigo-100 py-8">
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
