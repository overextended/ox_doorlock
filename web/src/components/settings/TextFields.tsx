import { TextField } from "@mui/material";
import { useStore, useSetters } from "../../store";

const TextFields: React.FC = () => {
  const passcode = useStore((state) => state.passcode);
  const autolockInterval = useStore((state) => state.autolockInterval);
  const setPasscode = useSetters((setter) => setter.setPasscode);
  const setAutolockInterval = useSetters(
    (setter) => setter.setAutolockInterval
  );

  return (
    <>
      <TextField
        fullWidth
        label="Passcode"
        style={{ marginBottom: "0.7rem" }}
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />
      <TextField
        fullWidth
        label="Autolock interval"
        type="number"
        style={{ marginBottom: "0.7rem" }}
        value={autolockInterval}
        onChange={(e) => setAutolockInterval(e.target.value)}
      />
    </>
  );
};

export default TextFields;
