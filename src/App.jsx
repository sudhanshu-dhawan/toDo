import { useState } from 'react'
import './App.css'
import TodoList from './TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/src/assets/todo.webp')" }}>

      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
          ✅ My To-Do List
        </h1>
        <TodoList />
      </div>
    </div>
  )
}

export default App
