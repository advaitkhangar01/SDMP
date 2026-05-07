"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ToastProvider } from "@/components/ui/Toast";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Get title from pathname
  const titleMap: Record<string, string> = {
    "/": "Executive Overview",
    "/bookings": "Bookings Management",
    "/calendar": "Availability Calendar",
    "/payments": "Financial Insights",
    "/guests": "Guest Relations (CRM)",
    "/inquiries": "Inquiry Inbox",
    "/crm": "CRM Pipeline",
    "/events": "Event Management",
    "/tasks": "Operational Tasks",
    "/reviews": "Guest Reviews",
    "/marketing": "Marketing Analytics",
    "/offers": "Offers & Coupons",
    "/reports": "Business Reports",
    "/settings": "System Settings",
  };

  const title = titleMap[pathname] || "Dashboard";

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-cream selection:bg-gold/20">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header title={title} />
          <main className="flex-1 p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
