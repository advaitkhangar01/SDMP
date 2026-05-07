"use client";

import { Bell, Search, User, LogOut, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/components/ui";

export function Header({ title }: { title: string }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-20 bg-white/50 backdrop-blur-md border-b border-bark/5 sticky top-0 z-40 px-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif font-bold text-bark tracking-tight">{title}</h1>
        <div className="flex items-center gap-2 text-xs text-bark/40 mt-0.5">
          <span>Sunrise Farms</span>
          <span>/</span>
          <span className="capitalize">{title.toLowerCase()}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bark/30 group-focus-within:text-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="pl-10 pr-4 py-2 bg-bark/5 border-transparent focus:bg-white focus:border-gold/20 rounded-xl text-sm w-64 transition-all focus:ring-0 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl hover:bg-bark/5 flex items-center justify-center text-bark/60 relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose rounded-full border-2 border-white"></span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 rounded-xl bg-bark/5 overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-gold/20 transition-all"
            >
              <User size={20} className="text-bark/40" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-premium border border-bark/5 p-2 animate-in fade-in zoom-in duration-200">
                <div className="p-3 border-b border-bark/5 mb-1">
                  <p className="text-sm font-bold">Jaideep Singh</p>
                  <p className="text-xs text-bark/40">gm@sunrisefarmsnagpur.com</p>
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-bark/70 hover:bg-bark/5 rounded-lg transition-colors">
                  <User size={16} />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-bark/70 hover:bg-bark/5 rounded-lg transition-colors">
                  <SettingsIcon size={16} />
                  Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose hover:bg-rose/5 rounded-lg transition-colors mt-1">
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
