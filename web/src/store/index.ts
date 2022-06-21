import create, { GetState, SetState } from 'zustand';

type StringField = string | null;
type NumberField = number | string | null;

export interface StoreState {
  doorName: StringField;
  passcode: StringField;
  autolockInterval: NumberField;
  itemFields: { name: StringField; metadata?: StringField; remove?: boolean }[];
  groupFields: { name: StringField; grade: NumberField }[];
  interactDistance: NumberField;
  lockSound: StringField;
  unlockSound: StringField;
  checkboxes: {
    locked: boolean;
    double: boolean;
    automatic: boolean;
    lockpick: boolean;
    hideUi: boolean;
  };
}

interface StateSetters {
  sounds: string[];
  setSounds: (value: string[]) => void;
  setLockSound: (value: StoreState['lockSound']) => void;
  setUnlockSound: (value: StoreState['unlockSound']) => void;
  setDoorName: (value: StoreState['doorName']) => void;
  setPasscode: (value: StoreState['passcode']) => void;
  setAutolockInterval: (value: StoreState['autolockInterval']) => void;
  setItemFields: (fn: (state: StoreState['itemFields']) => StoreState['itemFields']) => void;
  setGroupFields: (fn: (state: StoreState['groupFields']) => StoreState['groupFields']) => void;
  toggleCheckbox: (type: 'locked' | 'double' | 'automatic' | 'lockpick' | 'hideUi') => void;
  setInteractDistance: (value: StoreState['interactDistance']) => void;
}

interface VisibilityState {
  settingsVisible: boolean;
  authVisible: boolean;
  soundVisible: boolean;
  setSettingsVisible: (state: boolean) => void;
  setAuthVisible: (state: boolean) => void;
  setSoundVisible: (state: boolean) => void;
}

export const useStore = create<StoreState>((set: SetState<StoreState>) => ({
  doorName: '',
  passcode: '',
  autolockInterval: '',
  itemFields: [{ name: '', metadata: '', remove: false }],
  groupFields: [{ name: '', grade: '' }],
  interactDistance: '',
  lockSound: null,
  unlockSound: null,
  checkboxes: {
    locked: false,
    double: false,
    automatic: false,
    lockpick: false,
    hideUi: false,
  },
}));

export const defaultState = useStore.getState();

export const useSetters = create<StateSetters>(
  (set: SetState<StateSetters>, get: GetState<StateSetters>) => ({
    sounds: [''],
    setSounds: (value) => set({ sounds: value }),
    setLockSound: (value) => useStore.setState({ lockSound: value }),
    setUnlockSound: (value) => useStore.setState({ unlockSound: value }),
    setDoorName: (value) => useStore.setState({ doorName: value }),
    setPasscode: (value: StoreState['passcode']) => useStore.setState({ passcode: value }),
    setAutolockInterval: (value: StoreState['autolockInterval']) =>
      useStore.setState({ autolockInterval: value }),
    toggleCheckbox: (type) =>
      useStore.setState(({ checkboxes }) => ({
        checkboxes: { ...checkboxes, [type]: !checkboxes[type] },
      })),
    setInteractDistance: (value: StoreState['interactDistance']) =>
      useStore.setState(() => ({ interactDistance: value })),
    // Returns previous state, works like usual state setter except if you
    // want to set state straight away, you still have to call the function
    setItemFields: (fn) => useStore.setState(({ itemFields }) => ({ itemFields: fn(itemFields) })),
    setGroupFields: (fn) =>
      useStore.setState(({ groupFields }) => ({
        groupFields: fn(groupFields),
      })),
  }),
);

export const useVisibilityStore = create((set: SetState<VisibilityState>) => ({
  settingsVisible: false,
  authVisible: false,
  soundVisible: false,
  setSettingsVisible: (state: boolean) => set({ settingsVisible: state }),
  setAuthVisible: (state: boolean) => set({ authVisible: state }),
  setSoundVisible: (state: boolean) => set({ soundVisible: state }),
}));
