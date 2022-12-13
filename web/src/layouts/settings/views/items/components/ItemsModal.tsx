import { useForm } from '@mantine/form';
import { Button, Stack, Switch, TextInput } from '@mantine/core';
import { useMemo } from 'react';
import { StringField, useSetters, useStore } from '../../../../../store';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<{ opened: boolean; index: number }>>;
  modal: { opened: boolean; index: number };
}

const ItemsModal: React.FC<Props> = ({ modal, setModal }) => {
  const itemFields = useStore((state) => state.items);
  const setItemFields = useSetters((setter) => setter.setItems);

  const itemData = useMemo(() => {
    return itemFields[modal.index];
  }, [modal, itemFields]);

  const form = useForm({
    initialValues: {
      metadata: itemData.metadata,
      remove: itemData.remove,
    },
  });

  const handleSubmit = (values: { metadata: StringField; remove: boolean | null }) => {
    setModal((state) => ({ ...state, opened: false }));
    setItemFields((prevState) => {
      return prevState.map((item, index) => {
        if (index === modal.index) return { ...item, metadata: values.metadata, remove: values.remove };

        return item;
      });
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput label="Metadata type" defaultValue={itemData.metadata} {...form.getInputProps('metadata')} />
        <Switch label="Remove on use" defaultChecked={itemData.remove} {...form.getInputProps('remove')} />
        <Button uppercase variant="light" type="submit">
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default ItemsModal;
