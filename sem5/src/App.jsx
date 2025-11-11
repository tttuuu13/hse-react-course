import React from "react";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget";
import Finance from "./components/Finance/Finance";

export default function App(){
  return (
    <div className="min-h-screen p-6">
      <Header />
      <main className="mt-8 grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">To-Do</h2>
            <TodoList />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Финансы</h2>
            <Finance />
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Погода</h2>
            <WeatherWidget />
          </div>
        </aside>
      </main>
    </div>
  );
}
