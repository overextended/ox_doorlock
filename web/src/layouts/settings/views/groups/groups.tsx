import { Box, Input, Stack, Button, Group, NumberInput, Tooltip } from '@mantine/core';
import { TbPlus } from 'react-icons/tb';

const Groups: React.FC = () => {
  return (
    <Stack justify="space-between" align="center" sx={{ height: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Group p={8} position="center">
          <Input placeholder="Group" sx={{ width: '40%' }} />
          <NumberInput placeholder="Grade" sx={{ width: '40%' }} />
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
