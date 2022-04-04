import { Box, FormControlLabel, Checkbox, Tooltip } from '@mui/material';

const Checkboxes: React.FC = () => {
  return (
    <>
      <Box display="flex">
        <Box display="flex" justifyContent="space-evenly" flexDirection="column">
          <FormControlLabel
            label="Double door"
            control={
              <Tooltip title="Door is a double door" disableInteractive enterDelay={500}>
                <Checkbox />
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
                <Checkbox />
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
                <Checkbox />
              </Tooltip>
            }
            sx={{ margin: 0 }}
          />
          <FormControlLabel
            label="Lockpick"
            control={
              <Tooltip title="Door can be lockpicked" disableInteractive enterDelay={500}>
                <Checkbox />
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
