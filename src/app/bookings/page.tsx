"use client";

import { useState, useMemo } from "react";
import { Card, Badge, Button, cn, Input, Modal } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  X,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingsPage() {
  const { bookings: allBookings, addBooking, updateBooking, deleteBooking, villa, checkInBooking, checkOutBooking } = useAppStore();
  const { toast } = useToast();
  
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const selectedBooking = useMemo(() => 
    allBookings.find(b => b.id === selectedBookingId) || null
  , [allBookings, selectedBookingId]);

  const tabs = ["All", "Confirmed", "Pending", "Arrived", "Cancelled"];

  const filteredBookings = useMemo(() => {
    return allBookings.filter(booking => {
      const matchesTab = activeTab === "All" || booking.status === activeTab;
      const matchesSearch = 
        booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [allBookings, activeTab, searchQuery]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUpdateStatus = (id: string, newStatus: string) => {
    updateBooking(id, { status: newStatus });
    toast(`Status updated to ${newStatus}`, "success");
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Permanently delete this booking?")) {
      deleteBooking(id);
      setSelectedBookingId(null);
      toast("Booking deleted", "info");
    }
  };

  const [newBooking, setNewBooking] = useState({
    guest: "",
    type: "Villa",
    checkIn: "",
    checkOut: "",
    amount: "₹",
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `BK-${Math.floor(Math.random() * 9000) + 1000}`;
    addBooking({
      ...newBooking,
      id,
      guests: 2,
      paymentStatus: "Unpaid" as const,
      status: "Pending" as const,
      source: "Manual Entry"
    });
    setIsCreateModalOpen(false);
    setNewBooking({ guest: "", type: "Villa", checkIn: "", checkOut: "", amount: "₹" });
    toast("New booking created successfully!", "success");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl shadow-sm border border-bark/5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                activeTab === tab ? "bg-gold text-white shadow-gold" : "text-bark/50 hover:bg-bark/5"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Export
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
            <Plus size={16} /> Create Booking
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-premium">
        <div className="p-6 border-b border-bark/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bark/30 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by guest or booking ID..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2.5 bg-bark/5 rounded-xl text-sm w-full outline-none focus:ring-1 focus:ring-gold/20"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 text-xs h-10">
            <Filter size={14} /> Advanced Filters
          </Button>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bark/[0.02] border-b border-bark/5">
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Booking ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Guest</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Check-in / Out</th>
                <th className="px-6 py-4 text-[10px] font-bold text text-bark/40 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text text-bark/40 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bark/5">
              <AnimatePresence mode="popLayout">
                {paginatedBookings.map((booking) => (
                  <motion.tr 
                    layout
                    key={booking.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-bark/[0.01] transition-colors cursor-pointer group"
                    onClick={() => setSelectedBookingId(booking.id)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gold">{booking.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{booking.guest}</span>
                        <span className="text-[10px] text-bark/40">{booking.source}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-bark/60">{booking.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm">{booking.checkIn}</span>
                        <span className="text-[10px] text-bark/40">{booking.checkOut}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{booking.amount}</span>
                        <Badge variant={booking.paymentStatus === "Paid" ? "success" : "warning"}>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        booking.status === "Confirmed" ? "info" : 
                        booking.status === "Arrived" ? "success" : 
                        booking.status === "Cancelled" ? "danger" : "warning"
                      }>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-bark/5 rounded-lg text-bark/30 group-hover:text-bark/60 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-bark/5 flex items-center justify-between text-sm text-bark/40">
          <span>Showing {paginatedBookings.length} of {filteredBookings.length} bookings</span>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="px-3 py-1 h-8" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Prev
            </Button>
            <Button 
              variant="outline" 
              className="px-3 py-1 h-8" 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="New Booking">
        <form onSubmit={handleCreateBooking} className="space-y-6">
          <Input 
            label="Guest Name" 
            placeholder="e.g. Ranbir Kapoor" 
            required 
            value={newBooking.guest}
            onChange={e => setNewBooking({...newBooking, guest: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-bark/60 uppercase tracking-widest px-1">Room Type</label>
              <select 
                className="w-full px-4 py-2.5 bg-white border border-bark/10 rounded-xl text-sm focus:ring-1 focus:ring-gold/20 outline-none"
                value={newBooking.type}
                onChange={e => setNewBooking({...newBooking, type: e.target.value})}
              >
                <option>Villa</option>
                <option>Luxury Suite</option>
                <option>Garden Room</option>
              </select>
            </div>
            <Input label="Total Amount" placeholder="₹" required value={newBooking.amount} onChange={e => setNewBooking({...newBooking, amount: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Check-in Date" type="date" required value={newBooking.checkIn} onChange={e => setNewBooking({...newBooking, checkIn: e.target.value})} />
            <Input label="Check-out Date" type="date" required value={newBooking.checkOut} onChange={e => setNewBooking({...newBooking, checkOut: e.target.value})} />
          </div>
          <div className="pt-4 flex gap-3">
            <Button variant="outline" type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Confirm Booking</Button>
          </div>
        </form>
      </Modal>

      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBookingId(null)} className="fixed inset-0 bg-bark/40 backdrop-blur-sm z-[60]" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-bark/5 flex items-center justify-between bg-white">
                <div>
                  <h2 className="text-xl font-serif font-bold">Booking Details</h2>
                  <p className="text-sm text-gold font-bold">{selectedBooking.id}</p>
                </div>
                <button onClick={() => setSelectedBookingId(null)} className="p-2 hover:bg-bark/5 rounded-full"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <section className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold text-2xl font-bold">{selectedBooking.guest.charAt(0)}</div>
                    <div>
                      <h3 className="text-lg font-bold">{selectedBooking.guest}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="gold">VIP Guest</Badge>
                        <Badge variant="info">{selectedBooking.source}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center justify-center gap-2"><Phone size={14} /> Call</Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2"><Mail size={14} /> WhatsApp</Button>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-bark/40 uppercase tracking-widest">Stay Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-bark/5">
                      <Calendar className="text-gold w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-bark/40">Dates</p>
                        <p className="text-sm font-bold">{selectedBooking.checkIn} — {selectedBooking.checkOut}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-bark/5">
                      <MapPin className="text-gold w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-bark/40">Unit Assigned</p>
                        <p className="text-sm font-bold">{rooms.find(r => r.currentBookingId === selectedBooking.id)?.name || "Unassigned"}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-bark/40 uppercase tracking-widest">Operations</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedBooking.status !== "Arrived" ? (
                      <div className="space-y-3">
                        {villa.status === "Available" ? (
                          <div className="p-4 bg-sage/5 border border-sage/10 rounded-2xl space-y-3">
                            <p className="text-xs text-sage font-medium">Villa is ready for check-in.</p>
                            <Button 
                              onClick={() => {
                                checkInBooking(selectedBooking.id);
                                toast("Guest checked in successfully!", "success");
                              }}
                              className="w-full bg-sage text-white"
                            >
                              Check-in to Sunrise Villa
                            </Button>
                          </div>
                        ) : (
                          <div className="p-4 bg-rose/5 border border-rose/10 rounded-2xl space-y-1">
                            <p className="text-xs text-rose font-bold">Villa Unavailable</p>
                            <p className="text-[10px] text-rose/60">The villa is currently {villa.status}. It must be 'Available' before check-in.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button 
                        onClick={() => {
                          checkOutBooking(selectedBooking.id);
                          toast("Check-out complete. Housekeeping notified.", "success");
                          setSelectedBookingId(null);
                        }}
                        className="w-full bg-rose text-white h-12 text-sm shadow-lg shadow-rose/20"
                      >
                        Complete Check-out
                      </Button>
                    )}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-bark/40 uppercase tracking-widest">Quick Status Update</h4>
                  <div className="flex flex-wrap gap-2">
                    {tabs.filter(t => t !== "All").map(status => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedBooking.id, status)}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                          selectedBooking.status === status ? "bg-gold text-white border-gold" : "bg-white text-bark/40 border-bark/5"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </section>

                <div className="pt-8 flex gap-3 mt-auto">
                  <Button variant="outline" className="flex-1 text-rose hover:bg-rose/5 border-rose/10" onClick={() => handleDeleteBooking(selectedBooking.id)}>
                    <Trash2 size={14} className="mr-2" /> Delete Booking
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
