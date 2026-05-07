"use client";

import { useAppStore } from "@/lib/store";
import { Card, Badge, Button, cn } from "@/components/ui";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  PieChart, 
  ArrowDownLeft, 
  ArrowUpRight,
  Calculator,
  Building2,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const { bookings, payments, expenses } = useAppStore();

  const totalRevenue = payments.reduce((acc, p) => {
    const val = parseInt(p.amount.replace(/[^0-9]/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const occupancyRate = 78.4; // Mocked for now, but in real app would calculate from calendar

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Financial Intelligence</h2>
          <p className="text-sm text-bark/40">Profitability and operational audit for Sunrise Villa</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2"><Calendar size={16} /> May 2024</Button>
          <Button className="bg-bark text-cream flex items-center gap-2"><Download size={16} /> Master P&L Statement</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none shadow-premium bg-white group hover:bg-gold/5 transition-all">
          <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest mb-1">Gross Revenue</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-serif font-bold text-bark">₹{(totalRevenue/100000).toFixed(2)}L</h3>
            <ArrowDownLeft className="text-sage" size={24} />
          </div>
        </Card>
        <Card className="p-6 border-none shadow-premium bg-white group hover:bg-rose/5 transition-all">
          <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest mb-1">Total Expenses</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-serif font-bold text-bark">₹{(totalExpenses/1000).toFixed(1)}K</h3>
            <ArrowUpRight className="text-rose" size={24} />
          </div>
        </Card>
        <Card className="p-6 border-none shadow-premium bg-bark text-cream group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={64} />
          </div>
          <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1 relative z-10">Net Profit</p>
          <div className="flex items-end justify-between relative z-10">
            <h3 className="text-2xl font-serif font-bold text-gold">₹{(netProfit/100000).toFixed(2)}L</h3>
            <Badge variant="gold" className="text-[10px]">+14.2%</Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* P&L Breakdown */}
        <Card className="p-8 border-none shadow-premium bg-white space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-lg flex items-center gap-2">
              <Calculator size={20} className="text-gold" /> Profit & Loss Breakdown
            </h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-bark/[0.02] rounded-2xl">
              <span className="text-sm font-medium text-bark/60">Villa Stays (Revenue)</span>
              <span className="font-bold text-sage">+ ₹{(totalRevenue).toLocaleString()}</span>
            </div>
            
            <div className="space-y-2 px-2">
              <p className="text-[10px] font-bold text-bark/30 uppercase tracking-widest">Major Expenses</p>
              {expenses.map((exp, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-bark/5 last:border-0">
                  <span className="text-bark/60">{exp.category}</span>
                  <span className="font-bold text-rose">- ₹{exp.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-bark/10 flex justify-between items-center px-2">
              <span className="font-serif font-bold text-bark">Estimated Net Profit</span>
              <span className="text-xl font-serif font-bold text-gold">₹{netProfit.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Operational Metrics */}
        <Card className="p-8 border-none shadow-premium bg-white space-y-8">
          <h4 className="font-serif font-bold text-lg flex items-center gap-2">
            <BarChart3 size={20} className="text-gold" /> Operational KPI
          </h4>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-bark/40">
                <Building2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Occupancy</span>
              </div>
              <p className="text-3xl font-serif font-bold">{occupancyRate}%</p>
              <div className="w-full h-1.5 bg-bark/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${occupancyRate}%` }} className="h-full bg-gold" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-bark/40">
                <Users size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Guest Satisfaction</span>
              </div>
              <p className="text-3xl font-serif font-bold">4.8/5.0</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-4 h-1 bg-sage rounded-full" />)}
              </div>
            </div>
          </div>

          <div className="p-4 bg-bark text-cream rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Avg. Nightly Rate</p>
              <p className="text-xl font-serif font-bold">₹25,000</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-cream/40 uppercase tracking-widest">RevPAR</p>
              <p className="text-xl font-serif font-bold">₹19,600</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
