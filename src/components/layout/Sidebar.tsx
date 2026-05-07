"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  Kanban, 
  CreditCard, 
  Briefcase, 
  ClipboardList, 
  Star, 
  Megaphone, 
  Ticket, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BedDouble
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/components/ui";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: BedDouble, label: "Bookings", href: "/bookings" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: Users, label: "Guests", href: "/guests" },
  { icon: MessageSquare, label: "Inquiries", href: "/inquiries" },
  { icon: Kanban, label: "CRM Pipeline", href: "/crm" },
  { icon: Briefcase, label: "Events", href: "/events" },
  { icon: ClipboardList, label: "Tasks", href: "/tasks" },
  { icon: Star, label: "Reviews", href: "/reviews" },
  { icon: Megaphone, label: "Marketing", href: "/marketing" },
  { icon: Ticket, label: "Offers", href: "/offers" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-bark h-screen sticky top-0 flex flex-col transition-all duration-300 ease-in-out border-r border-gold/10 z-50"
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-cream/5 border border-gold/20">
              <Image 
                src="/logo.png" 
                alt="Sunrise Farms Logo" 
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-cream font-serif font-bold text-lg leading-tight tracking-tight">SUNRISE</span>
              <span className="text-gold font-sans font-bold text-[10px] tracking-[0.2em] uppercase leading-none">Farms</span>
            </div>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="relative w-12 h-12 overflow-hidden mx-auto">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              fill
              className="object-contain"
            />
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-cream/5 text-cream/50 hover:bg-cream/10 hover:text-cream transition-colors absolute -right-3 top-20 border border-gold/20"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-item group relative",
                isActive && "active",
                isCollapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-cream" : "text-cream/50 group-hover:text-cream"
              )} />
              {!isCollapsed && (
                <span className="ml-3 font-medium text-sm">{item.label}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-6 px-2 py-1 bg-bark text-cream text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] border border-gold/20">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="p-4 m-4 rounded-xl bg-gold/10 border border-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
              YP
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-cream truncate">Yashika Pachisia</p>
              <p className="text-[10px] text-gold/80 truncate">General Manager</p>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
}
