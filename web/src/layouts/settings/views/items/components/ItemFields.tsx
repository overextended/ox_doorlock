import { Box, Group, TextInput, Tooltip, ActionIcon, Modal } from '@mantine/core';
import { useState } from 'react';
import { TbSettings, TbTrash } from 'react-icons/tb';
import { useSetters, useStore } from '../../../../../store';
import ItemsModal from './ItemsModal';

const ItemFields: React.FC = () => {
  const itemFields = useStore((state) => state.items);
  const setItemFields = useSetters((setter) => setter.setItems);
  const [modal, setModal] = useState<{ opened: boolean; index: number }>({ opened: false, index: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const items = [...itemFields];
    switch (e.target.id) {
      case 'name':
        items[index].name = e.target.value;
        break;
    }
    setItemFields(() => items);
  };

  const handleRowDelete = (index: number) => {
    setItemFields((prevState) => prevState.filter((obj, indx) => indx !== index));
  };

  return (
    <Box>
      {itemFields.length > 0 && (
        <>
          {itemFields.map((field, index) => (
            <Group
              sx={{ width: '100%' }}
              position="apart"
              key={`item-field-${index}`}
              spacing={16}
              mt={index === 0 ? undefined : 16}
            >
              <TextInput
                sx={{ width: '80%' }}
                value={(field.name as string) || ''}
                id="name"
                placeholder="Item"
                onChange={(e) => handleChange(e, index)}
              />
              <Tooltip label="Item options">
                <ActionIcon color="blue.4" variant="transparent" onClick={() => setModal({ opened: true, index })}>
                  <TbSettings size={24} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete row">
                <ActionIcon color="red.4" variant="transparent" onClick={() => handleRowDelete(index)}>
                  <TbTrash size={24} />
                </ActionIcon>
              </Tooltip>
            </Group>
          ))}
        </>
      )}
      <Modal
        opened={modal.opened}
        onClose={() => setModal({ ...modal, opened: false })}
        transition="fade"
        title="Item options"
        centered
        size="xs"
        withCloseButton={false}
      >
        <ItemsModal modal={modal} setModal={setModal} />
      </Modal>
    </Box>
  );
};

export default ItemFields;
