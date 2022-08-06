import { createStyles, TextInput } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import DoorTable from './components/DoorTable';

const useStyles = createStyles({
  search: {
    width: '40%',
    transition: '300ms',
    '&:focus-within': {
      width: '50%',
    },
  },
});

const Doors: React.FC = () => {
  const { classes } = useStyles();
  return (
    <>
      <TextInput icon={<Search size={20} />} className={classes.search} />
      <DoorTable />
    </>
  );
};

export default Doors;
