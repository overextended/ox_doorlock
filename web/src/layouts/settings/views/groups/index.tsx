import { Box, Text, Stack, Button, Group, Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import { TbPlus } from 'react-icons/tb';
import { useSetters } from '../../../../store';
import GroupFields from './components/GroupFields';

const Groups: React.FC = () => {
  const setGroups = useSetters((setter) => setter.setGroups);

  // Remove empty fields on unmount
  useEffect(() => {
    return () => {
      setGroups((prevState) =>
        prevState.filter((item, index) => item.name !== '' || item.grade !== null || index === 0)
      );
    };
  }, []);

  return (
    <Stack justify="space-between" align="center" sx={{ height: '100%' }}>
      <Box sx={{ width: '100%', overflowY: 'auto', height: 410 }}>
        <GroupFields />
        <Tooltip label="Create a new row" withArrow arrowSize={10}>
          <Button
            mt={16}
            fullWidth
            variant="light"
            onClick={() => setGroups((prevState) => [...prevState, { name: '', grade: null }])}
          >
            <TbPlus size={24} />
          </Button>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default Groups;
