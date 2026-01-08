import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-8">
      <div className="text-center">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-16 mb-16">
          <a
            href="https://vite.dev"
            target="_blank"
            className="group transition-transform duration-300 hover:scale-110"
          >
            <img
              src={viteLogo}
              className="h-40 w-40 drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_3em_#646cffaa] group-hover:brightness-125"
              alt="Vite logo"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="group transition-transform duration-300 hover:scale-110"
          >
            <img
              src={reactLogo}
              className="h-40 w-40 drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_3em_#61dafbaa] group-hover:animate-spin group-hover:brightness-125"
              alt="React logo"
            />
          </a>
        </div>

        {/* Title */}
        <h1 className="text-7xl font-extrabold mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          Vite + React
        </h1>

        {/* Card */}
        <div className="w-96 bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl mx-auto">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="w-full px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-xl shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 active:scale-95 border-2 border-white/30"
          >
            count is {count}
          </button>

          <p className="mt-8 text-gray-300 text-lg leading-relaxed">
            Edit{" "}
            <code className="bg-black/40 px-4 py-2 rounded-lg text-cyan-400 font-mono text-base border border-cyan-500/30 inline-block">
              src/App.tsx
            </code>{" "}
            and save to test HMR
          </p>
        </div>

        {/* Footer */}
        <p className="text-gray-400 mt-12 text-base">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
