import { Box, Input, Stack, Button, Group, NumberInput, Text, Tooltip } from '@mantine/core';
import { TbPlus } from 'react-icons/tb';

const Groups: React.FC = () => {
  return (
    <Stack justify="space-between" align="center" sx={{ height: '100%' }}>
      <Box>
        <Group p={8}>
          <Input placeholder="Group" />
          <NumberInput placeholder="Grade" />
        </Group>
        <Group p={8}>
          <Input placeholder="Group" />
          <NumberInput placeholder="Grade" />
        </Group>
      </Box>

      <Tooltip label="Create a new row" withArrow arrowSize={10}>
        <Button fullWidth variant="light">
          <TbPlus size={24} />
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default Groups;
