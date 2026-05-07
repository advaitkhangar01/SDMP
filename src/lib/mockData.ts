export const kpis = [
  { label: "Revenue This Month", value: "₹24,50,000", change: "+12.5%", trendingUp: true },
  { label: "Total Bookings", value: "142", change: "+8.2%", trendingUp: true },
  { label: "Occupancy Rate", value: "84%", change: "+5.1%", trendingUp: true },
  { label: "Open Inquiries", value: "28", change: "-2.4%", trendingUp: false },
  { label: "Avg Guest Rating", value: "4.9/5", change: "+0.2", trendingUp: true },
];

export const bookings = [
  { id: "BK-8801", guest: "Arjun Mehta", type: "Luxury Suite", checkIn: "2024-05-10", checkOut: "2024-05-15", guests: 2, amount: "₹60,000", paymentStatus: "Paid", status: "Confirmed", source: "Website" },
  { id: "BK-8802", guest: "Priya Sharma", type: "Villa", checkIn: "2024-05-12", checkOut: "2024-05-18", guests: 30, amount: "₹1,50,000", paymentStatus: "Partial", status: "Pending", source: "Booking.com" },
  { id: "BK-8803", guest: "Vikram Singh", type: "Garden Room", checkIn: "2024-05-15", checkOut: "2024-05-17", guests: 2, amount: "₹15,000", paymentStatus: "Paid", status: "Arrived", source: "Direct Call" },
  { id: "BK-8804", guest: "Ananya Iyer", type: "Luxury Suite", checkIn: "2024-05-20", checkOut: "2024-05-25", guests: 2, amount: "₹60,000", paymentStatus: "Unpaid", status: "Cancelled", source: "Expedia" },
  { id: "BK-8805", guest: "Rohan Gupta", type: "Villa", checkIn: "2024-05-22", checkOut: "2024-05-28", guests: 25, amount: "₹1,50,000", paymentStatus: "Paid", status: "Confirmed", source: "Website" },
];

export const inquiries = [
  { id: "INQ-1021", name: "Siddharth Malhotra", type: "Corporate Retreat", source: "Meta Ads", responseTime: "12m", status: "New", urgent: true },
  { id: "INQ-1022", name: "Kavita Rao", type: "Wedding Venue", source: "Instagram", responseTime: "45m", status: "In Progress", urgent: false },
  { id: "INQ-1023", name: "Amitabh Bachchan (Fan Event)", type: "Full Property", source: "Direct", responseTime: "2h", status: "New", urgent: true },
  { id: "INQ-1024", name: "Deepika Padukone", type: "Private Stay", source: "PR Agency", responseTime: "5m", status: "Responded", urgent: true },
];

export const marketingCampaigns = [
  { name: "Summer Luxury Escape 2024", spend: "₹1,20,000", leads: 450, bookings: 12, cpl: "₹266", roas: "8.4x", status: "Active" },
  { name: "Weekend Gateway Retreat", spend: "₹45,000", leads: 180, bookings: 5, cpl: "₹250", roas: "6.2x", status: "Active" },
  { name: "Honeymoon Villa Specials", spend: "₹80,000", leads: 320, bookings: 8, cpl: "₹250", roas: "12.5x", status: "Paused" },
];

export const crmPipeline = [
  { stage: "New Inquiry", cards: [
    { name: "Sameer Varma", event: "Family Reunion", source: "Meta", amount: "₹4.5L", days: 1 },
    { name: "Ishani Shah", event: "Anniversary", source: "Website", amount: "₹1.2L", days: 2 },
  ]},
  { stage: "Contacted", cards: [
    { name: "Rahul Dravid", event: "Sports Camp", source: "Direct", amount: "₹12L", days: 4 },
  ]},
  { stage: "Quote Sent", cards: [
    { name: "Pooja Hegde", event: "Photoshoot", source: "Instagram", amount: "₹2.5L", days: 3 },
  ]},
  { stage: "Booked", cards: [
    { name: "Virat Kohli", event: "Birthday Bash", source: "Direct", amount: "₹15L", days: 10 },
  ]},
];

