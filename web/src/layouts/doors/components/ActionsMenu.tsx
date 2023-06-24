import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import { TbDots, TbSettings, TbTrash } from 'react-icons/tb';
import { HiOutlineClipboardCopy } from 'react-icons/all';
import { GiTeleport } from 'react-icons/gi';
import { DoorColumn } from '../../../store/doors';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { convertData } from '../../../utils/convertData';
import { useClipboard } from '../../../store/clipboard';
import { fetchNui } from '../../../utils/fetchNui';
import { openConfirmModal } from '@mantine/modals';
import { CellContext } from '@tanstack/react-table';
import { useVisibility } from '../../../store/visibility';
import { useLocales } from '../../../providers/LocaleProvider';

const ActionsMenu: React.FC<{ data: CellContext<DoorColumn, unknown> }> = ({ data }) => {
  const navigate = useNavigate();
  const setClipboard = useClipboard((state) => state.setClipboard);
  const setVisible = useVisibility((state) => state.setVisible);
  const { locale } = useLocales();
  return (
    <Menu position="right-start" width={200}>
      <Menu.Target>
        <Tooltip label={locale.ui.door_actions}>
          <ActionIcon color="blue.4" variant="transparent">
            <TbDots size={24} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<TbSettings size={18} />}
          onClick={() => {
            useStore.setState(convertData(data.row.original), true);
            navigate('/settings/general');
          }}
        >
          {locale.ui.settings}
        </Menu.Item>
        <Menu.Item
          icon={<HiOutlineClipboardCopy size={18} />}
          onClick={() => {
            setClipboard(convertData(data.row.original));
            fetchNui('notify', locale.ui.settings_copied);
          }}
        >
          {locale.ui.copy_settings}
        </Menu.Item>
        <Menu.Item
          icon={<GiTeleport size={18} />}
          onClick={() => {
            setVisible(false);
            fetchNui('teleportToDoor', data.row.getValue('id'));
          }}
        >
          {locale.ui.teleport_to_door}
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<TbTrash size={18} />}
          onClick={() =>
            openConfirmModal({
              title: locale.ui.confirm_delete,
              centered: true,
              withCloseButton: false,
              children: (
                <Text>
                  {locale.ui.confirm_delete_prompt}
                  <Text component="span" weight={700}>{` ${data.row.getValue('name')}`}</Text>?
                </Text>
              ),
              labels: { confirm: locale.ui.confirm, cancel: locale.ui.cancel },
              confirmProps: { color: 'red' },
              onConfirm: () => {
                fetchNui('deleteDoor', data.row.getValue('id'));
              },
            })
          }
        >
          {locale.ui.delete_door}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionsMenu;
