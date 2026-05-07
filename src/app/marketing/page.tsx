"use client";

import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn } from "@/components/ui";
import { 
  Megaphone, 
  TrendingUp, 
  Users, 
  Target, 
  MousePointer2, 
  ArrowUpRight, 
  BarChart3, 
  Settings,
  Power
} from "lucide-react";
import { ResponsiveContainer, XAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const performanceData = [
  { date: "May 01", spend: 4000, leads: 12 },
  { date: "May 02", spend: 3500, leads: 15 },
  { date: "May 03", spend: 5000, leads: 18 },
  { date: "May 04", spend: 4200, leads: 14 },
  { date: "May 05", spend: 6000, leads: 22 },
  { date: "May 06", spend: 5500, leads: 20 },
  { date: "May 07", spend: 7000, leads: 28 },
];

export default function MarketingPage() {
  const { campaigns, toggleCampaign } = useAppStore();
  const { toast } = useToast();

  const handleToggle = (name: string, currentStatus: string) => {
    toggleCampaign(name);
    toast(`Campaign ${currentStatus === "Active" ? "paused" : "resumed"}`, "info");
  };

  const totalSpend = campaigns.reduce((acc, c) => acc + parseInt(c.spend.replace(/[^0-9]/g, "")), 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leads, 0);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Meta Ads Performance</h2>
          <p className="text-sm text-bark/40">Track ad spend, leads, and conversion attribution</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-10"><Settings size={16} /> Pixel Config</Button>
          <Button className="bg-bark text-cream">Sync Ad Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Ad Spend", value: `₹${(totalSpend/1000).toFixed(1)}K`, icon: Megaphone, color: "text-gold", sub: "May Performance" },
          { label: "Lead Generation", value: totalLeads.toString(), icon: Users, color: "text-sky", sub: "9.2% Conv. Rate" },
          { label: "Avg. CPL", value: "₹198", icon: Target, color: "text-rose", sub: "Goal: < ₹250" },
          { label: "Marketing ROAS", value: "12.4x", icon: TrendingUp, color: "text-sage", sub: "+2.4x from Apr" },
        ].map((stat, i) => (
          <Card key={i} className="flex flex-col gap-3 border-none shadow-premium">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-xl bg-bark/[0.03]", stat.color)}><stat.icon size={20} /></div>
              <span className="text-[10px] font-bold text-sage bg-sage/10 px-1.5 py-0.5 rounded-md">+12%</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-serif font-bold mt-1">{stat.value}</p>
              <p className="text-[10px] text-bark/40 mt-1">{stat.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-premium">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif font-bold">Leads vs Spend Trend</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gold">
                <div className="w-3 h-3 rounded-full bg-gold" /> Ad Spend
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-sky">
                <div className="w-3 h-3 rounded-full bg-sky" /> Leads
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9973A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C9973A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3D6A8A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3D6A8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(44,31,14,0.05)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(44,31,14,0.4)" }} />
                <Tooltip />
                <Area type="monotone" dataKey="spend" stroke="#C9973A" fillOpacity={1} fill="url(#colorSpend)" strokeWidth={2} />
                <Area type="monotone" dataKey="leads" stroke="#3D6A8A" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-premium">
          <h3 className="text-lg font-serif font-bold mb-6">Source Performance</h3>
          <div className="space-y-6">
            {[
              { source: "Meta (FB/IG)", leads: 850, rev: "₹18L", p: 70 },
              { source: "Google Search", leads: 240, rev: "₹12L", p: 20 },
              { source: "Direct/Other", leads: 150, rev: "₹8L", p: 10 },
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-sm font-bold">{s.source}</h4>
                    <p className="text-[10px] text-bark/40 font-bold uppercase tracking-widest">{s.leads} Leads Generated</p>
                  </div>
                  <span className="text-sm font-bold text-gold">{s.rev}</span>
                </div>
                <div className="w-full h-1.5 bg-bark/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.p}%` }} className="h-full bg-gold rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-8 flex items-center justify-center gap-2">
            <BarChart3 size={16} /> Full Attribution Report
          </Button>
        </Card>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold">Campaign Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {campaigns.map((camp, i) => (
              <motion.div
                layout
                key={camp.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-6 space-y-4 relative overflow-hidden group border-none shadow-premium">
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold leading-tight pr-8">{camp.name}</h4>
                      <Badge variant={camp.status === "Active" ? "success" : "warning"}>{camp.status}</Badge>
                    </div>
                    <button 
                      onClick={() => handleToggle(camp.name, camp.status)}
                      className={cn(
                        "p-2 rounded-xl transition-all relative z-20",
                        camp.status === "Active" ? "bg-rose/10 text-rose hover:bg-rose/20" : "bg-sage/10 text-sage hover:bg-sage/20"
                      )}
                    >
                      <Power size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Spend</p>
                      <p className="text-sm font-bold">{camp.spend}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Leads</p>
                      <p className="text-sm font-bold">{camp.leads}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Bookings</p>
                      <p className="text-sm font-bold text-sage">{camp.bookings}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">ROAS</p>
                      <p className="text-sm font-bold text-gold">{camp.roas}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-bark/5 flex justify-between items-center relative z-10">
                    <p className="text-[10px] text-bark/40 font-medium">Updated 2h ago</p>
                    <button className="text-xs font-bold text-gold hover:underline flex items-center gap-1">
                      Manage Ads <ArrowUpRight size={12} />
                    </button>
                  </div>
                  
                  <div className={cn(
                    "absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl transition-all",
                    camp.status === "Active" ? "bg-gold/5 group-hover:bg-gold/10" : "bg-bark/5"
                  )} />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
