import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Settings from './settings';

const App: React.FC = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="job_auth" element={<>hdsakdosa</>} />
          <Route path="item_auth" element={<>dsadasda</>} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
