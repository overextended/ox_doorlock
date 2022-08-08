import { Stack, Autocomplete } from '@mantine/core';

const Sound: React.FC = () => {
  return (
    <Stack>
      <Autocomplete data={['Option 1', 'Option 2', 'Option 3', 'Option 4']} label="Lock sound" />
      <Autocomplete data={['Option 1', 'Option 2', 'Option 3', 'Option 4']} label="Unlock sound" />
    </Stack>
  );
};

export default Sound;
