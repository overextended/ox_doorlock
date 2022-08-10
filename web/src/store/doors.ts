import create from 'zustand';

export interface DoorColumn {
  id: number;
  name: string;
  zone: string;
}

export const useDoors = create<{ doors: DoorColumn[]; setDoors: (value: DoorColumn[]) => void }>((set) => ({
  doors: [],
  setDoors: (doors: DoorColumn[]) => set({ doors }),
}));
