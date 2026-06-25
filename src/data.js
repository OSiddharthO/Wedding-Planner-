export const INITIAL_VENDORS = [
  {
    id: "v1",
    name: "Royal Palace Gardens",
    category: "venue",
    rating: 4.8,
    priceRange: "₹₹₹₹",
    baseCost: 500000,
    contact: "+91 98765 43210",
    location: "Hazratganj, Lucknow",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600",
    description: "A premium banquet hall and lush garden ideal for grand celebrations and receptions."
  },
  {
    id: "v2",
    name: "Golden Crust Catering",
    category: "catering",
    rating: 4.6,
    priceRange: "₹₹₹",
    baseCost: 150000,
    contact: "+91 98765 43211",
    location: "Gomti Nagar, Lucknow",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600",
    description: "Delectable multi-cuisine food, premium buffet styling, and exceptional hospitality services."
  },
  {
    id: "v3",
    name: "Candid Moments Photography",
    category: "photography",
    rating: 4.9,
    priceRange: "₹₹₹",
    baseCost: 200000,
    contact: "+91 98765 43212",
    location: "Aliganj, Lucknow",
    imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600",
    description: "Capturing timeless emotions and beautiful memories with high-end cinematic lenses."
  },
  {
    id: "v4",
    name: "Dream Orchid Decors",
    category: "decoration",
    rating: 4.7,
    priceRange: "₹₹",
    baseCost: 120000,
    contact: "+91 98765 43213",
    location: "Mahanagar, Lucknow",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600",
    description: "Exquisite floral arrangements, thematic stage styling, and ambient fairy lights setup."
  },
  {
    id: "v5",
    name: "Symphony DJ & Live Band",
    category: "music",
    rating: 4.5,
    priceRange: "₹₹",
    baseCost: 80000,
    contact: "+91 98765 43214",
    location: "Indira Nagar, Lucknow",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
    description: "A highly energetic troupe providing custom playlist arrangements, sound setups, and lighting."
  }
];

export const INITIAL_BUDGET = [
  { id: "b1", name: "Venue Booking Deposit", allocated: 500000, paid: 250000, category: "Venue", status: "Partial" },
  { id: "b2", name: "Catering Full Service", allocated: 300000, paid: 300000, category: "Catering", status: "Paid" },
  { id: "b3", name: "Wedding Photography Portfolio", allocated: 200000, paid: 0, category: "Photography", status: "Unpaid" },
  { id: "b4", name: "Floral Backdrops & Lights", allocated: 150000, paid: 50000, category: "Decoration", status: "Partial" },
  { id: "b5", name: "Wedding Attire & Outfits", allocated: 180000, paid: 180000, category: "Clothing", status: "Paid" }
];

export const INITIAL_TODOS = [
  { id: "t1", title: "Finalize Royal Palace Venue", dueDate: "2026-08-15", completed: true, category: "Venue" },
  { id: "t2", title: "Send out digital RSVP invitations", dueDate: "2026-09-01", completed: false, category: "Guest List" },
  { id: "t3", title: "Confirm menu details with Golden Crust", dueDate: "2026-09-10", completed: true, category: "Catering" },
  { id: "t4", title: "Plan table layout & assign guests", dueDate: "2026-09-20", completed: false, category: "Seating" },
  { id: "t5", title: "Schedule photoshoot timeline", dueDate: "2026-10-05", completed: false, category: "Photography" }
];

export const INITIAL_TABLES = [
  { id: "tbl1", name: "Table A (Immediate Family)", capacity: 4 },
  { id: "tbl2", name: "Table B (College Friends)", capacity: 4 },
  { id: "tbl3", name: "Table C (Office Colleagues)", capacity: 4 }
];

export const INITIAL_GUESTS = [
  { id: "g1", name: "Amit Sharma", rsvpStatus: "Confirmed", tableId: "tbl1" },
  { id: "g2", name: "Priya Patel", rsvpStatus: "Confirmed", tableId: "tbl1" },
  { id: "g3", name: "Prashant Kumar", rsvpStatus: "Confirmed", tableId: "tbl2" },
  { id: "g4", name: "Ananya Mishra", rsvpStatus: "Confirmed", tableId: "tbl2" },
  { id: "g5", name: "Vikram Rathore", rsvpStatus: "Pending", tableId: null },
  { id: "g6", name: "Sneha Kapoor", rsvpStatus: "Confirmed", tableId: "tbl3" },
  { id: "g7", name: "Rahul Sharma", rsvpStatus: "Pending", tableId: null },
  { id: "g8", name: "Dr. Alok Sen", rsvpStatus: "Confirmed", tableId: "tbl3" }
];
