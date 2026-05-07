"use client";

import { Card, Button, Badge, cn } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { ChevronLeft, ChevronRight, Filter, Info } from "lucide-react";
import { useState, useMemo } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const { bookings } = useAppStore();
  const [currentMonth, setCurrentMonth] = useState("May 2024");

  // Logic to sync bookings with calendar
  const dates = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const dayStr = `2024-05-${day.toString().padStart(2, "0")}`;
      
      // Find bookings for this day
      // Note: checkIn format in mockData is "12 May 2024", we'll do a simple match
      const dayBooking = bookings.find(b => b.checkIn.includes(day.toString()) && b.checkIn.includes("May"));
      
      let status: "available" | "booked" | "premium" | "blocked" | "event" = "available";
      let price = "₹15k";
      let title = "";

      if ([5, 12, 19, 26, 6, 13, 20, 27].includes(day)) {
        status = "premium";
        price = "₹22k";
      }

      if (dayBooking) {
        status = "booked";
        title = `${dayBooking.id} (${dayBooking.guest})`;
      }

      // Hardcoded events/blocked for demo
      if ([1, 2].includes(day)) status = "blocked";
      if ([18].includes(day)) status = "event";

      return { day, status, price, title };
    });
  }, [bookings]);

  const emptyDays = [null, null, null];
  const gridDays = [...emptyDays, ...dates];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-serif font-bold text-bark">{currentMonth}</h2>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-bark/5 rounded-lg transition-colors"><ChevronLeft size={20} /></button>
            <button className="p-2 hover:bg-bark/5 rounded-lg transition-colors"><ChevronRight size={20} /></button>
          </div>
          <Button variant="outline" className="text-xs h-9">Today</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2"><Filter size={16} /> Filters</Button>
          <Button className="bg-bark text-cream">Block Dates</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="p-0 overflow-hidden border-none shadow-premium bg-white">
            <div className="grid grid-cols-7 border-b border-bark/5 bg-bark/[0.02]">
              {days.map(day => (
                <div key={day} className="px-4 py-4 text-center text-[10px] font-bold text-bark/40 uppercase tracking-widest border-r border-bark/5 last:border-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {gridDays.map((item, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "min-h-[120px] p-2 border-r border-b border-bark/5 relative transition-all group",
                    !item && "bg-bark/[0.01]",
                    item?.status === "booked" && "bg-bark/[0.02]",
                    item?.status === "blocked" && "bg-rose/[0.02]",
                    item?.status === "event" && "bg-sky/[0.02]"
                  )}
                >
                  {item && (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className={cn(
                          "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors",
                          item.status === "booked" ? "text-bark/30" : "text-bark"
                        )}>
                          {item.day}
                        </span>
                        <span className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                          item.status === "premium" ? "text-amber bg-amber/10" : "text-bark/40"
                        )}>
                          {item.price}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {item.status === "booked" && (
                          <div className="px-2 py-1 bg-bark text-cream rounded-md text-[9px] font-bold truncate">
                            {item.title}
                          </div>
                        )}
                        {item.status === "event" && (
                          <div className="px-2 py-1 bg-sky text-white rounded-md text-[9px] font-bold truncate">
                            Wedding Venue
                          </div>
                        )}
                        {item.status === "blocked" && (
                          <div className="px-2 py-1 bg-rose/10 text-rose rounded-md text-[9px] font-bold truncate">
                            Maintenance
                          </div>
                        )}
                        {item.status === "available" && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-full py-1 border border-dashed border-bark/20 rounded-md text-[8px] font-bold uppercase text-bark/40 hover:bg-gold hover:text-white hover:border-gold">
                              Quick Book
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-bark text-cream p-6 border-none shadow-premium">
            <h3 className="text-lg font-serif font-bold mb-4">Availability Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-60">Total Capacity</span>
                <span className="font-bold">24 Guests</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-60">Booked Days</span>
                <span className="font-bold">{dates.filter(d => d.status === "booked").length} / 31</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-60">Occupancy</span>
                <span className="text-gold font-bold text-lg">
                  {Math.round((dates.filter(d => d.status === "booked").length / 31) * 100)}%
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-premium">
            <h4 className="text-xs font-bold text-bark/40 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} /> Legend
            </h4>
            <div className="space-y-3">
              {[
                { color: "bg-white border border-bark/5", label: "Available" },
                { color: "bg-bark", label: "Booked" },
                { color: "bg-amber/10 border border-amber/20", label: "Premium Rate" },
                { color: "bg-sky", label: "Special Event" },
                { color: "bg-rose/10 border border-rose/20", label: "Blocked / Maintenance" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn("w-4 h-4 rounded", item.color)} />
                  <span className="text-xs font-medium text-bark/70">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
