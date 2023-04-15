import { useSetters, useStore } from '../../../../../store';
import { ActionIcon, Group, Modal, Select, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { TbSettings, TbTrash } from 'react-icons/tb';
import DifficultyModal from '../../characters/components/DifficultyModal';
import { Locale } from '../../../../../store/locale';

const selectData: { label: string; value: string }[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
  { label: 'Custom', value: 'custom' },
];

const LockpickFields: React.FC = () => {
  const lockpickFields = useStore((state) => state.lockpickDifficulty);
  const setLockpickFields = useSetters((setter) => setter.setLockpickDifficulty);
  const [modal, setModal] = useState<{ opened: boolean; index: number }>({ opened: false, index: 0 });

  const handleRowDelete = (index: number) => {
    setLockpickFields((prevState) => prevState.filter((obj, indx) => indx !== index));
  };

  return (
    <>
      {lockpickFields.map((field, index) => (
        <Group
          key={`${typeof field === 'string' ? field : field.areaSize}-${index}`}
          sx={{ width: '100%' }}
          spacing={16}
          mt={index === 0 ? undefined : 16}
          position="apart"
        >
          <Select
            data={selectData}
            value={typeof field === 'string' ? field : 'custom'}
            readOnly
            placeholder={Locale.ui_edit_info}
            sx={{ width: '80%' }}
          />
          <Tooltip label={Locale.ui_edit}>
            <ActionIcon color="blue.4" variant="transparent" onClick={() => setModal({ opened: true, index })}>
              <TbSettings size={24} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={Locale.ui_delete}>
            <ActionIcon color="red.4" variant="transparent" onClick={() => handleRowDelete(index)}>
              <TbTrash size={24} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ))}
      <Modal
        opened={modal.opened}
        onClose={() => setModal({ ...modal, opened: false })}
        transition="fade"
        title={Locale.ui_lockpick_difficulty}
        centered
        size="xs"
        withCloseButton={false}
      >
        <DifficultyModal selectData={selectData} setModal={setModal} modal={modal} />
      </Modal>
    </>
  );
};

export default LockpickFields;
