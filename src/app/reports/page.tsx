"use client";

import { Card, Badge, Button } from "@/components/ui";
import { BarChart3, TrendingUp, Download, Calendar, Filter, PieChart, LineChart } from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Business Intelligence</h2>
          <p className="text-sm text-bark/40">Consolidated reports and performance auditing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2"><Calendar size={16} /> Last Quarter</Button>
          <Button className="bg-bark text-cream flex items-center gap-2"><Download size={16} /> Export Master Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "RevPAR", value: "₹18,400", trend: "+14.2%", icon: BarChart3 },
          { label: "GOPPAR", value: "₹12,100", trend: "+8.4%", icon: PieChart },
          { label: "Occupancy", value: "78.4%", trend: "+5.1%", icon: TrendingUp },
        ].map((stat, i) => (
          <Card key={i} className="flex flex-col gap-2 border-none shadow-premium group">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest">{stat.label}</p>
              <stat.icon size={16} className="text-gold/40 group-hover:text-gold transition-colors" />
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-serif font-bold">{stat.value}</p>
              <Badge variant="success" className="text-[10px]">{stat.trend}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <Card className="h-96 flex flex-col items-center justify-center text-center space-y-4 border-none shadow-premium bg-white">
        <div className="w-16 h-16 bg-gold/5 rounded-3xl flex items-center justify-center text-gold">
          <LineChart size={32} />
        </div>
        <div>
          <h3 className="text-lg font-serif font-bold">Comprehensive Analysis</h3>
          <p className="text-sm text-bark/40 max-w-xs mx-auto">We are aggregating your property data for the quarterly review. Check back in 24 hours.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} /> Configure Analytics Engine
        </Button>
      </Card>
    </div>
  );
}
