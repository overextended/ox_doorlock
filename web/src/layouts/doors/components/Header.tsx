import { Button, CloseButton, createStyles, Group, TextInput } from '@mantine/core';
import { Plus, Search } from 'tabler-icons-react';

const useStyles = createStyles({
  main: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },

  search: {
    flex: '1 1 auto',
    padding: 2,
  },
});
const Header: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Group className={classes.main}>
      <Button leftIcon={<Plus size={20} />} variant="light">
        Create Door
      </Button>
      <TextInput icon={<Search size={20} />} placeholder="Search" className={classes.search} />
      <CloseButton iconSize={20} />
    </Group>
  );
};

export default Header;
