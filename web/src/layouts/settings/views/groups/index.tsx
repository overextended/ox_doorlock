import { Box, Input, Stack, Button, Group, NumberInput, Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import { TbPlus } from 'react-icons/tb';
import { useSetters } from '../../../../store';
import Fields from './components/fields';

const Groups: React.FC = () => {
  const setGroupFields = useSetters((setter) => setter.setGroupFields);

  // Remove empty fields on unmount
  useEffect(() => {
    return () => {
      setGroupFields((prevState) =>
        prevState.filter((item, index) => item.name !== '' || item.grade !== null || index === 0),
      );
    };
  }, []);

  return (
    <Stack justify="space-between" align="center" sx={{ height: '100%' }}>
      <Box sx={{ width: '100%', overflowY: 'auto', maxHeight: 410 }}>
        <Fields />
      </Box>

      <Tooltip label="Create a new row" withArrow arrowSize={10}>
        <Button
          fullWidth
          variant="light"
          onClick={() => setGroupFields((prevState) => [...prevState, { name: '', grade: null }])}
        >
          <TbPlus size={24} />
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default Groups;
