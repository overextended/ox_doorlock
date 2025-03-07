import { Stack } from '@mantine/core';
import CategoryTable from './components/CategoryTable';
import Header from './components/Header';

const Categories: React.FC = () => {
  return (
    <Stack sx={{ height: '100%' }}>
      <Header />
      <CategoryTable />
    </Stack>
  );
};

export default Categories;
