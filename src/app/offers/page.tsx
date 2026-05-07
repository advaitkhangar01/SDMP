"use client";

import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn } from "@/components/ui";
import { Ticket, Plus, Copy, Trash2, Calendar, Users, TrendingUp, MoreVertical, Power } from "lucide-react";
import { motion } from "framer-motion";

export default function OffersPage() {
  const { offers, toggleOffer } = useAppStore();
  const { toast } = useToast();

  const handleToggle = (code: string, currentStatus: string) => {
    toggleOffer(code);
    toast(`Offer ${code} is now ${currentStatus === "Active" ? "Paused" : "Active"}`, "info");
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast("Promo code copied to clipboard", "success");
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Promotions & Coupons</h2>
          <p className="text-sm text-bark/40">Create and manage guest discount codes</p>
        </div>
        <Button className="flex items-center gap-2"><Plus size={16} /> Create Coupon</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Coupons", value: offers.filter(o => o.status === "Active").length, icon: Ticket },
          { label: "Total Savings", value: "₹4.8L", icon: TrendingUp },
          { label: "Coupon Usage", value: offers.reduce((acc, o) => acc + o.usage, 0), icon: Users },
          { label: "Avg. Discount", value: "14%", icon: Ticket },
        ].map((stat, i) => (
          <Card key={i} className="flex flex-col gap-2 bg-white border-none shadow-sm">
            <div className="p-2 bg-gold/5 rounded-lg w-fit text-gold"><stat.icon size={20} /></div>
            <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.code}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-0 overflow-hidden group border-none shadow-premium">
              <div className="flex">
                <div className={cn(
                  "w-32 p-6 flex flex-col items-center justify-center border-r border-dashed transition-colors",
                  offer.status === "Active" ? "bg-bark text-cream border-cream/20" : "bg-bark/10 text-bark/40 border-bark/20"
                )}>
                  <Ticket size={24} className={offer.status === "Active" ? "text-gold" : "text-bark/20"} />
                  <p className="text-center font-serif font-bold text-lg leading-tight mt-2">{offer.discount}</p>
                </div>
                
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-mono font-bold text-bark text-lg tracking-wider">{offer.code}</h3>
                        <button 
                          onClick={() => handleCopy(offer.code)}
                          className="p-1 hover:bg-bark/5 rounded text-bark/30 hover:text-gold transition-colors"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                      <Badge variant={offer.status === "Active" ? "success" : "warning"}>{offer.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggle(offer.code, offer.status)}
                        className={cn(
                          "p-2 rounded-xl transition-all",
                          offer.status === "Active" ? "bg-amber/10 text-amber hover:bg-amber/20" : "bg-sage/10 text-sage hover:bg-sage/20"
                        )}
                        title={offer.status === "Active" ? "Pause" : "Resume"}
                      >
                        <Power size={16} />
                      </button>
                      <button className="p-2 hover:bg-bark/5 rounded-xl text-bark/30"><MoreVertical size={16} /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Type</p>
                      <p className="text-xs font-bold">{offer.type}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Expires</p>
                      <p className="text-xs font-bold flex items-center justify-end gap-1"><Calendar size={10} /> {offer.expiry}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-bark/40">USAGE LIMIT</span>
                      <span>{offer.usage} / {offer.limit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-bark/5 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          offer.status !== "Active" ? "bg-bark/10" :
                          typeof offer.limit === "number" && (offer.usage / offer.limit) > 0.8 ? "bg-rose" : "bg-gold"
                        )} 
                        style={{ width: typeof offer.limit === "number" ? `${(offer.usage / offer.limit) * 100}%` : "100%" }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
