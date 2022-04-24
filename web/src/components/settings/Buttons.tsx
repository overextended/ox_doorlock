import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Buttons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        fullWidth
        style={{ marginBottom: '0.7rem' }}
        variant="outlined"
        onClick={() => navigate('/sound_options')}
      >
        Sound Options
      </Button>

      <Button
        fullWidth
        style={{ marginBottom: '0.7rem' }}
        variant="outlined"
        onClick={() => navigate('/job_auth')}
      >
        Group Authorisation
      </Button>

      <Button
        fullWidth
        style={{ marginBottom: '0.7rem' }}
        variant="outlined"
        onClick={() => navigate('/item_auth')}
      >
        Item Authorisation
      </Button>
    </>
  );
};

export default Buttons;
