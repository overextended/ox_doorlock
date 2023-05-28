import create, { GetState, SetState } from 'zustand';

export type StringField = string | null | undefined;
export type NumberField = number | null | undefined;

export interface StoreState {
  id?: number;
  name: StringField;
  passcode: StringField;
  autolock: NumberField;
  items: { name: StringField; metadata?: StringField; remove: boolean | null }[];
  characters: StringField[];
  groups: { name: StringField; grade: NumberField }[];
  maxDistance: NumberField;
  doorRate: NumberField;
  lockSound: StringField;
  unlockSound: StringField;
  lockpickDifficulty: Array<string | { areaSize: number; speedMultiplier: number }>;
  auto: boolean | null;
  state: boolean | null;
  lockpick: boolean | null;
  hideUi: boolean | null;
  doors: boolean | null;
  holdOpen: boolean | null;
}

interface StateSetters {
  sounds: string[];
  setSounds: (value: string[]) => void;
  setLockSound: (value: StoreState['lockSound']) => void;
  setUnlockSound: (value: StoreState['unlockSound']) => void;
  setName: (value: StoreState['name']) => void;
  setPasscode: (value: StoreState['passcode']) => void;
  setAutolock: (value: StoreState['autolock']) => void;
  setItems: (fn: (state: StoreState['items']) => StoreState['items']) => void;
  setCharacters: (fn: (state: StoreState['characters']) => StoreState['characters']) => void;
  setGroups: (fn: (state: StoreState['groups']) => StoreState['groups']) => void;
  setLockpickDifficulty: (fn: (state: StoreState['lockpickDifficulty']) => StoreState['lockpickDifficulty']) => void;
  toggleCheckbox: (type: 'state' | 'doors' | 'auto' | 'lockpick' | 'hideUi' | 'holdOpen') => void;
  setMaxDistance: (value: StoreState['maxDistance']) => void;
  setDoorRate: (value: StoreState['doorRate']) => void;
}

export const useStore = create<StoreState>(() => ({
  name: '',
  passcode: '',
  autolock: 0,
  items: [{ name: '', metadata: '', remove: false }],
  characters: [''],
  groups: [{ name: '', grade: undefined }],
  lockpickDifficulty: [''],
  maxDistance: 0,
  doorRate: 0,
  lockSound: '',
  unlockSound: '',
  auto: false,
  state: false,
  lockpick: false,
  hideUi: false,
  doors: false,
  holdOpen: false,
}));

export const defaultState = useStore.getState();

export const useSetters = create<StateSetters>((set: SetState<StateSetters>, get: GetState<StateSetters>) => ({
  sounds: [''],
  setSounds: (value) => set({ sounds: value }),
  setLockSound: (value) => useStore.setState({ lockSound: value }),
  setUnlockSound: (value) => useStore.setState({ unlockSound: value }),
  setName: (value) => useStore.setState({ name: value }),
  setPasscode: (value: StoreState['passcode']) => useStore.setState({ passcode: value }),
  setAutolock: (value: StoreState['autolock']) => useStore.setState({ autolock: value }),
  // @ts-ignore
  toggleCheckbox: (type) => useStore.setState((state) => ({ [type]: !state[type] })),
  setMaxDistance: (value: StoreState['maxDistance']) => useStore.setState(() => ({ maxDistance: value })),
  // Returns previous state, works like usual state setter except if you
  // want to set state straight away, you still have to call the function
  setItems: (fn) => useStore.setState(({ items: itemFields }) => ({ items: fn(itemFields) })),
  setCharacters: (fn) =>
    useStore.setState(({ characters: characterFields }) => ({
      characters: fn(characterFields),
    })),
  setGroups: (fn) =>
    useStore.setState(({ groups: groupFields }) => ({
      groups: fn(groupFields),
    })),
  setLockpickDifficulty: (fn) =>
    useStore.setState(({ lockpickDifficulty: difficultyFields }) => ({
      lockpickDifficulty: fn(difficultyFields),
    })),
  setDoorRate: (value: StoreState['doorRate']) => useStore.setState({ doorRate: value }),
}));
