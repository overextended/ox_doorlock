import { Stack } from '@mantine/core';
import Header from './components/Header';
import DoorTable from './components/DoorTable';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

const Doors: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedFilter = useDebounce(globalFilter, 500);

  return (
    <Stack>
      <Header globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <DoorTable globalFilter={debouncedFilter} setGlobalFilter={setGlobalFilter} />
    </Stack>
  );
};

export default Doors;
