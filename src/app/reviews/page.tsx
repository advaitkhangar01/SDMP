"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn, Input } from "@/components/ui";
import { Star, MessageCircle, Share2, ThumbsUp, MoreHorizontal, Filter, Search, BarChart3, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsPage() {
  const { reviews, addReviewResponse } = useAppStore();
  const { toast } = useToast();
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (index: number) => {
    if (!replyText.trim()) return;
    addReviewResponse(index, replyText);
    setReplyingTo(null);
    setReplyText("");
    toast("Response sent to guest", "success");
  };

  const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bark">Guest Feedback</h2>
          <p className="text-sm text-bark/40">Monitor and respond to guest reviews across platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-10"><BarChart3 size={16} /> Sentiment Analysis</Button>
          <Button className="bg-bark text-cream">Export Reviews</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 text-center space-y-4 shadow-premium border-none">
            <h3 className="text-[10px] font-bold text-bark/40 uppercase tracking-widest">Average Rating</h3>
            <div className="text-5xl font-serif font-bold text-gold">{avgRating.toFixed(1)}</div>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className={cn(i <= Math.round(avgRating) ? "fill-gold text-gold" : "text-bark/10")} />)}
            </div>
            <p className="text-xs text-bark/40">Based on global feedback</p>
          </Card>

          <Card className="p-6 border-none shadow-premium">
            <h3 className="text-xs font-bold text-bark/40 uppercase tracking-widest mb-6">Review Highlights</h3>
            <div className="space-y-4">
              {[
                { label: "Hospitality", val: 98, color: "bg-sage" },
                { label: "Cleanliness", val: 96, color: "bg-gold" },
                { label: "Food Quality", val: 92, color: "bg-sky" },
                { label: "Location", val: 95, color: "bg-amber" },
              ].map((h, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>{h.label}</span>
                    <span>{h.val}%</span>
                  </div>
                  <div className="w-full h-1 bg-bark/5 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", h.color)} style={{ width: `${h.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bark/30 w-4 h-4" />
              <input type="text" placeholder="Search review content..." className="pl-10 pr-4 py-2 bg-white border border-bark/5 rounded-xl text-sm w-full outline-none focus:ring-1 focus:ring-gold/20" />
            </div>
            <Button variant="outline" className="flex items-center gap-2 h-10"><Filter size={16} /> All Ratings</Button>
          </div>

          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 space-y-4 hover:shadow-md transition-all border-none shadow-sm relative">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center font-bold text-gold">
                        {review.guest.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{review.guest}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} size={10} className={cn(j < review.rating ? "fill-gold text-gold" : "text-bark/10")} />
                            ))}
                          </div>
                          <span className="text-[10px] text-bark/40">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-bark/20 hover:text-bark/40"><MoreHorizontal size={18} /></button>
                  </div>
                  
                  <p className="text-sm text-bark/70 leading-relaxed italic">"{review.comment}"</p>

                  {review.response && (
                    <div className="bg-bark/5 p-4 rounded-xl border-l-2 border-gold ml-4">
                      <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Our Response</p>
                      <p className="text-xs text-bark/60">{review.response}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-bark/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setReplyingTo(replyingTo === i ? null : i)}
                        className={cn(
                          "flex items-center gap-1.5 text-[10px] font-bold transition-colors",
                          review.response ? "text-sage" : "text-bark/40 hover:text-gold"
                        )}
                      >
                        <MessageCircle size={14} /> {review.response ? "Response Sent" : "Reply"}
                      </button>
                      <button className="flex items-center gap-1.5 text-[10px] font-bold text-bark/40 hover:text-gold transition-colors">
                        <Share2 size={14} /> Share
                      </button>
                    </div>
                    <Badge variant="gold" className="text-[9px]">Verified Stay</Badge>
                  </div>

                  <AnimatePresence>
                    {replyingTo === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 flex gap-2">
                          <Input 
                            placeholder="Write your professional response..." 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="bg-white"
                          />
                          <Button onClick={() => handleReply(i)} className="shrink-0 h-10 w-10 p-0 flex items-center justify-center">
                            <Send size={16} />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
