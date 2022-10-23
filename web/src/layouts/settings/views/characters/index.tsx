import { Box, Stack, Button, Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import { TbPlus } from 'react-icons/tb';
import { useSetters } from '../../../../store';
import CharacterFields from './components/CharacterFields';

const Characters: React.FC = () => {
  const setCharacters = useSetters((setter) => setter.setCharacters);

  // Remove empty fields on unmount
  useEffect(() => {
    return () => {
      setCharacters((prevState) =>
        prevState.filter((item, index) => item !== '' || index === 0)
      );
    };
  }, []);

  return (
    <Stack justify="space-between" align="center" sx={{ height: '100%' }}>
      <Box sx={{ width: '100%', overflowY: 'auto', height: 410 }}>
        <CharacterFields />
        <Tooltip label="Create a new row" withArrow arrowSize={10}>
          <Button
            mt={16}
            fullWidth
            variant="light"
            onClick={() => setCharacters((prevState) => [...prevState, ''])}
          >
            <TbPlus size={24} />
          </Button>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default Characters;
