import { Box, Typography, Grow } from '@mui/material';
import Buttons from './Buttons';
import ItemFields from './ItemFields';
import GroupFields from './GroupFields';
import { useVisibilityStore, useStore, defaultState } from '../../store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { useExitListener } from '../../hooks/useExitListener';

const Auth: React.FC<{ type: string }> = ({ type }) => {
  const setVisible = useVisibilityStore((state) => state.setAuthVisible);
  const setSettingsVisible = useVisibilityStore((state) => state.setSettingsVisible);
  const visible = useVisibilityStore((state) => state.authVisible);
  const navigate = useNavigate();

  // If auth was the last visible component
  // upon setting ui to visible, reset state
  // and display the settings page
  useNuiEvent('setVisible', () => {
    useStore.setState(defaultState, true);
    navigate('/');
    setSettingsVisible(true);
  });

  useExitListener(setVisible);

  useEffect(() => setVisible(true), []);

  return (
    <Grow in={visible} timeout={300}>
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
        <Typography style={{ marginBottom: '0.7rem' }}>
          {type === 'item' ? 'Item' : 'Group'} authorisation
        </Typography>
        <Box maxHeight={300} sx={{ overflowY: 'auto' }} padding={1} width="100%">
          {type === 'item' ? (
            <Box>
              <ItemFields />
            </Box>
          ) : (
            <Box>
              <GroupFields />
            </Box>
          )}
        </Box>
        <Buttons type={type} />
      </Box>
    </Grow>
  );
};

export default Auth;
