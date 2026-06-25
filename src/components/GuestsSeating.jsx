import React, { useState } from 'react';
import { Info, UserPlus, Search, Trash2, Check } from 'lucide-react';

export default function GuestsSeating({
  guests,
  tables,
  onAddGuest,
  onUpdateRsvp,
  onSetGuestTable,
  onDeleteGuest
}) {
  const [guestSearch, setGuestSearch] = useState('');
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestRsvp, setNewGuestRsvp] = useState('Pending');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    onAddGuest(newGuestName.trim(), newGuestRsvp);
    setNewGuestName('');
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(guestSearch.toLowerCase()) ||
    g.rsvpStatus.toLowerCase().includes(guestSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn" id="guests-seating-component">
      {/* Seating explanatory banner */}
      <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs leading-relaxed text-slate-400">
          <span className="font-bold text-slate-200 block mb-0.5">Interactive Guest Seating Engine:</span>
          Add guest profiles, update RSVP state flags, and assign guests to round banquet tables (MERN Table Documents). Unassigned guests are listed on the left panel, ready to be assigned to active tables on the right with automatic capacity checks!
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Guest Management Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Guest Addition Form */}
          <form onSubmit={handleFormSubmit} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <UserPlus className="w-4 h-4 text-amber-500" /> Register New Guest
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Full Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500/40"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Initial RSVP Status</label>
                <select
                  value={newGuestRsvp}
                  onChange={(e) => setNewGuestRsvp(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs focus:outline-none text-slate-200"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500/10 hover:bg-amber-500/15 text-amber-400 border border-amber-500/20 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer"
              >
                Save Guest Document
              </button>
            </div>
          </form>

          {/* Master Guest Ledger List */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">
                Assigned Wedding Guest List ({guests.length})
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Local Cache Store</span>
            </div>

            {/* Search filter for guest list */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search guests..."
                value={guestSearch}
                onChange={(e) => setGuestSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            {/* Table readout list */}
            <div className="space-y-2 max-h-[350px] overflow-auto pr-1">
              {filteredGuests.map(g => (
                <div 
                  key={g.id} 
                  className="flex items-center justify-between p-3 bg-slate-900/40 border border-slate-900 rounded-xl hover:border-slate-800 transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-200 block">{g.name}</span>
                    <span className="text-[9px] font-mono text-slate-500 block">
                      {g.tableId ? `Table Placed: ${tables.find(t => t.id === g.tableId)?.name.split(' ')[0]} ${tables.find(t => t.id === g.tableId)?.name.split(' ')[1]}` : '❌ No Seating Assigned'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={g.rsvpStatus}
                      onChange={(e) => onUpdateRsvp(g.id, e.target.value)}
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 focus:outline-none ${
                        g.rsvpStatus === 'Confirmed' 
                          ? 'text-emerald-400' 
                          : g.rsvpStatus === 'Pending' 
                          ? 'text-amber-400' 
                          : 'text-rose-400'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Declined">Declined</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => onDeleteGuest(g.id)}
                      className="p-1 text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove Guest"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredGuests.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-6">No matching guest records found.</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Banquet Tables Seating Mapper */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Unassigned selection well */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-900 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">
              Banquet Seating Desk
            </h3>
            
            {/* Interactive Quick Seating helper */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/20 p-4 rounded-xl border border-slate-900 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-slate-500 block mb-1">1. Choose Unassigned Guest</label>
                <select
                  onChange={(e) => {
                    const guestId = e.target.value;
                    if (!guestId) return;
                    // Require choosing a table next
                    const tblSelect = document.getElementById('quick-table-select');
                    if (tblSelect && tblSelect.value) {
                      onSetGuestTable(guestId, tblSelect.value);
                      e.target.value = '';
                      tblSelect.value = '';
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200"
                  id="quick-guest-select"
                >
                  <option value="">-- Choose Guest --</option>
                  {guests.filter(g => g.tableId === null && g.rsvpStatus !== 'Declined').map(g => (
                    <option key={g.id} value={g.id}>{g.name} ({g.rsvpStatus})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-500 block mb-1 font-bold text-amber-500">2. Link to Target Table</label>
                <select
                  onChange={(e) => {
                    const tableId = e.target.value;
                    if (!tableId) return;
                    const guestSelect = document.getElementById('quick-guest-select');
                    if (guestSelect && guestSelect.value) {
                      onSetGuestTable(guestSelect.value, tableId);
                      guestSelect.value = '';
                      e.target.value = '';
                    }
                  }}
                  id="quick-table-select"
                  className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200"
                >
                  <option value="">-- Choose Table --</option>
                  {tables.map(t => {
                    const count = guests.filter(g => g.tableId === t.id).length;
                    return (
                      <option key={t.id} value={t.id} disabled={count >= t.capacity}>
                        {t.name} ({count}/{t.capacity} seated)
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Seating Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tables.map(tbl => {
              const seated = guests.filter(g => g.tableId === tbl.id);
              const isFull = seated.length >= tbl.capacity;

              return (
                <div 
                  key={tbl.id} 
                  className={`bg-slate-950/50 border rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 ${
                    isFull ? 'border-rose-500/10 opacity-90' : 'border-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-3">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">{tbl.name}</span>
                        <span className="text-[9px] font-mono text-slate-500">MERN Seating Unit</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isFull ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {seated.length}/{tbl.capacity} Seats
                      </span>
                    </div>

                    <div className="space-y-1.5 min-h-[140px]">
                      {seated.map(g => (
                        <div key={g.id} className="flex justify-between items-center bg-slate-900/60 border border-slate-900 px-2 py-1 rounded-lg">
                          <span className="text-xs text-slate-300 truncate max-w-[100px]">{g.name}</span>
                          <button 
                            type="button"
                            onClick={() => onSetGuestTable(g.id, null)}
                            className="text-[9px] font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 px-1 py-0.5 rounded cursor-pointer"
                          >
                            Free
                          </button>
                        </div>
                      ))}

                      {/* Empty placeholders */}
                      {Array.from({ length: tbl.capacity - seated.length }).map((_, i) => (
                        <div key={i} className="border border-dashed border-slate-900 px-3 py-1.5 rounded-lg flex items-center justify-center text-slate-700 text-[10px] font-mono select-none">
                          Open Seat
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-slate-500 text-center border-t border-slate-900 pt-2.5 mt-4">
                    {isFull ? '🔒 Capacity Reached' : '🟢 Space Available'}
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
