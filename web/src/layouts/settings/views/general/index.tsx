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
    if (data.doorName === '') data.doorName = null;
    if (data.passcode === '') data.passcode = null;
    data.autolockInterval = data.autolockInterval || null;
    data.interactDistance = data.interactDistance || null;
    data.doorRate = data.doorRate || null;
    for (let i = 0; i < data.itemFields.length; i++) {
      const itemField = data.itemFields[i];
      if (itemField.name === '') itemField.name = null;
      if (itemField.metadata === '') itemField.metadata = null;
    }
    for (let i = 0; i < data.groupFields.length; i++) {
      const groupField = data.groupFields[i];
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
