import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography, Checkbox, FormControlLabel, Divider } from '@mui/material';

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
        width={250}
        borderRadius={1}
        textAlign="center"
      >
        <Typography style={{ marginBottom: '0.7rem' }}>Optional settings</Typography>
        <TextField fullWidth label="Door name (Optional)" style={{ marginBottom: '0.7rem' }} />
        <Divider />
        <Button fullWidth style={{ marginBottom: '0.7rem' }} variant="outlined">
          Job Authorisation
        </Button>
        <Button fullWidth style={{ marginBottom: '0.7rem' }} variant="outlined">
          Item Authorisation
        </Button>
        <TextField fullWidth label="Passcode (Optional)" style={{ marginBottom: '0.7rem' }} />
        <TextField
          fullWidth
          label="Autolock interval (Optional)"
          style={{ marginBottom: '0.7rem' }}
        />
        {/* Tood: fix alignment */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box justifySelf="flex-start" display="flex" flexDirection="column">
            <FormControlLabel label="Double doors" control={<Checkbox />} />
            <FormControlLabel label="Automatic" control={<Checkbox />} />
          </Box>
          <Box justifySelf="flex-end" display="flex" flexDirection="column">
            <FormControlLabel label="Locked" control={<Checkbox />} />
            <FormControlLabel label="Lockpick" control={<Checkbox />} />
          </Box>
        </Box>
        <Button fullWidth style={{ marginTop: '0.7rem' }} variant="outlined">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default App;
