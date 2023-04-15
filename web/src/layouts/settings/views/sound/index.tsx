import { Stack, Select } from '@mantine/core';
import { useSetters, useStore } from '../../../../store';
import { Locale } from '../../../../store/locale';

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
        label={Locale.ui_lock_sound}
        value={lockSound || ''}
        searchable
        clearable
        nothingFound={Locale.no_such_sound}
        onChange={(e) => setLockSound(e)}
      />
      <Select
        data={sounds}
        label={Locale.ui_unlock_sound}
        value={unlockSound || ''}
        searchable
        clearable
        nothingFound={Locale.no_such_sound}
        onChange={(e) => setUnlockSound(e)}
      />
    </Stack>
  );
};

export default Sound;
