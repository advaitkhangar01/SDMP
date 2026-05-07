"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn } from "@/components/ui";
import { Search, Filter, Phone, Mail, MoreHorizontal, Award, History, TrendingUp, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuestsPage() {
  const { guests } = useAppStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<typeof guests[0] | null>(null);

  const filteredGuests = useMemo(() => {
    return guests.filter(g => 
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [guests, searchQuery]);

  const handleContact = (name: string, type: string) => {
    toast(`Initiating ${type} to ${name}...`, "info");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bark/30 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search guests by name or city..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-bark/5 rounded-xl text-sm w-80 outline-none shadow-sm focus:ring-1 focus:ring-gold/20" 
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 h-10"><Filter size={16} /> Filters</Button>
        </div>
        <Button className="flex items-center gap-2"><Award size={16} /> New VIP Nomination</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guest, i) => (
                <motion.div
                  layout
                  key={guest.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="p-0 overflow-hidden border-none shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={() => setSelectedGuest(guest)}>
                    <div className="flex items-center p-6 gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center relative shrink-0">
                        <div className="text-xl font-bold text-gold">{guest.name.charAt(0)}</div>
                        {guest.type === "VIP" && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm">
                            <Award size={12} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <h4 className="text-sm font-bold">{guest.name}</h4>
                          <p className="text-xs text-bark/40">{guest.city}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-bark/40 uppercase font-bold tracking-widest">Total Spend</p>
                          <p className="text-sm font-bold text-gold">{guest.spend}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-bark/40 uppercase font-bold tracking-widest">Bookings</p>
                          <p className="text-sm font-bold">{guest.bookings} Stays</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-[10px] text-bark/40 uppercase font-bold tracking-widest">Last Visit</p>
                          <p className="text-sm font-medium">{guest.lastStay}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleContact(guest.name, "WhatsApp"); }}
                          className="p-2 hover:bg-sage/10 text-sage rounded-xl transition-colors"
                        >
                          <MessageCircle size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleContact(guest.name, "Email"); }}
                          className="p-2 hover:bg-sky/10 text-sky rounded-xl transition-colors"
                        >
                          <Mail size={18} />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center text-bark/30 italic">No guests found.</div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-bark text-cream border-none shadow-premium">
            <h3 className="text-lg font-serif font-bold mb-6 text-gold">Guest Analytics</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs opacity-60 font-bold uppercase tracking-widest">
                  <span>VIP Retainment</span>
                  <span>92%</span>
                </div>
                <div className="w-full h-1.5 bg-cream/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} className="h-full bg-gold" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs opacity-60 font-bold uppercase tracking-widest">
                  <span>Repeat Guests</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-1.5 bg-cream/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} className="h-full bg-sage" />
                </div>
              </div>
              <div className="pt-4 border-t border-cream/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-serif font-bold text-gold">{guests.length * 12}</p>
                    <p className="text-[10px] opacity-40 uppercase font-bold tracking-widest">CRM Reach</p>
                  </div>
                  <TrendingUp className="text-sage" size={24} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><History size={16} /> Recent Activity</h3>
            <div className="space-y-4">
              {filteredGuests.slice(0, 3).map((g, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-bark/5 flex items-center justify-center shrink-0 font-bold text-bark/30">{g.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold">{g.name}</p>
                    <p className="text-bark/40">Last stay in {g.lastStay}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {selectedGuest && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedGuest(null)} className="fixed inset-0 bg-bark/40 backdrop-blur-sm z-[100]" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl z-[101] flex flex-col p-8"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-3xl bg-gold/10 flex items-center justify-center text-3xl font-bold text-gold">
                    {selectedGuest.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold">{selectedGuest.name}</h2>
                    <Badge variant={selectedGuest.type === "VIP" ? "gold" : "info"}>{selectedGuest.type} Guest</Badge>
                  </div>
                </div>
                <button onClick={() => setSelectedGuest(null)} className="p-2 hover:bg-bark/5 rounded-full"><X size={24} /></button>
              </div>

              <div className="space-y-8 flex-1 overflow-y-auto pr-2 no-scrollbar">
                <section className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-bark/5">
                    <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest mb-1">Total Lifetime Spend</p>
                    <p className="text-lg font-bold text-gold">{selectedGuest.spend}</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-bark/5">
                    <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest mb-1">Total Bookings</p>
                    <p className="text-lg font-bold">{selectedGuest.bookings}</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-bark/40 uppercase tracking-widest px-1">Contact Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-bark/5">
                      <Phone size={16} className="text-gold" />
                      <span className="text-sm font-medium">{selectedGuest.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-bark/5">
                      <Mail size={16} className="text-gold" />
                      <span className="text-sm font-medium">{selectedGuest.email}</span>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-bark/40 uppercase tracking-widest px-1">Stay Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGuest.preferences?.map(pref => (
                      <Badge key={pref} variant="outline" className="bg-sage/5 text-sage border-sage/10 font-bold">{pref}</Badge>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold text-bark/40 uppercase tracking-widest px-1">Internal Notes</h4>
                  <div className="p-4 bg-amber/5 border border-amber/10 rounded-2xl">
                    <p className="text-sm text-bark/70 leading-relaxed italic">"{selectedGuest.notes}"</p>
                  </div>
                </section>
              </div>

              <div className="mt-auto pt-6 flex gap-3">
                <Button className="flex-1">Send Special Offer</Button>
                <Button variant="outline">Edit Profile</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
