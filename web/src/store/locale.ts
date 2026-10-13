import create from 'zustand';

type LocaleStore = {
  locales: Record<string, string>;
  setLocales: (locales: Record<string, string>) => void;
};

export const useLocale = create<LocaleStore>((set) => ({
  locales: {},
  setLocales: (locales: Record<string, string>) => set({ locales }),
}));
