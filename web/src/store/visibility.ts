import create from 'zustand';

export const useVisibility = create<{ visible: boolean; setVisible: (value: boolean) => void }>((set) => ({
  visible: false,
  setVisible: (value: boolean) => set({ visible: value }),
}));
