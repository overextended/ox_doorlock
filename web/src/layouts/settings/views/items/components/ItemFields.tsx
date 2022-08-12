import { Box, Group, TextInput, Tooltip, ActionIcon, Stack, Switch, Button, Modal } from '@mantine/core';
import { useState } from 'react';
import { TbSettings } from 'react-icons/tb';
import { useSetters, useStore } from '../../../../../store';

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
      case 'metadata':
        items[index].metadata = e.target.value;
        break;
    }
    setItemFields(() => items);
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const items = [...itemFields];
    items[index].remove = e.target.checked;
    setItemFields(() => items);
  };

  return (
    <Box sx={{ width: '100%', overflowY: 'auto', maxHeight: 410 }}>
      {itemFields.length > 0 &&
        itemFields.map((field, index) => (
          <Group p={8} sx={{ width: '100%' }} position="center" key={`item-field-${index}`}>
            <TextInput
              placeholder="Item"
              sx={{ width: '90%' }}
              value={(field.name as string) || ''}
              id="name"
              onChange={(e) => handleChange(e, index)}
            />
            <Tooltip label="Item options" withArrow>
              <ActionIcon color="blue.4" variant="transparent" onClick={() => setModal({ opened: true, index })}>
                <TbSettings size={24} />
              </ActionIcon>
            </Tooltip>
          </Group>
        ))}
      <Modal
        opened={modal.opened}
        onClose={() => setModal({ ...modal, opened: false })}
        transition="slide-up"
        title="Item options"
        centered
        size="xs"
        withCloseButton={false}
      >
        {itemFields[modal.index] && (
          <Stack>
            <TextInput
              label="Metadata type"
              id="metadata"
              value={itemFields[modal.index].metadata || ''}
              onChange={(e) => handleChange(e, modal.index)}
            />
            <Switch
              label="Remove on use"
              checked={itemFields[modal.index].remove || false}
              onChange={(e) => handleSwitchChange(e, modal.index)}
            />
            <Button uppercase variant="light" onClick={() => setModal({ ...modal, opened: false })}>
              Confirm
            </Button>
          </Stack>
        )}
      </Modal>
    </Box>
  );
};

export default ItemFields;
