import create, { GetState, SetState } from "zustand";

interface State {
  doorName: string;
  passcode: string;
  autolockInterval: string;
  itemFields: string[];
  groupFields: { name: string; grade: string }[];
  checkboxes: {
    locked: boolean;
    double: boolean;
    automatic: boolean;
    lockpick: boolean;
  };
}

interface StateSetters {
  setDoorName: (value: State["doorName"]) => void;
  setPasscode: (value: State["passcode"]) => void;
  setAutolockInterval: (value: State["autolockInterval"]) => void;
  setItemFields: (
    fn: (state: State["itemFields"]) => State["itemFields"]
  ) => void;
  setGroupFields: (
    fn: (state: State["groupFields"]) => State["groupFields"]
  ) => void;
  toggleCheckbox: (
    type: "locked" | "double" | "automatic" | "lockpick"
  ) => void;
}

export const useStore = create<State>((set: SetState<State>) => ({
  doorName: "",
  passcode: "",
  autolockInterval: "",
  itemFields: [""],
  groupFields: [{ name: "", grade: "" }],
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
    setPasscode: (value: State["passcode"]) =>
      useStore.setState({ passcode: value }),
    setAutolockInterval: (value: State["autolockInterval"]) =>
      useStore.setState({ autolockInterval: value }),
    toggleCheckbox: (type) =>
      useStore.setState(({ checkboxes }) => ({
        checkboxes: { ...checkboxes, [type]: !checkboxes[type] },
      })),
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

// Store setters
