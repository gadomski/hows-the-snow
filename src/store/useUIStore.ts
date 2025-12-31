import { create } from 'zustand';

interface UIState {
  stationId: string | null;
  setStationId: (id: string | null) => void;

  date: Date;
  setDate: (date: Date) => void;
}

export const useUIStore = create<UIState>((set) => ({
  stationId: null,
  setStationId: (id) => set({ stationId: id }),

  date: new Date(),
  setDate: (date) => set({ date }),
}));
