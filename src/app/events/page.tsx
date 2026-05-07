"use client";

import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn } from "@/components/ui";
import { Calendar, Users, MapPin, Clock, ArrowUpRight, Music, Utensils, Camera, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
  const { events, deleteEvent } = useAppStore();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    if (confirm("Cancel this event?")) {
      deleteEvent(id);
      toast("Event cancelled", "info");
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Event Management</h2>
          <p className="text-sm text-bark/40">Manage venues, catering, and event schedules</p>
        </div>
        <Button className="bg-gold text-white shadow-gold">+ Create Event</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {events.map((event, i) => (
            <motion.div 
              layout
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-0 overflow-hidden group border-none shadow-premium relative">
                <div className="h-32 bg-bark relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold" className="bg-white/90 backdrop-blur-md text-bark">{event.type}</Badge>
                  </div>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-rose/20 text-white rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-gold transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-bark/40 mt-1">
                      <Calendar size={12} /> {event.date}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-bark/30">Guests</p>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Users size={14} className="text-gold" /> {event.guests}
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase font-bold text-bark/30">Contract</p>
                      <div className="text-sm font-bold text-sage">{event.revenue}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-bark/5 flex items-center justify-between">
                    <Badge variant={event.status === "Confirmed" ? "success" : "warning"}>{event.status}</Badge>
                    <Button variant="ghost" className="p-1 h-auto text-gold hover:bg-gold/5">
                      Details <ArrowUpRight size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-premium">
          <h3 className="text-lg font-serif font-bold mb-6">Venue Availability</h3>
          <div className="space-y-6">
            {[
              { name: "Grand Lawn", capacity: "500 Guests", status: "Occupied (Wedding)", util: 85 },
              { name: "The Crystal Hall", capacity: "120 Guests", status: "Available", util: 30 },
              { name: "Poolside Deck", capacity: "80 Guests", status: "Maintenance", util: 0 },
            ].map((venue, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-sm font-bold">{venue.name}</h4>
                    <p className="text-xs text-bark/40">{venue.capacity} • {venue.status}</p>
                  </div>
                  <span className="text-xs font-bold">{venue.util}% Utility</span>
                </div>
                <div className="w-full h-1.5 bg-bark/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${venue.util}%` }}
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      venue.util > 70 ? "bg-rose" : venue.util > 0 ? "bg-sage" : "bg-bark/10"
                    )} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-none shadow-premium">
          <h3 className="text-lg font-serif font-bold mb-6">Service Partners</h3>
          <div className="space-y-4">
            {[
              { icon: Utensils, label: "Catering", vendor: "The Spice Art", status: "Active" },
              { icon: Music, label: "Entertainment", vendor: "Rhythm Events", status: "Active" },
              { icon: Camera, label: "Photography", vendor: "Vision Studios", status: "Review" },
            ].map((service, i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-bark/5 rounded-xl transition-colors cursor-pointer group">
                <div className="p-2 bg-bark/5 rounded-lg group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                  <service.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-bark/40 uppercase tracking-widest">{service.label}</p>
                  <p className="text-sm font-bold">{service.vendor}</p>
                </div>
                <Badge variant={service.status === "Active" ? "success" : "warning"}>{service.status}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">Manage All Vendors</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
