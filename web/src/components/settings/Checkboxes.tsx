import { Box, FormControlLabel, Checkbox, Tooltip } from '@mui/material';
import { useRecoilState } from 'recoil';
import { checkboxState } from '../../recoil/atoms';

const Checkboxes: React.FC = () => {
  const [checkboxes, setCheckboxes] = useRecoilState(checkboxState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'double' | 'automatic' | 'locked' | 'lockpick'
  ) => {
    setCheckboxes((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  };

  return (
    <>
      <Box display="flex">
        <Box display="flex" justifyContent="space-evenly" flexDirection="column">
          <FormControlLabel
            label="Double door"
            control={
              <Tooltip title="Door is a double door" disableInteractive enterDelay={500}>
                <Checkbox onChange={(e) => handleChange(e, 'double')} checked={checkboxes.double} />
              </Tooltip>
            }
            sx={{ margin: 0 }}
          />

          <FormControlLabel
            label="Automatic"
            control={
              <Tooltip
                title="Door automatically moves (garage, sliding, etc...)"
                disableInteractive
                enterDelay={500}
              >
                <Checkbox
                  name="automatic"
                  onChange={(e) => handleChange(e, 'automatic')}
                  checked={checkboxes.automatic}
                />
              </Tooltip>
            }
            sx={{ margin: 0 }}
          />
        </Box>
        <Box display="flex" justifyContent="space-evenly" flexDirection="column">
          <FormControlLabel
            label="Locked"
            control={
              <Tooltip title="Door is locked by default" disableInteractive enterDelay={500}>
                <Checkbox
                  name="locked"
                  onChange={(e) => handleChange(e, 'locked')}
                  checked={checkboxes.locked}
                />
              </Tooltip>
            }
            sx={{ margin: 0 }}
          />
          <FormControlLabel
            label="Lockpick"
            control={
              <Tooltip title="Door can be lockpicked" disableInteractive enterDelay={500}>
                <Checkbox
                  name="lockpick"
                  onChange={(e) => handleChange(e, 'lockpick')}
                  checked={checkboxes.lockpick}
                />
              </Tooltip>
            }
            sx={{ margin: 0 }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Checkboxes;
