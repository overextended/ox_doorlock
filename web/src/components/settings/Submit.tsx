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
    for (let i = 0; i < data.itemFields.length; i++) {
      const itemField = data.itemFields[i];
      if (itemField.name === '') itemField.name = null;
      if (itemField.metadata === '') itemField.metadata = null;
    }
    for (let i = 0; i < data.groupFields.length; i++) {
      const groupField = data.groupFields[i];
      if (groupField.name === '') groupField.name = null;
      groupField.grade = groupField.grade ? +groupField.grade! : null;
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
