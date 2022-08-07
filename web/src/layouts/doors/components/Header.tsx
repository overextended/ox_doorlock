import { ActionIcon, CloseButton, createStyles, Group, TextInput, Tooltip } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import Searchbar from './Search';

const useStyles = createStyles({
  main: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
});

const Header: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Group className={classes.main}>
      <Tooltip label="Create a new door" transition="pop">
        <ActionIcon variant="light" color="blue" size="lg">
          <Plus size={20} />
        </ActionIcon>
      </Tooltip>
      <Searchbar />
      <CloseButton iconSize={20} size="lg" />
    </Group>
  );
};

export default Header;
