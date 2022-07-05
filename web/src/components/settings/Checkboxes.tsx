import { Box, FormControlLabel, Checkbox, Tooltip } from '@mui/material';
import { useStore, useSetters } from '../../store';

const Checkboxes: React.FC = () => {
  const checkboxes = useStore((state) => state.checkboxes);
  const toggleCheckbox = useSetters((setters) => setters.toggleCheckbox);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'double' | 'automatic' | 'locked' | 'lockpick' | 'hideUi',
  ) => {
    toggleCheckbox(type);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box display="flex">
        <Box display="flex" justifyContent="space-evenly" flexDirection="column">
          <FormControlLabel
            label="Double door"
            control={
              <Tooltip
                arrow
                title="Door is a double door"
                placement="left"
                disableInteractive
                enterDelay={500}
              >
                <Checkbox onChange={(e) => handleChange(e, 'double')} checked={checkboxes.double} />
              </Tooltip>
            }
            sx={{ margin: 0 }}
          />

          <FormControlLabel
            label="Automatic"
            control={
              <Tooltip
                arrow
                placement="left"
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
              <Tooltip
                placement="top"
                arrow
                title="Door is locked by default"
                disableInteractive
                enterDelay={500}
              >
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
              <Tooltip
                arrow
                placement="top"
                title="Door can be lockpicked"
                disableInteractive
                enterDelay={500}
              >
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
      <FormControlLabel
        label="Hide UI"
        control={
          <Tooltip
            placement="left"
            arrow
            title="Hide UI indicators"
            disableInteractive
            enterDelay={500}
          >
            <Checkbox
              name="hideUi"
              onChange={(e) => handleChange(e, 'hideUi')}
              checked={checkboxes.hideUi}
            />
          </Tooltip>
        }
        sx={{ margin: 0 }}
      />
    </Box>
  );
};

export default Checkboxes;
