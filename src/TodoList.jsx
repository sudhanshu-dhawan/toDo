import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Trash2, PlusCircle } from 'lucide-react';

export default function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl shadow focus:outline-none bg-white/90 placeholder-gray-500"
        />
        <button
          onClick={addTask}
          className="bg-indigo-600 text-white p-3 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-between mb-4 text-sm font-medium text-white/80">
        <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'underline font-bold text-yellow-500' : ''}`}>All</button>
        <button onClick={() => setFilter('active')} className={`${filter === 'active' ? 'underline font-bold text-yellow-500' : ''}`}>Active</button>
        <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'underline font-bold text-yellow-500' : ''}`}>Completed</button>
      </div>

      <ul className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-white/70">No tasks yet</p>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className="flex justify-between items-center bg-white/20 backdrop-blur p-3 rounded-xl shadow text-white">
              <div className="flex items-center gap-3">
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-white/80" />
                  )}
                </button>
                <span className={`${task.completed ? 'line-through opacity-60' : ''}`}>
                  {task.text}
                </span>
              </div>
              <button onClick={() => deleteTask(task.id)}>
                <Trash2 className="w-5 h-5 hover:text-red-400 transition" />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
