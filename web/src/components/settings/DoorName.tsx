import { TextField } from '@mui/material';
import { useStore, useSetters } from '../../store';

const DoorName: React.FC = () => {
  const doorName = useStore((state) => state.doorName);
  const setDoorName = useSetters((setter) => setter.setDoorName);

  return (
    <TextField
      fullWidth
      label="Door name"
      style={{ marginBottom: '0.7rem' }}
      value={doorName}
      onChange={(e) => setDoorName(e.target.value)}
    />
  );
};

export default DoorName;
