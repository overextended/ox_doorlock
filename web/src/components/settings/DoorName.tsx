import { TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { doorNameState } from '../../recoil/atoms';

const DoorName: React.FC = () => {
  const [doorName, setDoorName] = useRecoilState(doorNameState);

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
