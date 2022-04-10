import { Typography, Box, Grow } from '@mui/material';
import Checkboxes from './Checkboxes';
import AuthorisationButtons from './AuthorisationButtons';
import TextFields from './TextFields';
import Submit from './Submit';
import DoorName from './DoorName';
import { useVisibility } from '../../providers/VisibilityProvider';

const Settings: React.FC = () => {
  const visibility = useVisibility();

  return (
    <Grow in={visibility.visible} timeout={300}>
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
    </Grow>
  );
};

export default Settings;
