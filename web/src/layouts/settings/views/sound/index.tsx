import { Stack, Select } from '@mantine/core';
import { useSetters, useStore } from '../../../../store';

const Sound: React.FC = () => {
  const sounds = useSetters((state) => state.sounds);
  const lockSound = useStore((state) => state.lockSound);
  const unlockSound = useStore((state) => state.unlockSound);
  const setLockSound = useSetters((setter) => setter.setLockSound);
  const setUnlockSound = useSetters((setter) => setter.setUnlockSound);

  return (
    <Stack>
      <Select
        data={sounds}
        label="Lock sound"
        value={lockSound || ''}
        searchable
        clearable
        nothingFound="No such sound"
        onChange={(e) => setLockSound(e)}
      />
      <Select
        data={sounds}
        label="Unlock sound"
        value={unlockSound || ''}
        searchable
        clearable
        nothingFound="No such sound"
        onChange={(e) => setUnlockSound(e)}
      />
    </Stack>
  );
};

export default Sound;
