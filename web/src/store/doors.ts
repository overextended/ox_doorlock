import create from 'zustand';
import type { StoreState } from './';

export interface DoorColumn extends StoreState {
  id: number;
  name: string;
  zone: string;
}

export const useDoors = create<{ doors: DoorColumn[]; setDoors: (value: DoorColumn[]) => void }>((set) => ({
  doors: [],
  setDoors: (doors: DoorColumn[]) => set({ doors }),
}));
