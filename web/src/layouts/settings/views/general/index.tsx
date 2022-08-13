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
    const data = { ...useStore.getState() };
    if (data.name === '') data.name = null;
    if (data.passcode === '') data.passcode = null;
    if (data.lockSound === '') data.lockSound = null;
    if (data.unlockSound === '') data.unlockSound = null;

    data.autolock = data.autolock || null;
    data.maxDistance = data.maxDistance || 2;
    data.doorRate = data.doorRate ? data.doorRate + 0.0 : null;
    data.auto = data.auto || null;
    data.lockpick = data.lockpick || null;
    data.hideUi = data.hideUi || null;

    if (data.items && data.items.length > 0) {
      const items = [];

      for (let i = 0; i < data.items?.length; i++) {
        const itemField = data.items[i];
        if (itemField.name && itemField.name !== '') {
          if (itemField.metadata === '') itemField.metadata = null;
          if (itemField.remove) itemField.remove = null;
          items.push(itemField);
        }
      }

      // @ts-ignore
      data.items = items;
    }

    if (data.groups && data.groups.length > 0) {
      const groupsObj: { [key: string]: number } = {};

      for (let i = 0; i < data.groups.length; i++) {
        const groupField = data.groups[i];
        if (groupField.name && groupField.name !== '') groupsObj[groupField.name] = groupField.grade || 0;
      }

      // @ts-ignore
      data.groups = groupsObj;
    } else data.groups = null;

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
