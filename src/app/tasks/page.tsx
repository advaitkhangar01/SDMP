"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Card, Badge, Button, cn, Input, Modal } from "@/components/ui";
import { Plus, MoreHorizontal, Clock, CheckCircle2, AlertCircle, User, Filter, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useAppStore();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCol, setActiveCol] = useState("Todo");
  const [newTask, setNewTask] = useState({ title: "", assignee: "Yashika", priority: "Medium" });
  
  const columns = ["Todo", "In Progress", "Done"];

  const handleStatusMove = (id: number, currentStatus: string, direction: "left" | "right") => {
    const currentIndex = columns.indexOf(currentStatus);
    const nextIndex = direction === "right" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < columns.length) {
      updateTask(id, { status: columns[nextIndex] });
      toast(`Task moved to ${columns[nextIndex]}`, "success");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this task?")) {
      deleteTask(id);
      toast("Task deleted", "info");
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      ...newTask,
      status: activeCol,
      due: "Today"
    });
    setIsModalOpen(false);
    setNewTask({ title: "", assignee: "Admin", priority: "Medium" });
    toast("Task created", "success");
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-serif font-bold text-bark">Operational Tasks</h2>
          <div className="flex items-center gap-2">
            <Badge variant="info">{tasks.length} Total</Badge>
            <Badge variant="danger">{tasks.filter(t => t.due === "Today").length} Due Today</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-10"><Filter size={16} /> Filters</Button>
          <Button onClick={() => { setActiveCol("Todo"); setIsModalOpen(true); }} className="flex items-center gap-2"><Plus size={16} /> New Task</Button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-x-auto pb-4 no-scrollbar">
        {columns.map((col, i) => (
          <div key={col} className="w-96 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                {col === "Todo" && <AlertCircle size={16} className="text-rose" />}
                {col === "In Progress" && <Clock size={16} className="text-amber" />}
                {col === "Done" && <CheckCircle2 size={16} className="text-sage" />}
                <h3 className="text-xs font-bold uppercase tracking-widest text-bark/60">{col}</h3>
              </div>
              <button className="text-bark/30 hover:text-bark"><MoreHorizontal size={16} /></button>
            </div>

            <div className="flex-1 bg-bark/[0.02] rounded-2xl p-4 space-y-4 border border-bark/5 overflow-y-auto no-scrollbar">
              <AnimatePresence mode="popLayout">
                {tasks.filter(t => t.status === col).map((task) => (
                  <motion.div
                    layout
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className="p-4 border-none shadow-sm hover:shadow-md transition-all space-y-4 group">
                      <div className="flex justify-between items-start">
                        <Badge variant={
                          task.priority === "High" ? "danger" : 
                          task.priority === "Medium" ? "warning" : "default"
                        }>
                          {task.priority} Priority
                        </Badge>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {i > 0 && <button onClick={() => handleStatusMove(task.id, col, "left")} className="p-1 hover:bg-bark/5 rounded"><ArrowLeft size={14} /></button>}
                          {i < columns.length - 1 && <button onClick={() => handleStatusMove(task.id, col, "right")} className="p-1 hover:bg-bark/5 rounded"><ArrowRight size={14} /></button>}
                          <button onClick={() => handleDelete(task.id)} className="p-1 hover:bg-rose/10 text-rose rounded ml-1"><Trash2 size={14} /></button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-bark/80 leading-snug">{task.title}</h4>

                      <div className="flex items-center justify-between pt-4 border-t border-bark/5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-[10px] font-bold text-gold">
                            {task.assignee.charAt(0)}
                          </div>
                          <span className="text-[10px] font-medium text-bark/40">{task.assignee}</span>
                        </div>
                        <div className={cn(
                          "text-[10px] font-bold flex items-center gap-1",
                          task.due === "Today" ? "text-rose" : "text-bark/30"
                        )}>
                          <Clock size={10} /> {task.due}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button 
                onClick={() => { setActiveCol(col); setIsModalOpen(true); }}
                className="w-full py-4 border-2 border-dashed border-bark/10 rounded-xl text-xs font-bold text-bark/30 hover:bg-white hover:border-gold/20 hover:text-gold transition-all"
              >
                + Add Task to {col}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add Task to ${activeCol}`}>
        <form onSubmit={handleAddTask} className="space-y-6">
          <Input 
            label="Task Title" 
            placeholder="e.g. Inspect Villa 4 Plumbing" 
            required 
            value={newTask.title}
            onChange={e => setNewTask({...newTask, title: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Assignee" 
              placeholder="e.g. Ramesh P." 
              required 
              value={newTask.assignee}
              onChange={e => setNewTask({...newTask, assignee: e.target.value})}
            />
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-bark/60 uppercase tracking-widest px-1">Priority</label>
              <select 
                className="w-full px-4 py-2.5 bg-white border border-bark/10 rounded-xl text-sm focus:ring-1 focus:ring-gold/20 outline-none"
                value={newTask.priority}
                onChange={e => setNewTask({...newTask, priority: e.target.value})}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
