import { Button } from '@mui/material';
import { useStore } from '../../store';
import { fetchNui } from '../../utils/fetchNui';
import { useVisibilityStore } from '../../store';

const Submit: React.FC = () => {
  const setSettingsVisible = useVisibilityStore((state) => state.setSettingsVisible);

  const handleSubmit = () => {
    const state = useStore.getState();
    const data = { ...state };
    if (data.doorName === '') data.doorName = null;
    if (data.passcode === '') data.passcode = null;
    data.autolockInterval = data.autolockInterval ? +data.autolockInterval : null;
    data.interactDistance = data.interactDistance ? +data.interactDistance : null;
    for (let i = 0; i < data.itemFields.length; i++)
      if (data.itemFields[i] === '') data.itemFields[i] = null;
    for (let i = 0; i < data.groupFields.length; i++) {
      if (data.groupFields[i].name === '') data.groupFields[i].name = null;
      data.groupFields[i].grade = data.groupFields[i].grade ? +data.groupFields[i].grade! : null;
    }
    setSettingsVisible(false);
    fetchNui('createDoor', data);
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
