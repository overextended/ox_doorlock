import { Box, Stack, Tabs, Group } from '@mantine/core';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { TbSettings, TbBriefcase, TbBottle, TbBell } from 'react-icons/tb';
import General from './views/general/general';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <>
      <Box sx={{ height: '100%', display: 'flex' }}>
        <Tabs
          orientation="vertical"
          color="blue"
          sx={{ height: '100%' }}
          value={tabValue}
          onTabChange={(value) => navigate(`/settings/${value}`)}
        >
          <Tabs.List>
            <Tabs.Tab value="general" icon={<TbSettings size={20} />}>
              General
            </Tabs.Tab>
            <Tabs.Tab value="groups" icon={<TbBriefcase size={20} />}>
              Groups
            </Tabs.Tab>
            <Tabs.Tab value="items" icon={<TbBottle size={20} />}>
              Items
            </Tabs.Tab>
            <Tabs.Tab value="sound" icon={<TbBell size={20} />}>
              Sound
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Box p={16} sx={{ width: '100%', height: '100%' }}>
          <Routes>
            <Route path="/general" element={<General />} />
            <Route path="/groups" element={<>Groups</>} />
            <Route path="/items" element={<>Items</>} />
            <Route path="/sound" element={<>Sound</>} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
