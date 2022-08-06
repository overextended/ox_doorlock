import { ActionIcon, Table, Tooltip, UnstyledButton, Text, Group } from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Settings, Trash, Selector, ChevronDown, ChevronUp } from 'tabler-icons-react';

interface DoorColumn {
  id: number;
  name: string;
  zone: string;
}

const data: DoorColumn[] = [
  { id: 1, name: 'mrpd-armoury', zone: 'Mission Row' },
  { id: 2, name: 'mrpd-lockers', zone: 'Mission Row' },
  { id: 3, name: 'pillbox-lockers', zone: 'Pillbox Hill' },
];

const DoorTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  // const [data, setData] = useState<DoorColumn[]>([
  //   {
  //     id: 0,
  //     name: '',
  //     zone: '',
  //   },
  // ]);

  const columns = useMemo<ColumnDef<DoorColumn>[]>(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'zone',
        header: 'Zone',
        accessorKey: 'zone',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'edit',
        cell: () => (
          <Tooltip label="Edit">
            <ActionIcon color="blue" variant="transparent">
              <Settings size={20} />
            </ActionIcon>
          </Tooltip>
        ),
      },
      {
        id: 'delete',
        cell: () => (
          <Tooltip label="Delete">
            <ActionIcon color="red" variant="transparent">
              <Trash size={20} />
            </ActionIcon>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                <UnstyledButton onClick={header.column.getToggleSortingHandler()}>
                  <Group>
                    <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>
                    {header.column.getIsSorted() === 'desc' ? (
                      <ChevronDown />
                    ) : header.column.getIsSorted() === 'asc' ? (
                      <ChevronUp />
                    ) : !header.column.getCanHide() ? (
                      <Selector />
                    ) : (
                      <></>
                    )}
                  </Group>
                </UnstyledButton>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <>
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DoorTable;
