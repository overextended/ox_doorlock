import { ActionIcon, CloseButton, createStyles, Group, TextInput, Tooltip } from '@mantine/core';
import { TbPlus } from 'react-icons/tb';
import Searchbar from './Search';

const useStyles = createStyles({
  main: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
});

const Header: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Group className={classes.main}>
      <Tooltip label="Create a new door" transition="pop">
        <ActionIcon variant="light" color="blue" size="lg">
          <TbPlus size={20} />
        </ActionIcon>
      </Tooltip>
      <Searchbar />
      <CloseButton iconSize={20} size="lg" />
    </Group>
  );
};

export default Header;
