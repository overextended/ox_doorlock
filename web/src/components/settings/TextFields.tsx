import { TextField } from '@mui/material';

const TextFields: React.FC = () => {
  return (
    <>
      <TextField fullWidth label="Passcode" style={{ marginBottom: '0.7rem' }} />
      <TextField
        fullWidth
        label="Autolock interval"
        type="number"
        style={{ marginBottom: '0.7rem' }}
      />
    </>
  );
};

export default TextFields;
