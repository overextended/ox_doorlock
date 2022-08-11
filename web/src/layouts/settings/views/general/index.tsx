import { Box, Center, Button, Stack } from '@mantine/core';
import { fetchNui } from '../../../../utils/fetchNui';
import { useStore } from '../../../../store';
import { useVisibility } from '../../../../store/visibility';
import Inputs from './components/Inputs';
import Switches from './components/Switches';

const General: React.FC = () => {
  const setVisible = useVisibility((state) => state.setVisible);

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
        <Button color="blue" fullWidth uppercase onClick={() => handleSubmit()}>
          Confirm door
        </Button>
      </Center>
    </Stack>
  );
};

export default General;