export const tasks = [
  { id: 1, title: "Deep clean Villa 4", priority: "High", assignee: "Suresh K.", status: "Todo", due: "Today" },
  { id: 2, title: "Check pool pH levels", priority: "Medium", assignee: "Ramesh P.", status: "In Progress", due: "Tomorrow" },
  { id: 3, title: "Inventory check for kitchen", priority: "Low", assignee: "Meena R.", status: "Done", due: "Yesterday" },
  { id: 4, title: "Meta pixel sync error check", priority: "High", assignee: "Yashika", status: "Todo", due: "Today" },
];

export const reviews = [
  { guest: "Rajesh Kumar", rating: 5, comment: "Exquisite experience. The hospitality was unmatched. The staff treated us like royalty.", date: "2 days ago" },
  { guest: "Sneha Kapoor", rating: 4, comment: "Beautiful property. The food was great, though the pool service could be faster.", date: "1 week ago" },
];

export const payments = [
  { id: "TXN-5521", guest: "Arjun Mehta", amount: "₹42,500", date: "2024-05-01", status: "Completed", method: "Razorpay" },
  { id: "TXN-5522", guest: "Priya Sharma", amount: "₹1,05,000", date: "2024-05-02", status: "Processing", method: "Bank Transfer" },
  { id: "TXN-5523", guest: "Vikram Singh", amount: "₹45,000", date: "2024-05-03", status: "Completed", method: "UPI" },
];
export const guests = [
  { 
    name: "Virat Kohli", 
    city: "Delhi", 
    spend: "₹15,40,000", 
    bookings: 4, 
    lastStay: "Apr 2024", 
    type: "VIP", 
    status: "Active",
    email: "virat@example.com",
    phone: "+91 98765 43210",
    preferences: ["Vegetarian", "High Floor", "Extra Towels"],
    notes: "Prefers early morning tea. Very punctual."
  },
  { 
    name: "Pooja Hegde", 
    city: "Mumbai", 
    spend: "₹8,20,000", 
    bookings: 2, 
    lastStay: "Mar 2024", 
    type: "VIP", 
    status: "Active",
    email: "pooja@example.com",
    phone: "+91 99887 76655",
    preferences: ["Yoga Mat in Room", "Organic Food"],
    notes: "Visits for wellness retreats."
  },
  { 
    name: "Sameer Varma", 
    city: "Bangalore", 
    spend: "₹3,45,000", 
    bookings: 1, 
    lastStay: "Feb 2024", 
    type: "Regular", 
    status: "Active",
    email: "sameer@example.com",
    phone: "+91 91234 56789",
    preferences: ["Late Check-out"],
    notes: "Business traveler."
  },
];

export const offers = [
  { code: "SAVERA20", discount: "20% OFF", type: "Percentage", usage: 142, limit: 500, expiry: "2024-12-31", status: "Active" },
  { code: "LUXE5K", discount: "₹5,000 OFF", type: "Fixed Amount", usage: 85, limit: 100, expiry: "2024-06-15", status: "Active" },
];

export const events = [
  { id: 1, title: "Royal Wedding Reception", date: "May 15, 2024", guests: 250, revenue: "₹12,50,000", status: "Confirmed", type: "Wedding" },
  { id: 2, title: "Tech Leaders Summit", date: "May 22, 2024", guests: 45, revenue: "₹4,20,000", status: "Planning", type: "Corporate" },
  { id: 3, title: "Yoga & Wellness Retreat", date: "June 05, 2024", guests: 20, revenue: "₹1,80,000", status: "Open", type: "Wellness" },
];

export const villaStatus = {
  name: "Sunrise Villa",
  status: "Occupied" as const,
  currentBookingId: "BK-8802",
  lastCleaned: "2024-05-06",
  nextMaintenance: "2024-06-01"
};

export const staff = [
  { id: "S1", name: "Suresh Kumar", role: "Housekeeping", status: "On Duty" },
  { id: "S2", name: "Ramesh Pawar", role: "Maintenance", status: "On Duty" },
  { id: "S3", name: "Meena Rao", role: "Housekeeping", status: "On Duty" },
  { id: "S4", name: "Prakash Singh", role: "Security", status: "On Duty" },
  { id: "S5", name: "Yashika Pachisia", role: "General Manager", status: "Active" },
];
