import { Box, Center, Button, Stack, ActionIcon, Tooltip, Group } from '@mantine/core';
import { fetchNui } from '../../../../utils/fetchNui';
import { StoreState, useStore } from '../../../../store';
import { useVisibility } from '../../../../store/visibility';
import Inputs from './components/Inputs';
import Switches from './components/Switches';
import { HiOutlineClipboardCheck } from 'react-icons/all';
import { useClipboard } from '../../../../store/clipboard';

const General: React.FC = () => {
  const setVisible = useVisibility((state) => state.setVisible);
  const clipboard = useClipboard((state) => state.clipboard);

  const handleSubmit = () => {
    const state = useStore.getState();
    const data = { ...state };
    if (data.name === '') data.name = null;
    if (data.passcode === '') data.passcode = null;
    data.autolock = data.autolock || null;
    data.maxDistance = data.maxDistance || null;
    data.doorRate = data.doorRate || null;
    for (let i = 0; i < data.items.length; i++) {
      const itemField = data.items[i];
      if (itemField.name === '') itemField.name = null;
      if (itemField.metadata === '') itemField.metadata = null;
    }
    let groupsObj: { [key: string]: number } = {};
    for (let i = 0; i < data.groups.length; i++) {
      const groupField = data.groups[i];
      if (groupField.name === '') groupField.name = null;
      groupField.grade = groupField.grade || null;
    }
    setVisible(false);
    fetchNui('createDoor', data);
  };

  return (
    <Stack justify="space-between" sx={{ height: '100%' }}>
      <Box>
        <Inputs />
        <Switches />
      </Box>

      <Center>
        <Button color="blue" uppercase onClick={() => handleSubmit()} fullWidth>
          Confirm door
        </Button>
        <Tooltip label="Apply copied settings" withArrow arrowSize={10}>
          <ActionIcon
            variant="outline"
            size="lg"
            ml={16}
            sx={{ width: 36, height: 36 }}
            color="blue"
            onClick={() => {
              if (!clipboard) return;
              useStore.setState(clipboard, true);
              fetchNui('notify', 'Settings applied');
            }}
          >
            <HiOutlineClipboardCheck size={20} />
          </ActionIcon>
        </Tooltip>
      </Center>
    </Stack>
  );
};

export default General;
