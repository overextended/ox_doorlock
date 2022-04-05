import { atom } from 'recoil';

// Export hooks instead of raw atoms?

export const itemFieldsState = atom<string[]>({
  key: 'itemFields',
  default: [''],
});

export const groupFieldsState = atom<{ name: string; grade: number }[]>({
  key: 'groupFields',
  default: [{ name: '', grade: 0 }],
});

export const checkboxState = atom<{
  locked: boolean;
  double: boolean;
  automatic: boolean;
  lockpick: boolean;
}>({
  key: 'checkboxes',
  default: {
    locked: false,
    double: false,
    automatic: false,
    lockpick: false,
  },
});
