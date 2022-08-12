import create from 'zustand';

export const useClipboard = create<any>((set) => ({
  clipboard: false,
  setClipboard: (value: any) => set({ clipboard: value }),
}));
