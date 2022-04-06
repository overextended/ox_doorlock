import { TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { passcodeState, autolockIntervalState } from '../../recoil/atoms';

const TextFields: React.FC = () => {
  const [passcode, setPasscode] = useRecoilState(passcodeState);
  const [autolockInterval, setAutolockInterval] = useRecoilState(autolockIntervalState);

  return (
    <>
      <TextField
        fullWidth
        label="Passcode"
        style={{ marginBottom: '0.7rem' }}
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />
      <TextField
        fullWidth
        label="Autolock interval"
        type="number"
        style={{ marginBottom: '0.7rem' }}
        value={autolockInterval}
        onChange={(e) => setAutolockInterval(e.target.value)}
      />
    </>
  );
};

export default TextFields;
