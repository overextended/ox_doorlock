import { Autocomplete, TextField } from '@mui/material';
import { useSetters, useStore } from '../../store';

const ValueFields: React.FC = () => {
  const sounds = useSetters((state) => state.sounds);
  const lockSound = useStore((state) => state.lockSound);
  const unlockSound = useStore((state) => state.unlockSound);
  const setLockSound = useSetters((setter) => setter.setLockSound);
  const setUnlockSound = useSetters((setter) => setter.setUnlockSound);

  return (
    <>
      <Autocomplete
        style={{ marginBottom: '0.7rem' }}
        disablePortal
        fullWidth
        options={sounds}
        value={lockSound}
        onChange={(_, value) => setLockSound(value)}
        renderInput={(params) => <TextField {...params} label="Lock sound" />}
      />
      <Autocomplete
        style={{ marginBottom: '0.7rem' }}
        disablePortal
        fullWidth
        value={unlockSound}
        onChange={(_, value) => setUnlockSound(value)}
        options={sounds}
        renderInput={(params) => <TextField {...params} label="Unlock sound" />}
      />
    </>
  );
};

export default ValueFields;
