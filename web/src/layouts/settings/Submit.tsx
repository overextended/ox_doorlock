import { ActionIcon, Button, Center, Text, Tooltip } from '@mantine/core';
import { useStore } from '../../store';
import { fetchNui } from '../../utils/fetchNui';
import { HiOutlineClipboardCheck, HiOutlineTrash } from 'react-icons/all';
import { useClipboard } from '../../store/clipboard';
import { useVisibility } from '../../store/visibility';
import { openConfirmModal } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';

const Submit: React.FC = () => {
  const navigate = useNavigate();
  const clipboard = useClipboard((state) => state.clipboard);
  const setVisible = useVisibility((state) => state.setVisible);

  const handleSubmit = () => {
    const data = { ...useStore.getState() };
    if (data.name === '') data.name = null;
    if (data.passcode === '') data.passcode = null;
    if (data.lockSound === '') data.lockSound = null;
    if (data.unlockSound === '') data.unlockSound = null;

    data.autolock = data.autolock || null;
    data.maxDistance = data.maxDistance || 2;
    data.doorRate = data.doorRate ? data.doorRate + 0.0 : null;
    data.auto = data.auto || null;
    data.lockpick = data.lockpick || null;
    data.hideUi = data.hideUi || null;
    data.holdOpen = data.holdOpen || null;

    if (data.items && data.items.length > 0) {
      const items = [];

      for (let i = 0; i < data.items?.length; i++) {
        const itemField = data.items[i];
        if (itemField.name && itemField.name !== '') {
          if (itemField.metadata === '') itemField.metadata = null;
          if (!itemField.remove) itemField.remove = null;
          items.push(itemField);
        }
      }

      // @ts-ignore
      data.items = items;
    }

    if (data.characters && data.characters.length > 0) {
      const charactersArr: Array<string | number> = [];

      for (let i = 0; i < data.characters.length; i++) {
        const characterField = data.characters[i];
        if (characterField && characterField !== '') {
          charactersArr.push(Number.isNaN(+characterField) ? characterField : +characterField);
        }
      }

      // @ts-ignore
      data.characters = charactersArr;
    }

    if (data.groups && data.groups.length > 0) {
      const groupsObj: { [key: string]: number } = {};

      for (let i = 0; i < data.groups.length; i++) {
        const groupField = data.groups[i];
        if (groupField.name && groupField.name !== '') groupsObj[groupField.name] = groupField.grade || 0;
      }

      // @ts-ignore
      data.groups = groupsObj;
    } // @ts-ignore
    else data.groups = null;

    if (data.lockpickDifficulty && data.lockpickDifficulty.length > 0) {
      const lockpickArr = [];
      for (let i = 0; i < data.lockpickDifficulty.length; i++) {
        const field = data.lockpickDifficulty[i];
        if (field !== '') lockpickArr.push(field);
      }

      data.lockpickDifficulty = lockpickArr;
    }

    setVisible(false);
    fetchNui('createDoor', data);
  };

  return (
    <Center>
      <Button color="blue" uppercase onClick={() => handleSubmit()} fullWidth>
        Confirm door
      </Button>
      <Tooltip label={!clipboard ? 'No door settings copied' : 'Apply copied settings'} withArrow arrowSize={10}>
        <ActionIcon
          variant="outline"
          disabled={!clipboard}
          size="lg"
          ml={16}
          sx={{ width: 36, height: 36 }}
          color="blue"
          onClick={() => {
            useStore.setState(
              {
                name: '',
                passcode: clipboard.passcode,
                autolock: clipboard.autolock,
                items: clipboard.items,
                characters: clipboard.characters,
                groups: clipboard.groups,
                maxDistance: clipboard.maxDistance,
                doorRate: clipboard.doorRate,
                lockSound: clipboard.lockSound,
                unlockSound: clipboard.unlockSound,
                auto: clipboard.auto,
                state: clipboard.state,
                lockpick: clipboard.lockpick,
                hideUi: clipboard.hideUi,
                doors: clipboard.doors,
                lockpickDifficulty: clipboard.lockpickDifficulty,
                holdOpen: clipboard.holdOpen
              },
              true
            );
            fetchNui('notify', 'Settings applied');
          }}
        >
          <HiOutlineClipboardCheck size={20} />
        </ActionIcon>
      </Tooltip>
      <ActionIcon
        variant="outline"
        size="lg"
        ml={16}
        sx={{ width: 36, height: 36 }}
        color="red"
        disabled={!useStore.getState().id}
        onClick={() =>
          openConfirmModal({
            title: 'Confirm deletion',
            centered: true,
            withCloseButton: false,
            children: (
              <Text>
                Are you sure you want to delete
                <Text component="span" weight={700}>{` ${useStore.getState().name}`}</Text>?
              </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => {
              fetchNui('deleteDoor', useStore.getState().id);
              navigate('/')
            },
          })
        }
      >
        <HiOutlineTrash size={20} />
      </ActionIcon>
    </Center>
  );
};

export default Submit;
