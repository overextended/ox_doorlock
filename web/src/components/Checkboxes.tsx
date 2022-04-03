import { Box, FormControlLabel, Checkbox } from '@mui/material';

const Checkboxes: React.FC = () => {
  return (
    <>
      <Box display="flex">
        <Box display="flex" justifyContent="space-evenly" flexDirection="column">
          <FormControlLabel label="Double door" control={<Checkbox />} sx={{ margin: 0 }} />
          <FormControlLabel label="Automatic" control={<Checkbox />} sx={{ margin: 0 }} />
        </Box>
        <Box display="flex" justifyContent="space-evenly" flexDirection="column">
          <FormControlLabel label="Locked" control={<Checkbox />} sx={{ margin: 0 }} />
          <FormControlLabel label="Lockpick" control={<Checkbox />} sx={{ margin: 0 }} />
        </Box>
      </Box>
    </>
  );
};

export default Checkboxes;
