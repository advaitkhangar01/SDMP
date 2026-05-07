"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn, Input, Modal } from "@/components/ui";
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Calendar,
  Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentsPage() {
  const { payments, addPayment } = useAppStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({ guest: "", amount: "", method: "Razorpay" });

  const filteredPayments = payments.filter(p => 
    p.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TXN-${Math.floor(Math.random() * 9000) + 1000}`;
    addPayment({
      ...newPayment,
      id,
      amount: `₹${newPayment.amount}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "Completed"
    });
    setIsModalOpen(false);
    setNewPayment({ guest: "", amount: "", method: "Razorpay" });
    toast("Payment recorded successfully!", "success");
  };

  const totalRevenue = payments.reduce((acc, p) => {
    const val = parseInt(p.amount.replace(/[^0-9]/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Financial Overview</h2>
          <p className="text-sm text-bark/40">Track payments, GST filings, and revenue trends</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2"><Download size={16} /> Export Tally</Button>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-bark text-cream">
            <DollarSign size={16} /> Record Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue (May)", value: `₹${(totalRevenue/100000).toFixed(1)}L`, icon: DollarSign, trend: "+12%" },
          { label: "Pending Collection", value: "₹4.2L", icon: Wallet, trend: "-2%" },
          { label: "GST Liability", value: "₹1.8L", icon: CreditCard, trend: "+5%" },
          { label: "Avg. Daily Rate", value: "₹18,500", icon: Calendar, trend: "+8%" },
        ].map((stat, i) => (
          <Card key={i} className="flex flex-col gap-2 border-none shadow-premium relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={48} />
            </div>
            <p className="text-[10px] font-bold text-bark/40 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-serif font-bold">{stat.value}</p>
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                stat.trend.startsWith("+") ? "bg-sage/10 text-sage" : "bg-rose/10 text-rose"
              )}>
                {stat.trend}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-premium">
        <div className="p-6 border-b border-bark/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bark/30 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by Transaction ID or Guest..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-bark/5 rounded-xl text-sm w-full outline-none focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 text-xs"><Filter size={14} /> Filter By Date</Button>
            <Button variant="outline" className="flex items-center gap-2 text-xs"><Download size={14} /> PDF Invoices</Button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bark/[0.02] border-b border-bark/5">
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Guest</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Method</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bark/5 bg-white">
              <AnimatePresence mode="popLayout">
                {filteredPayments.map((payment) => (
                  <motion.tr 
                    layout
                    key={payment.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-bark/[0.01] transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-gold">{payment.id}</td>
                    <td className="px-6 py-4 text-sm font-bold">{payment.guest}</td>
                    <td className="px-6 py-4 text-sm font-bold">{payment.amount}</td>
                    <td className="px-6 py-4 text-sm text-bark/60">{payment.date}</td>
                    <td className="px-6 py-4 text-sm font-medium">{payment.method}</td>
                    <td className="px-6 py-4">
                      <Badge variant={payment.status === "Completed" ? "success" : "warning"}>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 hover:bg-gold/10 text-gold rounded-lg transition-colors">
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Manual Payment">
        <form onSubmit={handleAddPayment} className="space-y-6">
          <Input 
            label="Guest Name" 
            placeholder="Search from existing guests..." 
            required 
            value={newPayment.guest}
            onChange={e => setNewPayment({...newPayment, guest: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Amount Paid" 
              type="number" 
              placeholder="0.00" 
              required 
              value={newPayment.amount}
              onChange={e => setNewPayment({...newPayment, amount: e.target.value})}
            />
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-bark/60 uppercase tracking-widest px-1">Payment Method</label>
              <select 
                className="w-full px-4 py-2.5 bg-white border border-bark/10 rounded-xl text-sm focus:ring-1 focus:ring-gold/20 outline-none"
                value={newPayment.method}
                onChange={e => setNewPayment({...newPayment, method: e.target.value})}
              >
                <option>Razorpay</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>UPI</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1 bg-bark text-cream">Confirm & Generate Invoice</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
