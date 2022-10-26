import { ActionIcon, Button, Center, Stack, Tooltip } from '@mantine/core';
import { useStore } from '../../store';
import { fetchNui } from '../../utils/fetchNui';
import { HiOutlineClipboardCheck } from 'react-icons/all';
import { useClipboard } from '../../store/clipboard';
import { useVisibility } from '../../store/visibility';

const Submit: React.FC = () => {
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
          charactersArr.push(parseInt(characterField) || characterField);
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
              },
              true
            );
            fetchNui('notify', 'Settings applied');
          }}
        >
          <HiOutlineClipboardCheck size={20} />
        </ActionIcon>
      </Tooltip>
    </Center>
  );
};

export default Submit;
