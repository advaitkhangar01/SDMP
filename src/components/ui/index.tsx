import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("luxury-card p-6", className)}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = "default", className }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" | "gold" | "outline"; className?: string }) {
  const variants = {
    default: "bg-bark/10 text-bark",
    success: "bg-sage/10 text-sage",
    warning: "bg-amber/10 text-amber",
    danger: "bg-rose/10 text-rose",
    info: "bg-sky/10 text-sky",
    gold: "bg-gold/10 text-gold",
    outline: "border border-bark/20 text-bark bg-transparent",
  };
  
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}

export function Button({ children, variant = "primary", className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost" }) {
  const variants = {
    primary: "bg-gold text-white hover:bg-gold/90 shadow-gold",
    secondary: "bg-bark text-cream hover:bg-bark/90",
    outline: "border border-bark/20 hover:bg-bark/5 text-bark",
    ghost: "hover:bg-bark/5 text-bark",
  };
  
  return (
    <button className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-50", variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function Input({ label, error, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-xs font-bold text-bark/60 uppercase tracking-widest px-1">{label}</label>}
      <input 
        className={cn(
          "w-full px-4 py-2.5 bg-white border border-bark/10 rounded-xl text-sm focus:ring-1 focus:ring-gold/20 outline-none transition-all placeholder:text-bark/20",
          error && "border-rose focus:ring-rose/20",
          className
        )} 
        {...props} 
      />
      {error && <p className="text-[10px] text-rose font-medium px-1">{error}</p>}
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bark/40 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-cream w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
            >
              <div className="p-6 border-b border-bark/5 flex items-center justify-between bg-white">
                <h2 className="text-xl font-serif font-bold">{title}</h2>
                <button onClick={onClose} className="p-2 hover:bg-bark/5 rounded-full transition-colors">
                  <X size={20} className="text-bark/40" />
                </button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
