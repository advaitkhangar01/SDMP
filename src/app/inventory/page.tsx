"use client";

import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn } from "@/components/ui";
import { 
  Building2, 
  CheckCircle2, 
  User, 
  Hammer,
  Droplets,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function VillaStatusPage() {
  const { villa, updateVillaStatus, bookings } = useAppStore();
  const { toast } = useToast();

  const booking = bookings.find(b => b.id === villa.currentBookingId);

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "Available": return { color: "success", icon: <CheckCircle2 size={24} />, desc: "Ready for Guest" };
      case "Occupied": return { color: "danger", icon: <User size={24} />, desc: "Guest Staying" };
      case "Dirty": return { color: "warning", icon: <Droplets size={24} />, desc: "Cleaning Required" };
      case "Maintenance": return { color: "warning", icon: <Hammer size={24} />, desc: "Under Repair" };
      default: return { color: "default", icon: <Clock size={24} />, desc: "Unknown" };
    }
  };

  const details = getStatusDetails(villa.status);

  const handleStatusChange = (newStatus: any) => {
    updateVillaStatus(newStatus);
    toast(`Villa is now ${newStatus}`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-bark">Villa Command Center</h2>
        <p className="text-sm text-bark/40">Real-time management of Sunrise Villa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <Card className="md:col-span-2 p-8 border-none shadow-premium bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Building2 size={120} />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", 
                  villa.status === "Available" ? "bg-sage/10 text-sage" :
                  villa.status === "Occupied" ? "bg-rose/10 text-rose" : "bg-amber/10 text-amber"
                )}>
                  {details.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-bark">{villa.name}</h3>
                  <p className="text-sm font-bold text-bark/30 uppercase tracking-widest">{details.desc}</p>
                </div>
              </div>
              <Badge variant={details.color as any} className="text-sm px-4 py-1 rounded-full uppercase tracking-widest">
                {villa.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-bark/[0.02] rounded-2xl border border-bark/5 space-y-1">
                <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Last Cleaned</p>
                <p className="text-sm font-bold">{villa.lastCleaned}</p>
              </div>
              <div className="p-4 bg-bark/[0.02] rounded-2xl border border-bark/5 space-y-1">
                <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Next Maintenance</p>
                <p className="text-sm font-bold text-amber">{villa.nextMaintenance}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {villa.status === "Dirty" && (
                <Button onClick={() => handleStatusChange("Available")} className="flex-1 bg-sage text-white h-12 shadow-lg shadow-sage/10">
                  <Sparkles size={18} className="mr-2" /> Mark as Clean & Ready
                </Button>
              )}
              {villa.status === "Available" && (
                <Button onClick={() => handleStatusChange("Maintenance")} variant="outline" className="flex-1 h-12 border-amber/20 text-amber hover:bg-amber/5">
                  <Hammer size={18} className="mr-2" /> Block for Maintenance
                </Button>
              )}
              {villa.status === "Maintenance" && (
                <Button onClick={() => handleStatusChange("Available")} className="flex-1 bg-sage text-white h-12">
                  Complete Maintenance
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Current Occupant Card */}
        <Card className="p-8 border-none shadow-premium bg-bark text-cream relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-gold uppercase tracking-widest">Current Occupancy</h4>
              {villa.status === "Occupied" && booking ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold">
                      {booking.guest.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{booking.guest}</p>
                      <p className="text-xs text-cream/40">{booking.id}</p>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-cream/40 uppercase tracking-widest">Stay Duration</span>
                      <span className="text-xs font-bold">{booking.checkIn} — {booking.checkOut}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-cream/40 uppercase tracking-widest">Guests</span>
                      <span className="text-xs font-bold">{booking.guests} People</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                    <Building2 size={32} />
                  </div>
                  <p className="text-sm text-cream/40 italic">No active stay currently.</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-gold">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">System Secure</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Operations Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-premium flex items-center justify-between group cursor-pointer hover:bg-gold/5 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
              <Calendar size={20} />
            </div>
            <div>
              <p className="font-bold">Booking Calendar</p>
              <p className="text-xs text-bark/40">View upcoming stays for the villa</p>
            </div>
          </div>
          <Clock className="text-bark/10 group-hover:text-gold/20 transition-colors" size={24} />
        </Card>
        <Card className="p-6 border-none shadow-premium flex items-center justify-between group cursor-pointer hover:bg-sage/5 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center text-sage">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="font-bold">Cleaning Schedule</p>
              <p className="text-xs text-bark/40">Manage housekeeping frequency</p>
            </div>
          </div>
          <Droplets className="text-bark/10 group-hover:text-sage/20 transition-colors" size={24} />
        </Card>
      </div>
    </div>
  );
}
