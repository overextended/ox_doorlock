import { Box, createStyles, Transition } from '@mantine/core';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useNuiEvent } from './hooks/useNuiEvent';
import { defaultState, StoreState, useSetters, useStore } from './store';
import Doors from './layouts/doors';
import Settings from './layouts/settings';
import { useVisibility } from './store/visibility';
import { useExitListener } from './hooks/useExitListener';
import { useDoors } from './store/doors';
import { DoorColumn } from './store/doors';
import { convertData } from './utils/convertData';

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
  const [visible, setVisible] = useVisibility((state) => [state.visible, state.setVisible]);
  const doors = useDoors((state) => state.doors);
  const setDoors = useDoors((state) => state.setDoors);
  const navigate = useNavigate();

  useNuiEvent('playSound', async (data: { sound: string; volume: number }) => {
    const sound = new Audio(`./sounds/${data.sound}.ogg`);
    sound.volume = data.volume;
    await sound.play();
  });

  useNuiEvent('setSoundFiles', (data: string[]) => setSounds(data));

  useNuiEvent('setVisible', (data: number) => {
    setVisible(true);
    if (data === undefined) return navigate('/');
    for (let i = 0; i < doors.length; i++) {
      if (doors[i].id === data) {
        useStore.setState(convertData(doors[i]), true);
        navigate('/settings/general');
        break;
      }
    }
  });

  useNuiEvent('updateDoorData', (data: DoorColumn | number) => {
    // Door id sent so delete the filter out the door
    if (typeof data === 'number') return setDoors(doors.filter((door) => door.id !== data));
    else {
      // Single door sent so update the object
      if (data.hasOwnProperty('id')) {
        let index = doors.length;
        for (let i = 0; i < index; i++) {
          const door = Object.values(doors)[i];
          if (door.id == data.id) {
            index = i;
            break;
          }
        }

        return setDoors(Object.values({ ...doors, [index]: data } as DoorColumn[]));
      }

      // More than 1 door sent - replace the object
      return setDoors(Object.values(data));
    }
  });

  useExitListener(setVisible);

  return (
    <Box className={classes.container}>
      <Transition transition="slide-up" mounted={visible}>
        {(style) => (
          <Box className={classes.main} style={style}>
            <Routes>
              <Route path="/" element={<Doors />} />
              <Route path="/settings/*" element={<Settings />} />
            </Routes>
          </Box>
        )}
      </Transition>
    </Box>
  );
};

export default App;
