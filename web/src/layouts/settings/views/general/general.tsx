import { Box, Stack, TextInput, NumberInput } from '@mantine/core';

const General: React.FC = () => {
  return (
    <Box>
      <Stack justify="center" align="center" sx={{ width: '100%' }}>
        <TextInput placeholder="Door name" />
        <TextInput placeholder="Passcode" />
        <NumberInput placeholder="Autolock interval" />
        <NumberInput placeholder="Interact distance" />
        <NumberInput placeholder="Door rate" />
      </Stack>
    </Box>
  );
};

export default General;
