import { ActionIcon, CloseButton, createStyles, Group, TextInput, Tooltip } from '@mantine/core';
import { TbPlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useVisibility } from '../../../store/visibility';
import { fetchNui } from '../../../utils/fetchNui';
import Searchbar from './Search';
import { useStore, defaultState } from '../../../store';

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
  const navigate = useNavigate();
  const setVisible = useVisibility((state) => state.setVisible);

  return (
    <Group className={classes.main}>
      <Tooltip label="Create a new door" transition="pop">
        <ActionIcon
          variant="light"
          color="blue"
          size="lg"
          onClick={() => {
            useStore.setState(defaultState, true);
            navigate('/settings/general');
          }}
        >
          <TbPlus size={20} />
        </ActionIcon>
      </Tooltip>
      <Searchbar />
      <CloseButton
        iconSize={20}
        size="lg"
        onClick={() => {
          setVisible(false);
          fetchNui('exit');
        }}
      />
    </Group>
  );
};

export default Header;
