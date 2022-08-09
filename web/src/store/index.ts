import create, { GetState, SetState } from 'zustand';

type StringField = string | null | undefined;
type NumberField = number | null | undefined;

export interface StoreState {
  doorName: StringField;
  passcode: StringField;
  autolockInterval: NumberField;
  itemFields: { name: StringField; metadata?: StringField; remove?: boolean }[];
  groupFields: { name: StringField; grade: NumberField }[];
  interactDistance: NumberField;
  doorRate: NumberField;
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
  setDoorRate: (value: StoreState['doorRate']) => void;
}

export const useStore = create<StoreState>((set: SetState<StoreState>) => ({
  doorName: '',
  passcode: '',
  autolockInterval: 0,
  itemFields: [{ name: '', metadata: '', remove: false }],
  groupFields: [{ name: '', grade: 0 }],
  interactDistance: 0,
  doorRate: 0,
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

export const useSetters = create<StateSetters>((set: SetState<StateSetters>, get: GetState<StateSetters>) => ({
  sounds: [''],
  setSounds: (value) => set({ sounds: value }),
  setLockSound: (value) => useStore.setState({ lockSound: value }),
  setUnlockSound: (value) => useStore.setState({ unlockSound: value }),
  setDoorName: (value) => useStore.setState({ doorName: value }),
  setPasscode: (value: StoreState['passcode']) => useStore.setState({ passcode: value }),
  setAutolockInterval: (value: StoreState['autolockInterval']) => useStore.setState({ autolockInterval: value }),
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
  setDoorRate: (value: StoreState['doorRate']) => useStore.setState({ doorRate: value }),
}));
