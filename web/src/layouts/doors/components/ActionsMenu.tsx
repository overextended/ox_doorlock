import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { CellContext } from '@tanstack/react-table';
import { GiTeleport } from 'react-icons/gi';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { TbDots, TbSettings, TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { useClipboard } from '../../../store/clipboard';
import { DoorColumn } from '../../../store/doors';
import { useVisibility } from '../../../store/visibility';
import { convertData } from '../../../utils/convertData';
import { fetchNui } from '../../../utils/fetchNui';

const ActionsMenu: React.FC<{ data: CellContext<DoorColumn, unknown> }> = ({ data }) => {
  const navigate = useNavigate();
  const setClipboard = useClipboard((state) => state.setClipboard);
  const setVisible = useVisibility((state) => state.setVisible);
  return (
    <Menu position="right-start" width={200}>
      <Menu.Target>
        <Tooltip label="Door actions">
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
          Settings
        </Menu.Item>
        <Menu.Item
          icon={<HiOutlineClipboardCopy size={18} />}
          onClick={() => {
            setClipboard(convertData(data.row.original));
            fetchNui('notify', 'Settings copied');
          }}
        >
          Copy settings
        </Menu.Item>
        <Menu.Item
          icon={<GiTeleport size={18} />}
          onClick={() => {
            setVisible(false);
            fetchNui('teleportToDoor', data.row.getValue('id'));
          }}
        >
          Teleport to door
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<TbTrash size={18} />}
          onClick={() =>
            openConfirmModal({
              title: 'Confirm deletion',
              centered: true,
              withCloseButton: false,
              children: (
                <Text>
                  Are you sure you want to delete
                  <Text component="span" weight={700}>{` ${data.row.getValue('name')}`}</Text>?
                </Text>
              ),
              labels: { confirm: 'Confirm', cancel: 'Cancel' },
              confirmProps: { color: 'red' },
              onConfirm: () => {
                fetchNui('deleteDoor', data.row.getValue('id'));
              },
            })
          }
        >
          Delete door
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionsMenu;
