import { Box, Stack, Button, Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import { TbPlus } from 'react-icons/tb';
import { useSetters } from '../../../../store';
import ItemFields from './components/ItemFields';

const Items: React.FC = () => {
  const setItemFields = useSetters((setter) => setter.setItems);

  // Clear empty item fields when leaving the page
  useEffect(() => {
    return () => {
      setItemFields((prevState) => prevState.filter((item, index) => index === 0 || item.name !== ''));
    };
  }, []);

  return (
    <>
      <Stack justify="space-between" align="center" sx={{ height: '100%' }}>
        <Box sx={{ width: '100%', overflowY: 'auto', height: 410 }}>
          <ItemFields />

          <Tooltip label="Create a new row" withArrow arrowSize={10}>
            <Button
              mt={16}
              fullWidth
              variant="light"
              onClick={() => setItemFields((prevState) => [...prevState, { name: '', metadata: '', remove: false }])}
            >
              <TbPlus size={24} />
            </Button>
          </Tooltip>
        </Box>
      </Stack>
    </>
  );
};

export default Items;
