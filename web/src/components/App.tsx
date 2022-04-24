import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Settings from './settings';
import Auth from './auth';
import Sound from './sound';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { useSetters } from '../store';

const App: React.FC = () => {
  const setSounds = useSetters((setter) => setter.setSounds);

  useNuiEvent('playSound', async (data: { sound: string; volume: number }) => {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/${data.sound}.ogg`);
    sound.volume = data.volume || 1;
    await sound.play();
  });

  useNuiEvent('setSoundFiles', (data: string[]) => setSounds(data));

  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="job_auth" element={<Auth type="job" />} />
          <Route path="item_auth" element={<Auth type="item" />} />
          <Route path="sound_options" element={<Sound />} />
          {/* Weird solution to display the main page when setting visible */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
