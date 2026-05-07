"use client";

import { useAppStore } from "@/lib/store";
import { Card, Badge, Button, cn } from "@/components/ui";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar as CalendarIcon, 
  Users, 
  MessageSquare, 
  Star,
  ArrowUpRight,
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { bookings, inquiries, campaigns, reviews } = useAppStore();

  // Derived KPIs
  const totalRevenue = bookings.reduce((acc, curr) => {
    const val = parseInt(curr.amount.replace(/[^0-9]/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const activeBookings = bookings.filter(b => b.status !== "Cancelled").length;
  const pendingInquiries = inquiries.length;
  const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  const kpis = [
    { label: "Total Revenue", value: `₹${(totalRevenue / 100000).toFixed(2)}L`, change: "+12.5%", trendingUp: true, icon: DollarSign },
    { label: "Total Stays", value: activeBookings.toString(), change: "+4.2%", trendingUp: true, icon: CalendarIcon },
    { label: "Active Leads", value: pendingInquiries.toString(), change: "+18.4%", trendingUp: true, icon: Users },
    { label: "Pending Tasks", value: "24", change: "-2.1%", trendingUp: false, icon: MessageSquare },
    { label: "Guest Satisfaction", value: avgRating.toFixed(1), change: "+0.2", trendingUp: true, icon: Star },
  ];

  const bookingTypeData = [
    { name: "Villa", value: bookings.filter(b => b.type === "Villa").length, color: "#C9973A" },
    { name: "Luxury Suite", value: bookings.filter(b => b.type === "Luxury Suite").length, color: "#2C1F0E" },
    { name: "Garden Room", value: bookings.filter(b => b.type === "Garden Room").length, color: "#5A7A5C" },
  ];

  const revenueData = [
    { name: "Jan", revenue: 1800000 },
    { name: "Feb", revenue: 2100000 },
    { name: "Mar", revenue: 1950000 },
    { name: "Apr", revenue: 2450000 },
    { name: "May", revenue: totalRevenue }, // Dynamic current month
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="flex flex-col gap-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <kpi.icon size={40} />
              </div>
              <span className="text-xs font-bold text-bark/40 uppercase tracking-wider">{kpi.label}</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-serif font-bold">{kpi.value}</span>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded-md",
                  kpi.trendingUp ? "text-sage bg-sage/10" : "text-rose bg-rose/10"
                )}>
                  {kpi.trendingUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.change}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-serif font-bold">Revenue Performance</h3>
              <p className="text-sm text-bark/40">Real-time revenue tracking from Bookings</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(44,31,14,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(44,31,14,0.4)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(44,31,14,0.4)" }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#C9973A" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-serif font-bold mb-1">Booking Distribution</h3>
          <p className="text-sm text-bark/40 mb-8">By accommodation type</p>
          <div className="h-[240px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {bookingTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">{bookings.length}</span>
              <span className="text-[10px] text-bark/40 uppercase font-bold tracking-widest">Total</span>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {bookingTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Marketing Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold">Marketing Performance</h3>
            <p className="text-sm text-bark/40">Campaign health and conversion metrics</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            View Full Report <ArrowUpRight size={16} />
          </Button>
        </div>

        <Card className="overflow-hidden p-0 border-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-bark/5 border-b border-bark/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-bark/40 uppercase">Campaign</th>
                  <th className="px-6 py-4 text-xs font-bold text-bark/40 uppercase">Spend</th>
                  <th className="px-6 py-4 text-xs font-bold text-bark/40 uppercase">Leads</th>
                  <th className="px-6 py-4 text-xs font-bold text-bark/40 uppercase">ROAS</th>
                  <th className="px-6 py-4 text-xs font-bold text-bark/40 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bark/5">
                {campaigns.map((camp, i) => (
                  <tr key={i} className="hover:bg-bark/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-medium text-sm">{camp.name}</td>
                    <td className="px-6 py-4 text-sm">{camp.spend}</td>
                    <td className="px-6 py-4 text-sm">{camp.leads}</td>
                    <td className="px-6 py-4 text-sm font-bold text-sage">{camp.roas}</td>
                    <td className="px-6 py-4">
                      <Badge variant={camp.status === "Active" ? "success" : "warning"}>{camp.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
