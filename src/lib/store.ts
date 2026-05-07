import { create } from "zustand";
import { persist } from "zustand/middleware";
import { 
  bookings as initialBookings, 
  guests as initialGuests, 
  inquiries as initialInquiries, 
  crmPipeline as initialCRM, 
  tasks as initialTasks,
  marketingCampaigns as initialCampaigns,
  reviews as initialReviews,
  offers as initialOffers,
  payments as initialPayments,
  events as initialEvents,
  rooms as initialRooms
} from "./mockData";

export interface Review {
  guest: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
}

interface AppState {
  bookings: typeof initialBookings;
  guests: typeof initialGuests;
  inquiries: typeof initialInquiries;
  crmPipeline: typeof initialCRM;
  tasks: typeof initialTasks;
  campaigns: typeof initialCampaigns;
  reviews: Review[];
  offers: typeof initialOffers;
  payments: typeof initialPayments;
  events: typeof initialEvents;
  rooms: typeof initialRooms;

  // Bookings Actions
  addBooking: (booking: any) => void;
  updateBooking: (id: string, updates: any) => void;
  deleteBooking: (id: string) => void;

  // Inquiries Actions
  updateInquiry: (id: string, updates: any) => void;
  deleteInquiry: (id: string) => void;
  convertToBooking: (inquiryId: string) => void;

  // Tasks Actions
  addTask: (task: any) => void;
  updateTask: (id: number, updates: any) => void;
  deleteTask: (id: number) => void;

  // CRM Actions
  moveCRMCard: (cardId: string, fromStage: string, toStage: string) => void;
  
  // Reviews Actions
  addReviewResponse: (reviewIndex: number, response: string) => void;

  // Offers Actions
  toggleOffer: (code: string) => void;

  // Payments Actions
  addPayment: (payment: any) => void;

  // Marketing Actions
  toggleCampaign: (name: string) => void;

  // Events Actions
  deleteEvent: (id: number) => void;

  // Rooms Actions
  updateRoomStatus: (id: string, status: string, bookingId?: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      bookings: initialBookings,
      guests: initialGuests,
      inquiries: initialInquiries,
      crmPipeline: initialCRM,
      tasks: initialTasks,
      campaigns: initialCampaigns,
      reviews: initialReviews,
      offers: initialOffers,
      payments: initialPayments,
      events: initialEvents,
      rooms: initialRooms,

      addBooking: (booking) => set((state) => ({ 
        bookings: [booking, ...state.bookings] 
      })),

      updateBooking: (id, updates) => set((state) => ({
        bookings: state.bookings.map(b => b.id === id ? { ...b, ...updates } : b)
      })),

      deleteBooking: (id) => set((state) => ({
        bookings: state.bookings.filter(b => b.id !== id)
      })),

      updateInquiry: (id, updates) => set((state) => ({
        inquiries: state.inquiries.map(i => i.id === id ? { ...i, ...updates } : i)
      })),

      deleteInquiry: (id) => set((state) => ({
        inquiries: state.inquiries.filter(i => i.id !== id)
      })),

      convertToBooking: (inquiryId) => set((state) => {
        const inquiry = state.inquiries.find(i => i.id === inquiryId);
        if (!inquiry) return state;

        const newBooking = {
          id: `BK-${Math.floor(Math.random() * 9000) + 1000}`,
          guest: inquiry.name,
          type: inquiry.type,
          checkIn: "TBD",
          checkOut: "TBD",
          amount: "₹TBD",
          paymentStatus: "Unpaid" as const,
          status: "Pending" as const,
          source: inquiry.source,
          guests: 2
        };

        return {
          inquiries: state.inquiries.filter(i => i.id !== inquiryId),
          bookings: [newBooking, ...state.bookings]
        };
      }),

      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: state.tasks.length + 1 }]
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      moveCRMCard: (cardId, fromStage, toStage) => set((state) => {
        const newPipeline = [...state.crmPipeline];
        const sourceCol = newPipeline.find(c => c.stage === fromStage);
        const destCol = newPipeline.find(c => c.stage === toStage);
        
        if (!sourceCol || !destCol) return state;

        const cardIndex = sourceCol.cards.findIndex(c => c.name === cardId); // using name as id for mock
        if (cardIndex === -1) return state;

        const [card] = sourceCol.cards.splice(cardIndex, 1);
        destCol.cards.push(card);

        return { crmPipeline: newPipeline };
      }),

      addReviewResponse: (index, response) => set((state) => ({
        reviews: state.reviews.map((r, i) => i === index ? { ...r, response } : r)
      })),

      toggleOffer: (code) => set((state) => ({
        offers: state.offers.map(o => o.code === code ? { ...o, status: o.status === "Active" ? "Paused" : "Active" } : o)
      })),

      addPayment: (payment) => set((state) => ({
        payments: [payment, ...state.payments]
      })),

      toggleCampaign: (name) => set((state) => ({
        campaigns: state.campaigns.map(c => c.name === name ? { ...c, status: c.status === "Active" ? "Paused" : "Active" } : c)
      })),

      deleteEvent: (id) => set((state) => ({
        events: state.events.filter(e => e.id !== id)
      })),

      updateRoomStatus: (id, status, bookingId) => set((state) => ({
        rooms: state.rooms.map(r => r.id === id ? { ...r, status, currentBookingId: bookingId } : r)
      })),
    }),
    {
      name: "savera-retreat-storage",
    }
  )
);
