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
  Power,
  Globe,
  PieChart as PieChartIcon,
  Filter,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { ResponsiveContainer, XAxis, Tooltip, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
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

const regionData = [
  { name: "Mumbai", value: 45, color: "#C9973A" },
  { name: "Delhi/NCR", value: 30, color: "#2C1F0E" },
  { name: "Bangalore", value: 15, color: "#5A7A5C" },
  { name: "Others", value: 10, color: "#E5E1DA" },
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
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
            <Megaphone size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-bark">Marketing Command Center</h2>
            <p className="text-sm text-bark/40">Performance tracking across Meta, Google & Direct channels</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-10"><Filter size={16} /> Date Range</Button>
          <Button className="bg-bark text-cream flex items-center gap-2 shadow-xl shadow-bark/20"><TrendingUp size={16} /> Optimize ROI</Button>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Ad Investment", value: `₹${(totalSpend/1000).toFixed(1)}K`, icon: TrendingUp, color: "text-gold", trend: "+14.2%" },
          { label: "Leads Generated", value: totalLeads.toString(), icon: Users, color: "text-sky", trend: "+8.5%" },
          { label: "Cost Per Lead", value: "₹198", icon: Target, color: "text-rose", trend: "-2.1%" },
          { label: "Marketing ROAS", value: "12.4x", icon: BarChart3, color: "text-sage", trend: "+1.2x" },
        ].map((stat, i) => (
          <Card key={i} className="flex flex-col gap-3 border-none shadow-premium relative group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-xl bg-bark/[0.03]", stat.color)}><stat.icon size={20} /></div>
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                stat.trend.startsWith("+") ? "text-sage bg-sage/10" : "text-rose bg-rose/10"
              )}>{stat.trend}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-serif font-bold mt-1">{stat.value}</p>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <stat.icon size={48} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attribution Chart */}
        <Card className="lg:col-span-2 border-none shadow-premium bg-white p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-lg font-serif font-bold">Inquiry Acquisition Trend</h3>
              <p className="text-xs text-bark/40">Correlation between daily spend and lead volume</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gold uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-gold" /> Daily Spend
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-sky uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-sky" /> Leads
              </div>
            </div>
          </div>
          <div className="h-[320px]">
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
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="spend" stroke="#C9973A" fillOpacity={1} fill="url(#colorSpend)" strokeWidth={3} />
                <Area type="monotone" dataKey="leads" stroke="#3D6A8A" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Channel Insights */}
        <Card className="border-none shadow-premium flex flex-col p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif font-bold">Regional Demand</h3>
            <Globe size={20} className="text-bark/20" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-bark">75%</span>
              <span className="text-[10px] text-bark/40 font-bold uppercase tracking-tighter">Tier 1 Cities</span>
            </div>
          </div>
          <div className="space-y-3 mt-8">
            {regionData.map((region) => (
              <div key={region.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-xs font-bold text-bark/60">{region.name}</span>
                </div>
                <span className="text-xs font-bold text-bark">{region.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Marketing Funnel */}
        <Card className="lg:col-span-1 border-none shadow-premium p-8 space-y-8">
          <h3 className="text-lg font-serif font-bold">Conversion Funnel</h3>
          <div className="space-y-4">
            {[
              { label: "Ad Impressions", val: "2.4M", p: 100, color: "bg-bark/10" },
              { label: "Link Clicks", val: "18.5K", p: 70, color: "bg-bark/20" },
              { label: "Leads Generated", val: "950", p: 40, color: "bg-gold" },
              { label: "Bookings", val: "142", p: 25, color: "bg-sage" },
            ].map((f, i) => (
              <div key={i} className="space-y-1.5 relative">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest px-1">
                  <span className="text-bark/40">{f.label}</span>
                  <span className="text-bark">{f.val}</span>
                </div>
                <div className="w-full h-8 bg-bark/[0.02] rounded-lg overflow-hidden border border-bark/5">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${f.p}%` }} 
                    className={cn("h-full opacity-80 flex items-center justify-end px-3", f.color)}
                  >
                    {i > 0 && <ChevronRight className="text-white/20" size={14} />}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 p-4 rounded-2xl bg-sage/5 border border-sage/10 text-center">
            <p className="text-[10px] font-bold text-sage uppercase tracking-widest mb-1">Overall Conversion ROI</p>
            <p className="text-2xl font-serif font-bold text-sage">14.2%</p>
          </div>
        </Card>

        {/* Campaign Management */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold">Strategic Campaigns</h3>
            <Button variant="outline" className="flex items-center gap-2"><Plus size={16} /> New Campaign</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {[
                { name: "Monsoon Wellness Escape", spend: "₹45,000", leads: 180, bookings: 12, roas: "12.4x", status: "Active" },
                { name: "Luxury Wedding Venue Ads", spend: "₹1,20,000", leads: 450, bookings: 5, roas: "8.2x", status: "Active" },
                { name: "Corporate Retreat Packages", spend: "₹32,000", leads: 120, bookings: 8, roas: "14.5x", status: "Paused" },
                { name: "Weekend Staycation Meta", spend: "₹28,000", leads: 200, bookings: 15, roas: "18.1x", status: "Active" },
              ].map((camp, i) => (
                <motion.div
                  layout
                  key={camp.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="p-6 space-y-6 relative overflow-hidden group border-none shadow-premium hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            camp.status === "Active" ? "bg-sage animate-pulse" : "bg-bark/20"
                          )} />
                          <h4 className="font-bold text-bark group-hover:text-gold transition-colors">{camp.name}</h4>
                        </div>
                        <Badge variant={camp.status === "Active" ? "success" : "warning"}>{camp.status}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-bark/5 hover:bg-bark/10 rounded-xl transition-colors"><ExternalLink size={14} /></button>
                        <button 
                          onClick={() => handleToggle(camp.name, camp.status)}
                          className={cn(
                            "p-2 rounded-xl transition-all",
                            camp.status === "Active" ? "bg-rose/10 text-rose hover:bg-rose/20" : "bg-sage/10 text-sage hover:bg-sage/20"
                          )}
                        >
                          <Power size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Investment</p>
                        <p className="text-sm font-bold">{camp.spend}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Efficiency</p>
                        <p className="text-sm font-bold text-gold">{camp.roas} <span className="text-[10px] text-bark/20 font-normal">ROAS</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-bark/5">
                      <div className="flex-1">
                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-1.5">
                          <span className="text-bark/40">Acquisition Success</span>
                          <span className="text-sage">{camp.bookings} Bookings</span>
                        </div>
                        <div className="w-full h-1.5 bg-bark/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${(camp.bookings/20)*100}%` }} 
                            className="h-full bg-sage rounded-full" 
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ size, className }: { size?: number, className?: string }) {
  return <ArrowRight size={size} className={cn("-rotate-45", className)} />
}
