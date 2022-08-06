import { Box, createStyles, TextInput, Stack, Table, ActionIcon, Tooltip } from '@mantine/core';
import { HashRouter, Routes, Route } from 'react-router-dom';
// import Settings from './settings';
import Auth from './auth';
import Sound from './sound';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { useSetters } from '../store';
import { Door, Pencil, Search, Trash } from 'tabler-icons-react';

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

const data = [
  { id: 1, name: 'mrpd-armoury', zone: 'Mission Row' },
  { id: 2, name: 'mrpd-lockers', zone: 'Mission Row' },
  { id: 3, name: 'pillbox-lockers', zone: 'Pillbox Hill' },
];

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
        <Stack align="center" p={16}>
          <TextInput icon={<Search size={20} />} className={classes.search} />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Zone</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.zone}</td>
                  <td>
                    <Tooltip label="Edit">
                      <ActionIcon color="blue" variant="transparent">
                        <Pencil size={20} />
                      </ActionIcon>
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip label="Delete">
                      <ActionIcon color="red" variant="transparent">
                        <Trash size={20} />
                      </ActionIcon>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      </Box>
      {/* <HashRouter>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="job_auth" element={<Auth type="job" />} />
          <Route path="item_auth" element={<Auth type="item" />} />
          <Route path="sound_options" element={<Sound />} />
        </Routes>
      </HashRouter> */}
    </Box>
  );
};

export default App;
