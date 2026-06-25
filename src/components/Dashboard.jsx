import React from 'react';
import { IndianRupee, Users, Clock, Briefcase, Check } from 'lucide-react';

export default function Dashboard({ 
  budget, 
  guests, 
  todos, 
  tables, 
  setActiveTab, 
  handleToggleTodo 
}) {
  // Budget stats calculations
  const totalAllocated = budget.reduce((sum, item) => sum + item.allocated, 0);
  const totalPaid = budget.reduce((sum, item) => sum + item.paid, 0);
  const remainingBudget = totalAllocated - totalPaid;
  const budgetUtilization = totalAllocated > 0 ? (totalPaid / totalAllocated) * 100 : 0;

  // RSVP counters
  const confirmedGuests = guests.filter(g => g.rsvpStatus === 'Confirmed').length;
  const pendingGuests = guests.filter(g => g.rsvpStatus === 'Pending').length;
  const declinedGuests = guests.filter(g => g.rsvpStatus === 'Declined').length;
  const totalGuestsCount = guests.length;

  // Todo counters
  const completedTasks = todos.filter(t => t.completed).length;
  const totalTasks = todos.length;

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-component">
      {/* Elegant banner */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-[10px] uppercase tracking-widest font-mono text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded font-bold">
            Client Control Station
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-100 leading-tight">
            The Perfect Wedding, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-400">Completely Under Control.</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
            Plan your dream event with ease. Seamlessly connect with trusted caterers and photographers while keeping a strict eye on budget tracking, guest lists, RSVPs, and visual seating allocations in one elegant spot.
          </p>
        </div>

        {/* Total Progress Metrics card */}
        <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl w-full md:w-80 space-y-3.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Total Progress Metrics</span>
            <span className="text-amber-400 font-bold">In-Memory Store</span>
          </div>
          <div className="h-px bg-slate-900" />
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-900">
              <span className="text-slate-500 text-[10px] uppercase font-mono block">Budget Spent</span>
              <span className="text-sm font-extrabold text-slate-200">{budgetUtilization.toFixed(0)}%</span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-900">
              <span className="text-slate-500 text-[10px] uppercase font-mono block">Guests Confirmed</span>
              <span className="text-sm font-extrabold text-emerald-400">{confirmedGuests} / {totalGuestsCount}</span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-900 col-span-2">
              <span className="text-slate-500 text-[10px] uppercase font-mono block">Milestones Completed</span>
              <span className="text-sm font-extrabold text-amber-400">{completedTasks} of {totalTasks} finished</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl flex items-center gap-4 hover:border-amber-500/20 transition-all duration-300">
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">Remaining Outflow</span>
            <span className="text-xl font-bold text-slate-200">₹{remainingBudget.toLocaleString()}</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Allocated: ₹{totalAllocated.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl flex items-center gap-4 hover:border-amber-500/20 transition-all duration-300">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">Confirmed Guests RSVP</span>
            <span className="text-xl font-bold text-emerald-400">{confirmedGuests} Guests</span>
            <p className="text-[10px] text-slate-400 mt-0.5">{pendingGuests} pending / {declinedGuests} declined</p>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl flex items-center gap-4 hover:border-amber-500/20 transition-all duration-300">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">Milestone Checklist</span>
            <span className="text-xl font-bold text-purple-400">{completedTasks} Done</span>
            <p className="text-[10px] text-slate-400 mt-0.5">{totalTasks - completedTasks} remaining items</p>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl flex items-center gap-4 hover:border-amber-500/20 transition-all duration-300">
          <div className="w-12 h-12 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">Vendor Placements</span>
            <span className="text-xl font-bold text-rose-400">{budget.filter(b => b.category !== 'CLOTHING' && b.category !== 'GENERAL').length} Hired</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Explore active market</p>
          </div>
        </div>
      </div>

      {/* Quick action shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Quick Checklist progress */}
        <div className="bg-slate-900/20 border border-slate-900/60 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-900 pb-3">
            <h3 className="font-bold text-sm text-slate-200 uppercase font-mono tracking-wider">Upcoming Tasks Pacing</h3>
            <button onClick={() => setActiveTab('timeline')} className="text-amber-400 hover:text-amber-300 text-xs font-mono font-bold cursor-pointer">
              View All &rarr;
            </button>
          </div>
          <div className="space-y-3">
            {todos.slice(0, 3).map(todo => (
              <div 
                key={todo.id} 
                onClick={() => handleToggleTodo(todo.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-900 cursor-pointer hover:border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    todo.completed ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'border-slate-700'
                  }`}>
                    {todo.completed && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-xs md:text-sm font-medium ${todo.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                    {todo.title}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Due: {todo.dueDate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seating snapshot */}
        <div className="bg-slate-900/20 border border-slate-900/60 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-900 pb-3">
            <h3 className="font-bold text-sm text-slate-200 uppercase font-mono tracking-wider">Banquet Table Capacities</h3>
            <button onClick={() => setActiveTab('guests')} className="text-amber-400 hover:text-amber-300 text-xs font-mono font-bold cursor-pointer">
              Manage Seating &rarr;
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {tables.map(tbl => {
              const seated = guests.filter(g => g.tableId === tbl.id).length;
              const percent = (seated / tbl.capacity) * 100;
              return (
                <div key={tbl.id} className="bg-slate-950/50 p-3 rounded-xl border border-slate-900 flex flex-col justify-between h-24">
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">{tbl.name.split(' ')[0]} {tbl.name.split(' ')[1]}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Max Capacity: {tbl.capacity}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span>Seated</span>
                      <span>{seated} / {tbl.capacity}</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
