"use client";

import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button } from "@/components/ui";
import { Plus, MoreHorizontal, MessageSquare, Phone, MoreVertical, TrendingUp, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CRMPage() {
  const { crmPipeline, moveCRMCard } = useAppStore();
  const { toast } = useToast();

  const handleMove = (cardName: string, from: string, to: string) => {
    moveCRMCard(cardName, from, to);
    toast(`Moved ${cardName} to ${to}`, "info");
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-serif font-bold text-bark">Sales Pipeline</h2>
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-bark/10 flex items-center justify-center text-[10px] font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gold flex items-center justify-center text-[10px] font-bold text-white">
              +4
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Automation Rules</Button>
          <Button className="flex items-center gap-2"><Plus size={16} /> New Opportunity</Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-6 h-full min-w-max">
          {crmPipeline.map((column, i) => (
            <div key={i} className="w-80 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-bark/60">{column.stage}</h3>
                  <Badge variant="gold">{column.cards.length}</Badge>
                </div>
                <button className="text-bark/30 hover:text-bark transition-colors"><MoreHorizontal size={16} /></button>
              </div>

              <div className="flex-1 bg-bark/[0.02] rounded-2xl p-3 space-y-4 border border-bark/5 overflow-y-auto no-scrollbar">
                <AnimatePresence mode="popLayout">
                  {column.cards.map((card, j) => (
                    <motion.div
                      layout
                      key={card.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -4 }}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Card className="p-4 border-none shadow-sm space-y-4 bg-white hover:shadow-md transition-shadow relative group">
                        <div className="flex justify-between items-start">
                          <Badge variant="info">{card.source}</Badge>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {i > 0 && (
                              <button 
                                onClick={() => handleMove(card.name, column.stage, crmPipeline[i-1].stage)}
                                className="p-1 hover:bg-bark/5 rounded text-bark/40"
                              >
                                <ArrowLeft size={14} />
                              </button>
                            )}
                            {i < crmPipeline.length - 1 && (
                              <button 
                                onClick={() => handleMove(card.name, column.stage, crmPipeline[i+1].stage)}
                                className="p-1 hover:bg-bark/5 rounded text-bark/40"
                              >
                                <ArrowRight size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-bold">{card.name}</h4>
                          <p className="text-xs text-bark/40 mt-0.5">{card.event}</p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-bark/5">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gold">
                              <TrendingUp size={10} /> {card.amount}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-bark/40">
                              <Clock size={10} /> {card.days}d
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-bark/5 rounded-lg text-bark/40 transition-colors"><Phone size={12} /></button>
                            <button className="p-1.5 hover:bg-bark/5 rounded-lg text-bark/40 transition-colors"><MessageSquare size={12} /></button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <button className="w-full py-3 border-2 border-dashed border-bark/10 rounded-xl text-xs font-bold text-bark/30 hover:bg-white hover:border-gold/20 hover:text-gold transition-all">
                  + Add Opportunity
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
