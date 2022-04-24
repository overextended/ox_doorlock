import { Button, Box } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useVisibilityStore } from '../../store';
import { useNavigate } from 'react-router-dom';

const SubmitButton: React.FC = () => {
  const navigate = useNavigate();
  const setSoundVisible = useVisibilityStore((state) => state.setSoundVisible);

  const handleSubmit = () => {
    navigate('/');
    setSoundVisible(false);
  };

  return (
    <Box marginTop={2} width="100%">
      <Button variant="outlined" fullWidth onClick={() => handleSubmit()}>
        <Check />
      </Button>
    </Box>
  );
};

export default SubmitButton;
