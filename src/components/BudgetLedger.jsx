import React, { useState } from 'react';
import { IndianRupee, Trash2, Plus } from 'lucide-react';

export default function BudgetLedger({
  budget,
  onAddBudgetDoc,
  onRecordPayment,
  onDeleteBudgetItem
}) {
  // New BudgetItem Form local state 
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetAllocated, setNewBudgetAllocated] = useState('');
  const [newBudgetCategory, setNewBudgetCategory] = useState('General');

  // Log Payment Form local states
  const [paymentItemId, setPaymentItemId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  // Calculations
  const totalAllocated = budget.reduce((sum, item) => sum + item.allocated, 0);
  const totalPaid = budget.reduce((sum, item) => sum + item.paid, 0);
  const budgetUtilization = totalAllocated > 0 ? (totalPaid / totalAllocated) * 100 : 0;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newBudgetName.trim() || !newBudgetAllocated) return;
    const val = parseFloat(newBudgetAllocated);
    if (isNaN(val) || val <= 0) return;

    onAddBudgetDoc(newBudgetName.trim(), val, newBudgetCategory);
    setNewBudgetName('');
    setNewBudgetAllocated('');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentItemId || !paymentAmount) return;
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;

    onRecordPayment(paymentItemId, amount);
    setPaymentItemId('');
    setPaymentAmount('');
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="budget-ledger-component">
      {/* Budgets metrics header progress bar */}
      <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400 uppercase tracking-widest block font-bold text-amber-500">Expenditure Progress Bar</span>
          <span className="text-slate-200">{budgetUtilization.toFixed(1)}% Completed Payments</span>
        </div>
        <div className="w-full bg-slate-900 h-3.5 rounded-full overflow-hidden border border-slate-850">
          <div 
            className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-300" 
            style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Ledger breakdown list */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-bold text-slate-350 uppercase font-mono tracking-wider">Active Wedding Expense Ledger</h3>
          
          <div className="bg-slate-950/60 border border-slate-900 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-900 text-slate-500 font-mono text-[10px] uppercase">
                  <th className="p-4">Line Item (MERN Document)</th>
                  <th className="p-4">Target Limit</th>
                  <th className="p-4">Recorded Paid</th>
                  <th className="p-4">Status Flag</th>
                  <th className="p-4 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-slate-300">
                {budget.map(item => (
                  <tr key={item.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4 font-semibold text-slate-200">
                      {item.name}
                      <span className="block text-[10px] font-mono text-slate-500 font-normal uppercase mt-0.5">{item.category}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-300">₹{item.allocated.toLocaleString()}</td>
                    <td className="p-4 font-mono text-emerald-400">₹{item.paid.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase ${
                        item.status === 'Paid' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : item.status === 'Partial'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => onDeleteBudgetItem(item.id)}
                        className="p-1 text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Drop Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Action Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Log payment Form */}
          <form onSubmit={handlePaymentSubmit} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <IndianRupee className="w-4 h-4 text-emerald-400" /> Record Payment
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Select Expense Document</label>
                <select
                  value={paymentItemId}
                  onChange={(e) => setPaymentItemId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs focus:outline-none text-slate-200"
                  required
                >
                  <option value="">-- Select Line Item --</option>
                  {budget.map(b => (
                    <option key={b.id} value={b.id}>{b.name} (₹{(b.allocated - b.paid).toLocaleString()} remaining)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Transaction Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer"
              >
                Commit Transaction
              </button>
            </div>
          </form>

          {/* Add Custom Expense */}
          <form onSubmit={handleAddSubmit} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <Plus className="w-4 h-4 text-amber-400" /> Allocate Custom Expense
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Expense Name</label>
                <input
                  type="text"
                  placeholder="e.g. Traditional Costumes"
                  value={newBudgetName}
                  onChange={(e) => setNewBudgetName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Allocated (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={newBudgetAllocated}
                    onChange={(e) => setNewBudgetAllocated(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Category</label>
                  <select
                    value={newBudgetCategory}
                    onChange={(e) => setNewBudgetCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs focus:outline-none text-slate-250"
                  >
                    <option value="General">General</option>
                    <option value="Venue">Venue</option>
                    <option value="Catering">Catering</option>
                    <option value="Photography">Photography</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500/10 hover:bg-amber-500/15 text-amber-400 border border-amber-500/20 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer"
              >
                Save Document
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
