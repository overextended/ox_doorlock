import create from 'zustand';

interface Store {
  value: string;
  debouncedValue: string;
  setDebouncedValue: (value: string) => void;
  setValue: (value: string) => void;
}

export const useSearch = create<Store>((set) => ({
  value: '',
  debouncedValue: '',
  setDebouncedValue: (value: string) => set({ debouncedValue: value }),
  setValue: (value: string) => set({ value: value }),
}));
