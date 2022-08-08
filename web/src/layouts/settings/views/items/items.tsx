import { Box, Stack, Button, Group, ActionIcon, Tooltip, Modal, TextInput, Switch } from '@mantine/core';
import { useState } from 'react';
import { TbPlus, TbSettings } from 'react-icons/tb';

const Items: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Stack justify="space-between" align="center" sx={{ height: '100%' }}>
        <Box sx={{ width: '100%' }}>
          <Group p={8} sx={{ width: '100%' }} position="center">
            <TextInput placeholder="Item" sx={{ width: '90%' }} />
            <Tooltip label="Item options" withArrow>
              <ActionIcon color="blue" variant="transparent" onClick={() => setOpened(true)}>
                <TbSettings size={24} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Box>

        <Tooltip label="Create a new row" withArrow arrowSize={10}>
          <Button fullWidth variant="light">
            <TbPlus size={24} />
          </Button>
        </Tooltip>
      </Stack>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Item options"
        withCloseButton={false}
        centered
        size="xs"
        transition="slide-up"
      >
        <Stack>
          <TextInput label="Metadata type" />
          <Switch label="Remove on use" />
          <Button uppercase variant="light" onClick={() => setOpened(false)}>
            Confirm
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Items;
