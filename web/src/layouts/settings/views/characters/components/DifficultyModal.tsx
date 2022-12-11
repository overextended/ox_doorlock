import { Button, NumberInput, Select, Stack } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from '@mantine/form';
import { useSetters, useStore } from '../../../../../store';

interface Props {
  selectData: { value: string; label: string }[];
  setModal: React.Dispatch<React.SetStateAction<{ opened: boolean; index: number }>>;
  modal: { opened: boolean; index: number };
}

interface FormProps {
  select: string | null;
  areaSize: number | null;
  speedMultiplier: number | null;
}

const DifficultyModal: React.FC<Props> = ({ selectData, setModal, modal }) => {
  const [select, setSelect] = useState<string | null>(null);
  const lockpickDifficulty = useStore((store) => store.lockpickDifficulty);
  const setLockpickDifficulty = useSetters((setter) => setter.setLockpickDifficulty);

  const lockpickData = useMemo(() => {
    return lockpickDifficulty[modal.index];
  }, [modal, lockpickDifficulty]);

  useEffect(() => setSelect(typeof lockpickData === 'string' ? lockpickData : 'custom'), [lockpickData]);

  const form = useForm<FormProps>({
    initialValues: {
      select,
      areaSize: typeof lockpickData === 'string' ? null : lockpickData.areaSize,
      speedMultiplier: typeof lockpickData === 'string' ? null : lockpickData.speedMultiplier,
    },

    validate: {
      select: (value) => (value === null ? 'Difficulty is required' : null),
      areaSize: (value, values) => (value === null && values.select === 'custom' ? 'Area size is required' : null),
      speedMultiplier: (value, values) =>
        value === null && values.select === 'custom' ? 'Speed multiplier is required' : null,
    },
  });

  useEffect(() => form.setFieldValue('select', select), [select]);

  const handleSubmit = (values: FormProps) => {
    setModal((modal) => ({ ...modal, opened: false }));
    const data =
      values.select === 'custom'
        ? { areaSize: values.areaSize, speedMultiplier: values.speedMultiplier }
        : values.select;
    if (!data) return;
    setLockpickDifficulty((prevState) => {
      const array = [...prevState];
      if (!data) return array;
      // @ts-ignore
      array[modal.index] = data;

      return array;
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <Select
          data={selectData}
          placeholder="Difficulty"
          {...form.getInputProps('select')}
          value={select}
          onChange={setSelect}
          required
        />
        <NumberInput
          label="Area size"
          defaultValue={typeof lockpickData === 'object' ? lockpickData.areaSize : null}
          description="Skill check area size in degrees"
          disabled={select !== 'custom'}
          max={360}
          hideControls
          required={select === 'custom'}
          {...form.getInputProps('areaSize')}
        />
        <NumberInput
          label="Speed multiplier"
          description="Number the indicator speed will be multiplied by"
          disabled={select !== 'custom'}
          defaultValue={typeof lockpickData === 'object' ? lockpickData.speedMultiplier : null}
          hideControls
          precision={2}
          required={select === 'custom'}
          {...form.getInputProps('speedMultiplier')}
        />
        <Button type="submit" uppercase variant="light">
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default DifficultyModal;
