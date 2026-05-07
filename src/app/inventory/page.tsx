"use client";

import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn } from "@/components/ui";
import { 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User, 
  Hammer,
  Droplets,
  Search,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function InventoryPage() {
  const { rooms, updateRoomStatus, bookings } = useAppStore();
  const { toast } = useToast();
  const [filter, setFilter] = useState("All");

  const filteredRooms = filter === "All" 
    ? rooms 
    : rooms.filter(r => r.status === filter || r.type === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "success";
      case "Occupied": return "danger";
      case "Dirty": return "warning";
      case "Maintenance": return "warning";
      case "Blocked": return "default";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Available": return <CheckCircle2 size={16} />;
      case "Occupied": return <User size={16} />;
      case "Dirty": return <Droplets size={16} />;
      case "Maintenance": return <Hammer size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const handleStatusChange = (roomId: string, newStatus: string) => {
    updateRoomStatus(roomId, newStatus);
    toast(`${roomId} is now ${newStatus}`, "success");
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Villa & Room Inventory</h2>
          <p className="text-sm text-bark/40">Real-time status of all physical assets</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bark/30" size={16} />
            <input 
              type="text" 
              placeholder="Search units..." 
              className="pl-10 pr-4 py-2 bg-white border border-bark/10 rounded-xl text-sm focus:ring-1 focus:ring-gold/20 outline-none w-64"
            />
          </div>
          <Button className="bg-bark text-cream">Add Unit</Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["All", "Available", "Occupied", "Dirty", "Maintenance", "Villa", "Garden Room"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold transition-all border",
              filter === f ? "bg-gold text-white border-gold shadow-gold" : "bg-white text-bark/40 border-bark/10 hover:border-gold/30"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room, i) => {
          const booking = bookings.find(b => b.id === room.currentBookingId);
          
          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-none shadow-premium overflow-hidden p-0">
                <div className={cn(
                  "h-1.5 w-full",
                  room.status === "Available" ? "bg-sage" :
                  room.status === "Occupied" ? "bg-rose" :
                  room.status === "Dirty" ? "bg-amber" : "bg-bark/20"
                )} />
                
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-lg">{room.name}</h3>
                      <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">{room.type}</p>
                    </div>
                    <Badge variant={getStatusColor(room.status)} className="flex items-center gap-1">
                      {getStatusIcon(room.status)} {room.status}
                    </Badge>
                  </div>

                  {room.status === "Occupied" && booking ? (
                    <div className="p-3 bg-bark/[0.02] rounded-xl border border-bark/5 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-[10px] font-bold text-gold">
                          {booking.guest.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-bark">{booking.guest}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-bark/40 font-bold uppercase tracking-widest">
                        <span>Check-out</span>
                        <span>{booking.checkOut}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[68px] flex items-center justify-center border border-dashed border-bark/10 rounded-xl">
                      <p className="text-[10px] font-bold text-bark/20 uppercase tracking-widest">No active stay</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {room.status === "Dirty" ? (
                      <Button 
                        onClick={() => handleStatusChange(room.id, "Available")}
                        className="col-span-2 bg-sage text-white text-xs h-9"
                      >
                        Mark Clean
                      </Button>
                    ) : room.status === "Available" ? (
                      <>
                        <Button className="bg-bark text-cream text-xs h-9">Book Now</Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleStatusChange(room.id, "Maintenance")}
                          className="text-xs h-9"
                        >
                          Maintenance
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="col-span-2 text-xs h-9">Manage Unit</Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
