import { Stack, Select } from '@mantine/core';
import { useSetters, useStore } from '../../../../store';
import { useLocales } from '../../../../providers/LocaleProvider';

const Sound: React.FC = () => {
  const sounds = useSetters((state) => state.sounds);
  const lockSound = useStore((state) => state.lockSound);
  const unlockSound = useStore((state) => state.unlockSound);
  const setLockSound = useSetters((setter) => setter.setLockSound);
  const setUnlockSound = useSetters((setter) => setter.setUnlockSound);
  const { locale } = useLocales();
  
  return (
    <Stack>
      <Select
        data={sounds}
        label={locale.ui.lock_sound}
        value={lockSound || ''}
        searchable
        clearable
        nothingFound={locale.ui.no_such_sound}
        onChange={(e) => setLockSound(e)}
      />
      <Select
        data={sounds}
        label={locale.ui.unlock_sound}
        value={unlockSound || ''}
        searchable
        clearable
        nothingFound={locale.ui.no_such_sound}
        onChange={(e) => setUnlockSound(e)}
      />
    </Stack>
  );
};

export default Sound;
