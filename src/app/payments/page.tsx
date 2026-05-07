"use client";

import { useState, useMemo } from "react";
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
  Calendar,
  Wallet,
  Clock,
  TrendingUp,
  X,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentsPage() {
  const { payments, addPayment, expenses, addExpense } = useAppStore();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("Revenue");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const [newPayment, setNewPayment] = useState({ guest: "", amount: "", method: "Razorpay" });
  const [newExpense, setNewExpense] = useState({ category: "Utilities", amount: "", notes: "" });

  const filteredPayments = useMemo(() => {
    return payments.filter(p => 
      p.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [payments, searchQuery]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => 
      e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [expenses, searchQuery]);

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TXN-${Math.floor(Math.random() * 9000) + 1000}`;
    addPayment({
      ...newPayment,
      id,
      amount: `₹${parseInt(newPayment.amount).toLocaleString()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "Completed"
    });
    setIsModalOpen(false);
    setNewPayment({ guest: "", amount: "", method: "Razorpay" });
    toast("Payment recorded successfully!", "success");
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      ...newExpense,
      amount: parseInt(newExpense.amount),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    setIsExpenseModalOpen(false);
    setNewExpense({ category: "Utilities", amount: "", notes: "" });
    toast("Expense recorded successfully", "success");
  };

  const totalRevenue = payments.reduce((acc, p) => {
    const val = parseInt(p.amount.replace(/[^0-9]/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Financial Command Center</h2>
          <p className="text-sm text-bark/40">Track every rupee in and out of Sunrise Villa</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2"><Download size={16} /> Export Tally</Button>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-bark/5">
            <button 
              onClick={() => setActiveTab("Revenue")}
              className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", activeTab === "Revenue" ? "bg-gold text-white" : "text-bark/40")}
            >
              Revenue
            </button>
            <button 
              onClick={() => setActiveTab("Expenses")}
              className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", activeTab === "Expenses" ? "bg-rose text-white" : "text-bark/40")}
            >
              Expenses
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Net Profit (May)", value: `₹${((totalRevenue - totalExpenses)/100000).toFixed(1)}L`, icon: TrendingUp, trend: "+15%" },
          { label: "Gross Revenue", value: `₹${(totalRevenue/100000).toFixed(1)}L`, icon: DollarSign, trend: "+12%" },
          { label: "Total Expenses", value: `₹${(totalExpenses/1000).toFixed(0)}K`, icon: Wallet, trend: "+3%" },
          { label: "Pending Collection", value: "₹4.2L", icon: Clock, trend: "-2%" },
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

      <div className="flex justify-end">
        {activeTab === "Revenue" ? (
          <Button onClick={() => setIsModalOpen(true)} className="bg-bark text-cream gap-2">
            <ArrowDownLeft size={16} /> Record Payment
          </Button>
        ) : (
          <Button onClick={() => setIsExpenseModalOpen(true)} className="bg-rose text-white gap-2 shadow-lg shadow-rose/10 border-none">
            <ArrowUpRight size={16} /> Record Expense
          </Button>
        )}
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-premium">
        <div className="p-6 border-b border-bark/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bark/30 w-4 h-4" />
            <input 
              type="text" 
              placeholder={activeTab === "Revenue" ? "Search payments..." : "Search expenses..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-bark/5 rounded-xl text-sm w-full outline-none focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 text-xs"><Filter size={14} /> Filter By Date</Button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {activeTab === "Revenue" ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bark/[0.02] border-b border-bark/5">
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Transaction ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Guest</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Method</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bark/5 bg-white">
                <AnimatePresence mode="popLayout">
                  {filteredPayments.map((payment) => (
                    <motion.tr layout key={payment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hover:bg-bark/[0.01] transition-colors group">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-gold">{payment.id}</td>
                      <td className="px-6 py-4 text-sm font-bold">{payment.guest}</td>
                      <td className="px-6 py-4 text-sm font-bold">{payment.amount}</td>
                      <td className="px-6 py-4 text-sm text-bark/60">{payment.date}</td>
                      <td className="px-6 py-4 text-sm font-medium">{payment.method}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 hover:bg-gold/10 text-gold rounded-lg transition-colors"><ArrowUpRight size={16} /></button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bark/[0.02] border-b border-bark/5">
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Expense ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-bark/40 uppercase tracking-widest">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bark/5 bg-white">
                <AnimatePresence mode="popLayout">
                  {filteredExpenses.map((expense) => (
                    <motion.tr layout key={expense.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hover:bg-bark/[0.01] transition-colors group">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-rose">{expense.id}</td>
                      <td className="px-6 py-4 text-sm font-bold"><Badge variant="outline">{expense.category}</Badge></td>
                      <td className="px-6 py-4 text-sm font-bold text-rose">₹{expense.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-bark/60">{expense.date}</td>
                      <td className="px-6 py-4 text-sm italic text-bark/40">"{expense.notes}"</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Payment Modal */}
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
            <Button type="submit" className="flex-1 bg-bark text-cream">Confirm & Record</Button>
          </div>
        </form>
      </Modal>

      {/* Expense Modal */}
      <Modal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} title="Record Business Expense">
        <form onSubmit={handleAddExpense} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-bark/60 uppercase tracking-widest px-1">Expense Category</label>
            <select 
              className="w-full px-4 py-2.5 bg-white border border-bark/10 rounded-xl text-sm focus:ring-1 focus:ring-gold/20 outline-none"
              value={newExpense.category}
              onChange={e => setNewExpense({...newExpense, category: e.target.value})}
            >
              <option>Utilities (Elec/Water)</option>
              <option>F&B / Groceries</option>
              <option>Staff Salary</option>
              <option>Maintenance & Repairs</option>
              <option>Marketing / Ads</option>
              <option>Other</option>
            </select>
          </div>
          <Input 
            label="Amount" 
            type="number" 
            placeholder="0.00" 
            required 
            value={newExpense.amount}
            onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
          />
          <Input 
            label="Notes / Description" 
            placeholder="e.g. AC Gas Refill for Villa" 
            value={newExpense.notes}
            onChange={e => setNewExpense({...newExpense, notes: e.target.value})}
          />
          <div className="pt-4 flex gap-3">
            <Button variant="outline" type="button" onClick={() => setIsExpenseModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1 bg-rose text-white">Record Expense</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
