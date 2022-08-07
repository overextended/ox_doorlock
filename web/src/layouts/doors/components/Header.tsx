import { ActionIcon, CloseButton, createStyles, Group, TextInput, Tooltip } from '@mantine/core';
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

interface Props {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<Props> = ({ globalFilter, setGlobalFilter }) => {
  const { classes } = useStyles();

  return (
    <Group className={classes.main}>
      <Tooltip label="Create a new door" transition="pop">
        <ActionIcon variant="light" color="blue" size="lg">
          <Plus size={20} />
        </ActionIcon>
      </Tooltip>
      <TextInput
        icon={<Search size={20} />}
        placeholder="Search"
        className={classes.search}
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <CloseButton iconSize={20} size="lg" />
    </Group>
  );
};

export default Header;
