import React, { useState } from 'react';
import { Calendar, Trash2, CheckSquare, Plus } from 'lucide-react';

export default function Milestones({
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo
}) {
  // New Todo Form local state
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState('General');

  // Counters
  const completedTasks = todos.filter(t => t.completed).length;
  const totalTasks = todos.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    onAddTodo(
      newTodoTitle.trim(),
      newTodoDueDate || new Date().toISOString().split('T')[0],
      newTodoCategory
    );
    
    setNewTodoTitle('');
    setNewTodoDueDate('');
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="milestones-component">
      {/* Task summary header stats */}
      <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase font-mono mb-1">Milestones Completed Pacing</h4>
          <p className="text-xs text-slate-500">Track and plan deadlines to prevent last minute overruns.</p>
        </div>
        <span className="text-sm font-bold font-mono text-amber-400">
          {completedTasks} / {totalTasks} Completed
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Task list container */}
        <div className="lg:col-span-8 space-y-3.5">
          <h3 className="text-xs font-bold text-slate-350 uppercase font-mono tracking-wider">Timeline Checklist</h3>

          <div className="space-y-2.5">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-150 ${
                  todo.completed 
                    ? 'bg-slate-950/20 border-slate-900 text-slate-500 opacity-70 line-through' 
                    : 'bg-slate-950/50 border-slate-850 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleTodo(todo.id)}
                    className="text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {todo.completed ? (
                      <CheckSquare className="w-5 h-5 text-amber-500" />
                    ) : (
                      <div className="w-5 h-5 border border-slate-700 rounded-md" />
                    )}
                  </button>

                  <div>
                    <span className={`text-xs md:text-sm font-bold block ${todo.completed ? 'text-slate-500' : 'text-slate-200'}`}>
                      {todo.title}
                    </span>
                    <div className="flex items-center gap-2.5 mt-0.5">
                      <span className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-500 px-1.5 py-0.2 rounded">
                        {todo.category}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" /> Due Date: {todo.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteTodo(todo.id)}
                  className="p-1 text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Remove Task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {todos.length === 0 && (
              <p className="text-xs text-slate-500 italic text-center py-10">No wedding milestones recorded.</p>
            )}
          </div>
        </div>

        {/* Task adding side form */}
        <div className="lg:col-span-4">
          <form onSubmit={handleSubmit} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <Plus className="w-4 h-4 text-amber-400" /> Plan New Task
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule rehearsal dinner"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newTodoDueDate}
                    onChange={(e) => setNewTodoDueDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[10px] font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Category</label>
                  <select
                    value={newTodoCategory}
                    onChange={(e) => setNewTodoCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs focus:outline-none text-slate-250"
                  >
                    <option value="General">General</option>
                    <option value="Venue">Venue</option>
                    <option value="Catering">Catering</option>
                    <option value="Photography">Photography</option>
                    <option value="Seating">Seating</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500/10 hover:bg-amber-500/15 text-amber-400 border border-amber-500/20 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer"
              >
                Save Milestone
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
