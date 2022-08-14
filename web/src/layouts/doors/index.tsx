import { Stack } from '@mantine/core';
import Header from './components/Header';
import DoorTable from './components/DoorTable';

const Doors: React.FC = () => {
  return (
    <Stack sx={{ height: '100%' }}>
      <Header />
      <DoorTable />
    </Stack>
  );
};

export default Doors;
