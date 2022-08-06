import { Box, createStyles, Stack } from '@mantine/core';
import { HashRouter, Routes, Route } from 'react-router-dom';
// import Settings from './settings';
// import Auth from './components/auth';
// import Sound from './components/sound';
import { useNuiEvent } from './hooks/useNuiEvent';
import { useSetters } from './store';
import Doors from './layouts/doors';
import Settings from './layouts/settings';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    width: 700,
    height: 500,
    backgroundColor: theme.colors.dark[8],
    borderRadius: theme.radius.sm,
  },

  search: {
    width: '40%',
    transition: '300ms',
    '&:focus-within': {
      width: '50%',
    },
  },
}));

const App: React.FC = () => {
  const { classes } = useStyles();
  const setSounds = useSetters((setter) => setter.setSounds);

  useNuiEvent('playSound', async (data: { sound: string; volume: number }) => {
    const sound = new Audio(`./sounds/${data.sound}.ogg`);
    sound.volume = data.volume;
    await sound.play();
  });

  useNuiEvent('setSoundFiles', (data: string[]) => setSounds(data));

  return (
    <Box className={classes.container}>
      <Box className={classes.main}>
        <Routes>
          <Route path="/" element={<Doors />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
