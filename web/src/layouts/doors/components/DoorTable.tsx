import { ActionIcon, Table, Tooltip } from '@mantine/core';
import { Pencil, Trash } from 'tabler-icons-react';

const data = [
  { id: 1, name: 'mrpd-armoury', zone: 'Mission Row' },
  { id: 2, name: 'mrpd-lockers', zone: 'Mission Row' },
  { id: 3, name: 'pillbox-lockers', zone: 'Pillbox Hill' },
];

const DoorTable: React.FC = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Zone</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.zone}</td>
            <td>
              <Tooltip label="Edit">
                <ActionIcon color="blue" variant="transparent">
                  <Pencil size={20} />
                </ActionIcon>
              </Tooltip>
            </td>
            <td>
              <Tooltip label="Delete">
                <ActionIcon color="red" variant="transparent">
                  <Trash size={20} />
                </ActionIcon>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DoorTable;
