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
        <ItemFields />

        <Tooltip label="Create a new row" withArrow arrowSize={10}>
          <Button
            fullWidth
            variant="light"
            onClick={() => setItemFields((prevState) => [...prevState, { name: '', metadata: '', remove: false }])}
          >
            <TbPlus size={24} />
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
};

export default Items;
