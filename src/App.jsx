import React, { useState } from 'react';
import { Heart, Sun, Moon } from 'lucide-react';

// Import our modular sub-components
import Dashboard from './components/Dashboard';
import VendorsMarketplace from './components/VendorsMarketplace';
import GuestsSeating from './components/GuestsSeating';
import BudgetLedger from './components/BudgetLedger';
import Milestones from './components/Milestones';

// Import initial data pools
import { INITIAL_VENDORS, INITIAL_BUDGET, INITIAL_TODOS, INITIAL_TABLES, INITIAL_GUESTS } from './data';

export default function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Primary state pools
  const [vendors] = useState(INITIAL_VENDORS);
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [guests, setGuests] = useState(INITIAL_GUESTS);
  const [tables] = useState(INITIAL_TABLES);

  // Navigation tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Vendor selection/filter state
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorCategory, setVendorCategory] = useState('all');
  const [vendorSearch, setVendorSearch] = useState('');

  // Simulation Logs
  const [mernLogs, setMernLogs] = useState([
    "MERN Server Status: LISTENING [Port 3000]",
    "MongoDB: Successfully loaded collections (Guests, Budgets, Vendors, Milestones)",
    "Express Router: GET /api/wedding-profile - HTTP 200 OK"
  ]);

  const addLog = (msg) => {
    setMernLogs(prev => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 5)
    ]);
  };

  // HANDLERS: VENDORS
  const handleBookVendor = (vendor) => {
    const alreadyInBudget = budget.some(item => item.name.includes(vendor.name));
    
    if (alreadyInBudget) {
      alert(`${vendor.name} is already registered on your Active Budget Ledger!`);
      return;
    }

    const newBudgetItem = {
      id: `b-vendor-${Date.now()}`,
      name: `Contract - ${vendor.name}`,
      allocated: vendor.baseCost,
      paid: 0,
      category: vendor.category.toUpperCase(),
      status: 'Unpaid'
    };

    setBudget(prev => [...prev, newBudgetItem]);
    addLog(`POST /api/budget -> Assigned "${vendor.name}". Contract retainer of ₹${vendor.baseCost.toLocaleString()} saved to MongoDB.`);
    alert(`Success! "${vendor.name}" has been assigned. A contract allocation for ₹${vendor.baseCost.toLocaleString()} has been automatically added to your Budget Tracker!`);
  };

  // HANDLERS: BUDGET
  const handleAddBudgetDoc = (name, allocated, category) => {
    const newItem = {
      id: `b-${Date.now()}`,
      name,
      allocated,
      paid: 0,
      category,
      status: 'Unpaid'
    };

    setBudget(prev => [...prev, newItem]);
    addLog(`POST /api/budget -> Saved custom expense document "${name}" [Allocation: ₹${allocated.toLocaleString()}]`);
  };

  const handleRecordPayment = (id, amount) => {
    setBudget(prev => prev.map(item => {
      if (item.id === id) {
        const nextPaid = Math.min(item.paid + amount, item.allocated);
        let status = 'Partial';
        if (nextPaid >= item.allocated) status = 'Paid';
        else if (nextPaid === 0) status = 'Unpaid';
        
        return {
          ...item,
          paid: nextPaid,
          status
        };
      }
      return item;
    }));

    const targetItem = budget.find(b => b.id === id);
    addLog(`PATCH /api/budget/payment -> Recorded ₹${amount.toLocaleString()} paid toward "${targetItem?.name}".`);
  };

  const handleDeleteBudgetItem = (id) => {
    setBudget(prev => prev.filter(item => item.id !== id));
    addLog(`DELETE /api/budget/${id} -> Dropped document allocation constraint.`);
  };

  // HANDLERS: GUESTS & SEATING
  const handleAddGuest = (name, rsvpStatus) => {
    const newGuest = {
      id: `g-${Date.now()}`,
      name,
      rsvpStatus,
      tableId: null
    };

    setGuests(prev => [...prev, newGuest]);
    addLog(`POST /api/guests -> Added guest document "${name}" with state "${rsvpStatus}".`);
  };

  const handleUpdateRsvp = (id, status) => {
    setGuests(prev => prev.map(g => {
      if (g.id === id) {
        const nextTable = status === 'Declined' ? null : g.tableId;
        return { ...g, rsvpStatus: status, tableId: nextTable };
      }
      return g;
    }));
    addLog(`PATCH /api/guests/${id}/rsvp -> Changed RSVP to "${status}".`);
  };

  const handleSetGuestTable = (guestId, tableId) => {
    setGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        return { ...g, tableId };
      }
      return g;
    }));

    const guest = guests.find(g => g.id === guestId);
    const targetTable = tables.find(t => t.id === tableId);
    if (tableId) {
      addLog(`PATCH /api/guests/${guestId}/seat -> Seated "${guest?.name}" at "${targetTable?.name}".`);
    } else {
      addLog(`PATCH /api/guests/${guestId}/seat -> Removed seating placement for "${guest?.name}".`);
    }
  };

  const handleDeleteGuest = (id) => {
    setGuests(prev => prev.filter(g => g.id !== id));
    addLog(`DELETE /api/guests/${id} -> Removed guest from MongoDB records.`);
  };

  // HANDLERS: TODOS
  const handleAddTodo = (title, dueDate, category) => {
    const newTodo = {
      id: `t-${Date.now()}`,
      title,
      dueDate,
      completed: false,
      category
    };

    setTodos(prev => [...prev, newTodo]);
    addLog(`POST /api/todos -> Registered new milestone "${title}".`);
  };

  const handleToggleTodo = (id) => {
    setTodos(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        addLog(`PATCH /api/todos/${id} -> Toggle state to completed=${nextState}`);
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    addLog(`DELETE /api/todos/${id} -> Removed wedding timeline task.`);
  };

  return (
    <div id="wedding-portal" className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-stone-50 text-stone-900 light-mode'} font-sans selection:bg-amber-500/20 selection:text-amber-300 pb-20`}>
      
      {/* Visual background accents */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-3xl -z-10" />

      {/* Modern Main Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Heart className="w-5 h-5 text-slate-950 fill-slate-950/20" />
            </div>
            <div>
              <span className="font-bold text-base md:text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                Wedding Planner
              </span>
              <p className="text-[10px] text-slate-500 font-mono">WEDDING PLANNER PLATFORM</p>
            </div>
          </div>

          {/* Core Desktop Navigation Tab Switchers */}
          <nav className="hidden md:flex gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-amber-500/10 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'vendors' ? 'bg-amber-500/10 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Vendors Marketplace
            </button>
            <button
              onClick={() => setActiveTab('guests')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'guests' ? 'bg-amber-500/10 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Guests & Seating
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'budget' ? 'bg-amber-500/10 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Budget Ledger
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'timeline' ? 'bg-amber-500/10 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Milestones
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              id="theme-toggle"
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                addLog(`GET /api/theme -> Toggled theme to ${!isDarkMode ? 'LIGHT' : 'DARK'}`);
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer flex items-center justify-center"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-purple-500" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Banner */}
      <div className="md:hidden bg-slate-900 border-b border-slate-900 p-2 flex flex-wrap gap-1 justify-center">
        {['dashboard', 'vendors', 'guests', 'budget', 'timeline'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1.5 rounded-lg text-xs capitalize font-medium transition-all ${
              activeTab === tab ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-slate-400'
            }`}
          >
            {tab === 'timeline' ? 'milestones' : tab}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-10">

        {/* SECTION 1: MASTER DASHBOARD SUMMARY OVERVIEW */}
        {activeTab === 'dashboard' && (
          <Dashboard
            budget={budget}
            guests={guests}
            todos={todos}
            tables={tables}
            setActiveTab={setActiveTab}
            handleToggleTodo={handleToggleTodo}
          />
        )}

        {/* SECTION 2: VENDOR DIRECTORY MARKETPLACE */}
        {activeTab === 'vendors' && (
          <VendorsMarketplace
            vendors={vendors}
            budget={budget}
            vendorCategory={vendorCategory}
            setVendorCategory={setVendorCategory}
            vendorSearch={vendorSearch}
            setVendorSearch={setVendorSearch}
            handleBookVendor={handleBookVendor}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
          />
        )}

        {/* SECTION 3: GUEST LIST & GUEST-TO-TABLE SEATING MANAGER */}
        {activeTab === 'guests' && (
          <GuestsSeating
            guests={guests}
            tables={tables}
            onAddGuest={handleAddGuest}
            onUpdateRsvp={handleUpdateRsvp}
            onSetGuestTable={handleSetGuestTable}
            onDeleteGuest={handleDeleteGuest}
          />
        )}

        {/* SECTION 4: BUDGET LEDGER */}
        {activeTab === 'budget' && (
          <BudgetLedger
            budget={budget}
            onAddBudgetDoc={handleAddBudgetDoc}
            onRecordPayment={handleRecordPayment}
            onDeleteBudgetItem={handleDeleteBudgetItem}
          />
        )}

        {/* SECTION 5: MILESTONE TIMELINE */}
        {activeTab === 'timeline' && (
          <Milestones
            todos={todos}
            onAddTodo={handleAddTodo}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        )}

      </main>

      {/* Humbler human, styled footer */}
      <footer className="border-t border-slate-900 mt-20 pt-8 text-center text-[10px] md:text-xs text-slate-500 space-y-2 font-mono">
        <p className="max-w-md mx-auto px-4 leading-relaxed">
          Wedding Planner Website. Built using modern React functional components and Tailwind responsive styles.
        </p>
        <p className="text-slate-600">
          Wedding Planner Project All rights reversed.
        </p>
      </footer>

    </div>
  );
}
