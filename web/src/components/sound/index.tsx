import { Box, Typography, Fade } from '@mui/material';
import { defaultState, StoreState, useStore, useVisibilityStore } from '../../store';
import ValueFields from './ValueFields';
import SubmitButton from './SubmitButton';
import { useEffect } from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { useNavigate } from 'react-router-dom';
import { useExitListener } from '../../hooks/useExitListener';

const Sound: React.FC = () => {
  const visible = useVisibilityStore((state) => state.soundVisible);
  const setVisible = useVisibilityStore((state) => state.setSoundVisible);
  const navigate = useNavigate();
  const setSettingsVisible = useVisibilityStore((state) => state.setSettingsVisible);

  useNuiEvent<boolean | StoreState>('setVisible', (data) => {
    navigate('/');
    setSettingsVisible(true);
    useStore.setState(typeof data === 'object' ? data : defaultState, true);
    setVisible(true);
  });

  useExitListener(setVisible);

  useEffect(() => setVisible(true), []);

  return (
    <Fade in={visible}>
      <Box
        height="fit-content"
        bgcolor="rgba(0, 0, 0, 0.8)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        p={3}
        pt={2}
        width={250}
        borderRadius={1}
        textAlign="center"
      >
        <Typography marginBottom="0.7rem">Sound options</Typography>
        <ValueFields />
        <SubmitButton />
      </Box>
    </Fade>
  );
};

export default Sound;
