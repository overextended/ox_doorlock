import { Box, Stack } from '@mantine/core';
import Inputs from './components/Inputs';
import Switches from './components/Switches';

const General: React.FC = () => {
  return (
    <Stack justify="space-between" sx={{ height: '100%' }}>
      <Box>
        <Inputs />
        <Switches />
      </Box>
    </Stack>
  );
};

export default General;
