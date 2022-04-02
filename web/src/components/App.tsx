import Box from '@mui/material/Box';

const App: React.FC = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Box
        height="fit-content"
        bgcolor="rgba(0, 0, 0, 0.8)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        p={3}
        borderRadius={1}
      ></Box>
    </Box>
  );
};

export default App;
