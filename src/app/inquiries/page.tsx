"use client";

import { useState, useMemo } from "react";
import { Card, Badge, Button, cn } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Search, Filter, AlertCircle, Clock, CheckCircle2, MessageSquare, ArrowRight, Star, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InquiriesPage() {
  const { inquiries, convertToBooking, deleteInquiry } = useAppStore();
  const { toast } = useToast();
  
  const [activeFolder, setActiveFolder] = useState("Unassigned");
  const [searchQuery, setSearchQuery] = useState("");

  const folders = [
    { label: "Unassigned", icon: MessageSquare },
    { label: "Follow-up", icon: Clock },
    { label: "Completed", icon: CheckCircle2 },
    { label: "Starred", icon: Star },
  ];

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      // In a real app, folders would be a status. Here we just mock it.
      // We'll treat "Urgent" as Unassigned for demo purposes.
      const matchesSearch = 
        inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [inquiries, searchQuery]);

  const handleConvert = (id: string, name: string) => {
    convertToBooking(id);
    toast(`Inquiry from ${name} converted to booking!`, "success");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      deleteInquiry(id);
      toast("Inquiry deleted", "info");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-serif font-bold text-bark">Inquiry Inbox</h2>
          <Badge variant="gold">{filteredInquiries.length} New</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bark/30 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-bark/5 rounded-xl text-sm w-64 outline-none focus:ring-1 focus:ring-gold/20" 
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 h-10"><Filter size={16} /> Filters</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 space-y-1">
            <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest px-2 mb-2">Folders</p>
            {folders.map((folder, i) => (
              <button 
                key={i} 
                onClick={() => setActiveFolder(folder.label)}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors",
                  activeFolder === folder.label ? "bg-gold text-white shadow-gold" : "hover:bg-bark/5 text-bark/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <folder.icon size={16} />
                  <span>{folder.label}</span>
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  activeFolder === folder.label ? "bg-white/20" : "bg-bark/10"
                )}>
                  {i === 0 ? filteredInquiries.length : 0}
                </span>
              </button>
            ))}
          </Card>

          <Card className="p-4">
            <h4 className="text-xs font-bold text-bark/40 uppercase tracking-widest mb-4">Response Health</h4>
            <div className="space-y-4 text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-bark/5"
                    strokeDasharray="100, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                  />
                  <path
                    className="stroke-gold"
                    strokeDasharray="85, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-serif font-bold">18m</span>
                  <span className="text-[8px] uppercase font-bold text-bark/40">Avg Response</span>
                </div>
              </div>
              <p className="text-xs text-bark/60">Your response time is <span className="text-sage font-bold">12% faster</span> than last week.</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq, i) => (
                <motion.div
                  layout
                  key={inq.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={cn(
                    "p-6 transition-all hover:shadow-md border-l-4",
                    inq.urgent ? "border-l-rose shadow-rose/5" : "border-l-gold shadow-gold/5"
                  )}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-gold">{inq.id}</span>
                          {inq.urgent && <Badge variant="danger" className="animate-pulse">URGENT</Badge>}
                          <Badge variant="info">{inq.source}</Badge>
                        </div>
                        <h3 className="text-lg font-bold">{inq.name}</h3>
                        <p className="text-sm text-bark/60">Interested in: <span className="font-bold text-bark">{inq.type}</span></p>
                      </div>

                      <div className="flex flex-col md:items-end gap-3">
                        <div className="flex items-center gap-4 text-xs text-bark/40 font-medium">
                          <div className="flex items-center gap-1.5"><Clock size={14} /> Received {inq.responseTime} ago</div>
                          <button onClick={() => handleDelete(inq.id)} className="text-rose hover:text-rose/80"><Trash2 size={14} /></button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline">View Thread</Button>
                          <Button 
                            onClick={() => handleConvert(inq.id, inq.name)}
                            className="flex items-center gap-2 group"
                          >
                            Convert to Booking <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center text-bark/30 italic">No inquiries found.</div>
            )}
          </AnimatePresence>
          
          {filteredInquiries.length > 5 && (
            <div className="text-center py-8">
              <Button variant="ghost" className="text-bark/40">Load More Inquiries</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
