import { Stack, Select } from '@mantine/core';
import { useSetters, useStore } from '../../../../store';
import { t } from '../../../../utils/t';

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
        label={t('ui_lock_sound')}
        value={lockSound || ''}
        searchable
        clearable
        nothingFound={t('ui_no_such_sound')}
        onChange={(e) => setLockSound(e)}
      />
      <Select
        data={sounds}
        label={t('ui_unlock_sound')}
        value={unlockSound || ''}
        searchable
        clearable
        nothingFound={t('ui_no_such_sound')}
        onChange={(e) => setUnlockSound(e)}
      />
    </Stack>
  );
};

export default Sound;
