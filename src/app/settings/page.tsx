"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, Input, cn } from "@/components/ui";
import { 
  Building2, 
  CreditCard, 
  Users, 
  Bell, 
  Link as LinkIcon, 
  Target, 
  CheckCircle2, 
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck,
  Globe,
  Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("marketing");
  const [showToken, setShowToken] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: "property", label: "Property Info", icon: Building2 },
    { id: "pricing", label: "Pricing & Plans", icon: CreditCard },
    { id: "staff", label: "Staff & Roles", icon: Users },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "marketing", label: "Meta Marketing", icon: Target },
    { id: "data", label: "Data Safety", icon: ShieldCheck },
  ];

  const handleExportData = () => {
    const data = localStorage.getItem("savera-retreat-storage");
    if (!data) return toast("No data found to export", "error");
    
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sunrise_farms_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast("Backup downloaded successfully", "success");
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.state) throw new Error("Invalid backup format");
        localStorage.setItem("savera-retreat-storage", JSON.stringify(json));
        toast("Data imported! Reloading...", "success");
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        toast("Error importing data: " + (err as Error).message, "error");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("CRITICAL: This will wipe all bookings, guests, and expenses. Are you absolutely sure?")) {
      localStorage.removeItem("savera-retreat-storage");
      window.location.reload();
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Settings updated successfully", "success");
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeSection === s.id ? "bg-gold text-white shadow-gold" : "hover:bg-bark/5 text-bark/60"
              )}
            >
              <s.icon size={18} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 max-w-4xl bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-bark/5 min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeSection === "marketing" ? (
              <motion.div
                key="marketing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-bark">Meta Marketing Config</h3>
                      <p className="text-sm text-bark/40">Connect your Meta Pixel and Conversions API</p>
                    </div>
                    <Badge variant="success" className="flex items-center gap-1"><ShieldCheck size={12} /> Verified</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Meta Pixel ID" defaultValue="884210549210" />
                    <Input label="Business Manager ID" defaultValue="BM-2294103" />
                    <Input label="Dataset (CAPI) ID" defaultValue="DS_SUNRISE_FARMS" />
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-bark/60 uppercase tracking-widest px-1">Attribution Window</label>
                      <select className="w-full px-4 py-2.5 bg-white border border-bark/10 rounded-xl text-sm focus:ring-1 focus:ring-gold/20 outline-none">
                        <option>7-day click, 1-day view</option>
                        <option>1-day click</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-bark/60 uppercase tracking-widest px-1">Access Token</label>
                      <div className="relative mt-1.5">
                        <input 
                          type={showToken ? "text" : "password"} 
                          defaultValue="EAAGm0PX4ZCpsBAK5q8x2h7L1N9p2R3v4w5x6y7z8a9b0c1d2e3f4" 
                          className="w-full px-4 py-2.5 bg-white border border-bark/10 rounded-xl text-sm font-mono focus:ring-1 focus:ring-gold/20 outline-none" 
                        />
                        <button onClick={() => setShowToken(!showToken)} className="absolute right-3 top-1/2 -translate-y-1/2 text-bark/30 hover:text-gold">
                          {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="pt-6 border-t border-bark/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <div className="flex items-center gap-2 text-sage"><CheckCircle2 size={16} /> Healthy</div>
                    <div className="flex items-center gap-2 text-bark/40"><RefreshCw size={16} /> 12m ago</div>
                  </div>
                  <Button onClick={handleSave} disabled={isSaving} className="bg-gold px-8 shadow-gold">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </motion.div>
            ) : activeSection === "data" ? (
              <motion.div
                key="data"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-bark">Data Safety & Backups</h3>
                  <p className="text-sm text-bark/40">Protect your business records and management state.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section className="p-6 bg-white rounded-3xl border border-bark/5 space-y-4">
                    <div className="w-12 h-12 bg-sage/10 text-sage rounded-2xl flex items-center justify-center">
                      <Save size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">Manual Backup</h4>
                      <p className="text-xs text-bark/40">Download a JSON file containing all your local data.</p>
                    </div>
                    <Button onClick={handleExportData} variant="outline" className="w-full">Download Backup</Button>
                  </section>

                  <section className="p-6 bg-white rounded-3xl border border-bark/5 space-y-4">
                    <div className="w-12 h-12 bg-sky/10 text-sky rounded-2xl flex items-center justify-center">
                      <RefreshCw size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">Restore System</h4>
                      <p className="text-xs text-bark/40">Upload a previous backup file to restore your state.</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={handleImportData} 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <Button variant="outline" className="w-full">Upload & Restore</Button>
                    </div>
                  </section>
                </div>

                <div className="p-8 bg-rose/5 rounded-3xl border border-rose/10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose/10 text-rose rounded-2xl flex items-center justify-center shrink-0">
                      <Target size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-rose">Factory Reset</h4>
                      <p className="text-xs text-rose/60">Permanently delete all local data and return to default state. This action cannot be undone.</p>
                    </div>
                  </div>
                  <Button onClick={handleReset} className="bg-rose text-white hover:bg-rose/90 border-none px-8">Wipe All Data</Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="other"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20"
              >
                <div className="w-20 h-20 bg-bark/5 rounded-3xl flex items-center justify-center text-bark/20">
                  {(() => {
                    const Icon = sections.find(s => s.id === activeSection)?.icon;
                    return Icon ? <Icon size={40} /> : null;
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold">Customize {sections.find(s => s.id === activeSection)?.label}</h3>
                  <p className="text-sm text-bark/40 max-w-xs mx-auto">Update your preferences and global settings for this module.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                  <Input label="Section Title" placeholder="Enter title..." />
                  <div className="flex items-center justify-between p-4 bg-bark/5 rounded-2xl">
                    <span className="text-sm font-medium">Enable Cloud Sync</span>
                    <div className="w-10 h-5 bg-gold rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                  </div>
                  <Button onClick={handleSave} className="bg-bark text-cream mt-4 flex items-center justify-center gap-2">
                    <Save size={16} /> Update Preferences
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
