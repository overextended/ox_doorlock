import { Button } from '@mui/material';
import { useVisibility } from '../../providers/VisibilityProvider';
import { useStore } from '../../store';
import { fetchNui } from '../../utils/fetchNui';

const Submit: React.FC = () => {
  const visibility = useVisibility();

  const handleSubmit = () => {
    const state = useStore.getState();
    fetchNui('createDoor', state);
    visibility.setVisible(false);
  };

  return (
    <>
      <Button fullWidth style={{ marginTop: '0.7rem' }} variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default Submit;
