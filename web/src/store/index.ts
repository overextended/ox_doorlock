import create, { GetState, SetState } from "zustand";

export interface StoreState {
  doorName: string;
  passcode: string;
  autolockInterval: string;
  itemFields: string[];
  groupFields: { name: string; grade: string }[];
  interactDistance: string;
  checkboxes: {
    locked: boolean;
    double: boolean;
    automatic: boolean;
    lockpick: boolean;
  };
}

interface StateSetters {
  setDoorName: (value: StoreState["doorName"]) => void;
  setPasscode: (value: StoreState["passcode"]) => void;
  setAutolockInterval: (value: StoreState["autolockInterval"]) => void;
  setItemFields: (
    fn: (state: StoreState["itemFields"]) => StoreState["itemFields"]
  ) => void;
  setGroupFields: (
    fn: (state: StoreState["groupFields"]) => StoreState["groupFields"]
  ) => void;
  toggleCheckbox: (
    type: "locked" | "double" | "automatic" | "lockpick"
  ) => void;
  setInteractDistance: (value: StoreState['interactDistance']) => void
}

interface VisibilityState {
  settingsVisible: boolean,
  authVisible: boolean
  setSettingsVisible: (state: boolean) => void
  setAuthVisible: (state: boolean) => void
}

export const useStore = create<StoreState>((set: SetState<StoreState>) => ({
  doorName: "",
  passcode: "",
  autolockInterval: "",
  itemFields: [""],
  groupFields: [{ name: "", grade: "" }],
  interactDistance: '',
  checkboxes: {
    locked: false,
    double: false,
    automatic: false,
    lockpick: false,
  },
}));

export const defaultState = useStore.getState()

export const useSetters = create<StateSetters>(
  (set: SetState<StateSetters>, get: GetState<StateSetters>) => ({
    setDoorName: (value) => useStore.setState({ doorName: value }),
    setPasscode: (value: StoreState["passcode"]) =>
      useStore.setState({ passcode: value }),
    setAutolockInterval: (value: StoreState["autolockInterval"]) =>
      useStore.setState({ autolockInterval: value }),
    toggleCheckbox: (type) =>
      useStore.setState(({ checkboxes }) => ({
        checkboxes: { ...checkboxes, [type]: !checkboxes[type] },
      })),
    setInteractDistance: (value: StoreState['interactDistance']) => useStore.setState(() => ({interactDistance: value})),
        // Returns previous state, works like usual state setter except if you
    // want to set state straight away, you still have to call the function
    setItemFields: (fn) =>
      useStore.setState(({ itemFields }) => ({ itemFields: fn(itemFields) })),
    setGroupFields: (fn) =>
      useStore.setState(({ groupFields }) => ({
        groupFields: fn(groupFields),
      })),
  })
);

export const useVisibilityStore = create((set: SetState<VisibilityState>) => ({
  settingsVisible: false,
  authVisible: false,
  setSettingsVisible: (state: boolean) => set({settingsVisible: state}),
  setAuthVisible: (state: boolean) => set({authVisible: state})
}))
