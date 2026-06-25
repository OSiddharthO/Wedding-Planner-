import React from 'react';
import { Search, MapPin, Building, Utensils, Camera, Paintbrush, Music, Check } from 'lucide-react';

export default function VendorsMarketplace({
  vendors,
  budget,
  vendorCategory,
  setVendorCategory,
  vendorSearch,
  setVendorSearch,
  handleBookVendor,
  selectedVendor,
  setSelectedVendor
}) {
  // Helper icons for categories
  const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('venue')) return <Building className="w-4 h-4 text-amber-400" />;
    if (cat.includes('cater')) return <Utensils className="w-4 h-4 text-rose-400" />;
    if (cat.includes('photo')) return <Camera className="w-4 h-4 text-sky-400" />;
    if (cat.includes('decor')) return <Paintbrush className="w-4 h-4 text-emerald-400" />;
    return <Music className="w-4 h-4 text-purple-400" />;
  };

  // Filtering Logic
  const filteredVendors = vendors.filter(v => {
    const matchesCat = vendorCategory === 'all' || v.category === vendorCategory;
    const matchesSearch = v.name.toLowerCase().includes(vendorSearch.toLowerCase()) ||
                          v.location.toLowerCase().includes(vendorSearch.toLowerCase()) ||
                          v.description.toLowerCase().includes(vendorSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn" id="vendors-marketplace-component">
      {/* Filter and search blocks */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-900">
        <div className="relative flex-grow w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search available wedding venues, caterers, photographers..."
            value={vendorSearch}
            onChange={(e) => setVendorSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-amber-500/40"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { value: 'all', label: 'All Categories' },
            { value: 'venue', label: 'Venues', actual: 'venue' },
            { value: 'catering', label: 'Catering', actual: 'catering' },
            { value: 'photography', label: 'Photography', actual: 'photography' },
            { value: 'decoration', label: 'Decoration', actual: 'decoration' },
            { value: 'music', label: 'Music/DJ', actual: 'music' },
          ].map(cat => (
            <button
              key={cat.value}
              onClick={() => setVendorCategory(cat.actual || cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                vendorCategory === (cat.actual || cat.value)
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold'
                  : 'bg-slate-900/40 text-slate-400 border border-slate-950 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vendor Catalog layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map(vendor => {
          const isAssigned = budget.some(item => item.name.includes(vendor.name));

          return (
            <div 
              key={vendor.id} 
              className="bg-slate-950/50 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-800 transition-all duration-300"
            >
              <div className="relative h-44 w-full">
                <img 
                  src={vendor.imageUrl} 
                  alt={vendor.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <span className="absolute top-2.5 right-2.5 bg-slate-950/80 text-amber-400 px-2.5 py-0.5 rounded text-[10px] font-bold font-mono border border-slate-800">
                  ★ {vendor.rating} Rating
                </span>
                <span className="absolute bottom-2.5 left-2.5 bg-slate-950/90 text-slate-200 px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest font-mono border border-slate-800 flex items-center gap-1.5">
                  {getCategoryIcon(vendor.category)}
                  {vendor.category}
                </span>
              </div>

              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-200 text-base md:text-lg leading-snug">{vendor.name}</h3>
                  <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    {vendor.location}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed mt-2.5">{vendor.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-900 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500">Contract Cost:</span>
                    <span className="font-bold text-amber-400 text-sm">₹{vendor.baseCost.toLocaleString()} ({vendor.priceRange})</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button 
                      onClick={() => setSelectedVendor(vendor)}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                    >
                      Read Reviews
                    </button>
                    
                    {isAssigned ? (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2 rounded-xl font-bold flex items-center justify-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Assigned / Booked
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleBookVendor(vendor)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-xl transition-all cursor-pointer text-center"
                      >
                        Assign to Event
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Reviews details overlay popup */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
            <div className="relative h-44 w-full">
              <img src={selectedVendor.imageUrl} alt={selectedVendor.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedVendor(null)}
                className="absolute top-3 right-3 bg-slate-950/80 text-slate-400 hover:text-slate-200 w-8 h-8 rounded-full flex items-center justify-center border border-slate-800 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded font-bold uppercase">
                  {selectedVendor.category}
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-2">{selectedVendor.name}</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Contact Hotline: {selectedVendor.contact} &bull; {selectedVendor.location}
                </p>
              </div>

              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{selectedVendor.description}</p>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-950 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Verified Client Feedback</span>
                <p className="text-slate-300 text-xs italic">
                  "Amazing coordination and high quality delivery! We booked them last winter and our guests couldn't stop praising their attention to detail."
                </p>
              </div>

              <button 
                onClick={() => {
                  handleBookVendor(selectedVendor);
                  setSelectedVendor(null);
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Book & Reserve Vendor Contract
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
