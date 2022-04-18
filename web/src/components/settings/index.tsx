import { Typography, Box, Fade } from '@mui/material';
import Checkboxes from './Checkboxes';
import AuthorisationButtons from './AuthorisationButtons';
import TextFields from './TextFields';
import Submit from './Submit';
import DoorName from './DoorName';
import { useVisibilityStore, defaultState, useStore } from '../../store';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { useNavigate } from 'react-router-dom';
import { useExitListener } from '../../hooks/useExitListener';
import { StoreState } from '../../store';

const Settings: React.FC = () => {
  const visible = useVisibilityStore((state) => state.settingsVisible);
  const setVisible = useVisibilityStore((state) => state.setSettingsVisible);
  const navigate = useNavigate();

  useNuiEvent<boolean | StoreState>('setVisible', (data) => {
    navigate('/');
    useStore.setState(typeof data === 'object' ? data : defaultState, true);
    setVisible(true);
  });

  useExitListener(setVisible);

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
        <Typography style={{ marginBottom: '0.7rem' }}>Optional settings</Typography>
        <DoorName />
        <AuthorisationButtons />
        <TextFields />
        <Checkboxes />
        <Submit />
      </Box>
    </Fade>
  );
};

export default Settings;
