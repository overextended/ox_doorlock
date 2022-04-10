import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Settings from './settings';
import Auth from './auth';

const App: React.FC = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="job_auth" element={<Auth type="job" />} />
          <Route path="item_auth" element={<Auth type="item" />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
