import { Button } from '@mui/material';
import { useStore } from '../../store';
import { fetchNui } from '../../utils/fetchNui';
import { useVisibilityStore } from '../../store';

const Submit: React.FC = () => {
  const setSettingsVisible = useVisibilityStore((state) => state.setSettingsVisible);

  const handleSubmit = () => {
    const state = useStore.getState();
    setSettingsVisible(false);
    fetchNui('createDoor', state);
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
