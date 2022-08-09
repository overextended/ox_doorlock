import { Box, Center, Button, Stack } from '@mantine/core';
import { TbCheck } from 'react-icons/tb';
import Inputs from './components/Inputs';
import Switches from './components/Switches';

const General: React.FC = () => {
  return (
    <Stack justify="space-between" sx={{ height: '100%' }}>
      <Box>
        <Inputs />
        <Switches />
      </Box>

      <Center>
        <Button color="blue" fullWidth uppercase>
          Confirm door
        </Button>
      </Center>
    </Stack>
  );
};

export default General;
