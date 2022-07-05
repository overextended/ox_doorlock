import { TextField, Tooltip } from '@mui/material';
import { useStore, useSetters } from '../../store';

const TextFields: React.FC = () => {
  const passcode = useStore((state) => state.passcode);
  const autolockInterval = useStore((state) => state.autolockInterval);
  const interactDistance = useStore((state) => state.interactDistance);
  const doorRate = useStore((state) => state.doorRate);
  const automatic = useStore((state) => state.checkboxes.automatic);
  const setPasscode = useSetters((setter) => setter.setPasscode);
  const setInteractDistance = useSetters((setter) => setter.setInteractDistance);
  const setAutolockInterval = useSetters((setter) => setter.setAutolockInterval);
  const setDoorRate = useSetters((setter) => setter.setDoorRate);

  return (
    <>
      <TextField
        fullWidth
        label="Passcode"
        style={{ marginBottom: '0.7rem' }}
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />
      <TextField
        fullWidth
        label="Autolock interval"
        type="number"
        style={{ marginBottom: '0.7rem' }}
        value={autolockInterval}
        onChange={(e) => setAutolockInterval(e.target.value)}
      />
      <TextField
        fullWidth
        label="Interact distance"
        type="number"
        style={{ marginBottom: '0.7rem' }}
        value={interactDistance}
        onChange={(e) => setInteractDistance(e.target.value)}
      />
      <Tooltip
        title="Sets the rate of which the automatic doors will open. If an automatic door moves too slowly then set this value higher."
        placement="right"
        arrow
      >
        <TextField
          fullWidth
          label="Door rate"
          type="number"
          style={{ marginBottom: '0.7rem' }}
          value={doorRate}
          disabled={!automatic}
          onChange={(e) => setDoorRate(e.target.value)}
        />
      </Tooltip>
    </>
  );
};

export default TextFields;
