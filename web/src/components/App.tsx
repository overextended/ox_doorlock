import { Box, TextField, Button, Typography } from '@mui/material';
import Checkboxes from './Checkboxes';
import AuthorisationButtons from './AuthorisationButtons';
import TextFields from './TextFields';
import Submit from './Submit';

const App: React.FC = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
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
        <TextField fullWidth label="Door name" style={{ marginBottom: '0.7rem' }} />
        <AuthorisationButtons />
        <TextFields />
        <Checkboxes />
        <Submit />
      </Box>
    </Box>
  );
};

export default App;
