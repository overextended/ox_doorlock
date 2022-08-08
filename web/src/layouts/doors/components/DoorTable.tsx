import { ActionIcon, Table, Tooltip, UnstyledButton, Text, Group, Center, Stack, Pagination, Box } from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbSettings, TbTrash, TbSelector, TbChevronDown, TbChevronUp, TbSearch } from 'react-icons/tb';
import { useSearch } from '../../../store/search';

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
  const globalFilter = useSearch((state) => state.debouncedValue);
  const navigate = useNavigate();

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
        enableGlobalFilter: false, // id is of type number so it breaks filter function
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
            <ActionIcon color="blue" variant="transparent" onClick={() => navigate('/settings')}>
              <TbSettings size={20} />
            </ActionIcon>
          </Tooltip>
        ),
      },
      {
        id: 'delete',
        cell: () => (
          <Tooltip label="Delete">
            <ActionIcon color="red" variant="transparent">
              <TbTrash size={20} />
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
    initialState: {
      pagination: {
        pageSize: 8,
        pageIndex: 0,
      },
    },
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: useSearch((state) => state.setValue),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Stack justify="space-between" align="center" sx={{ height: '100%', paddingBottom: 16 }} spacing={0}>
      {table.getFilteredRowModel().rows.length > 0 ? (
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
                          <TbChevronDown />
                        ) : header.column.getIsSorted() === 'asc' ? (
                          <TbChevronUp />
                        ) : !header.column.getCanHide() ? (
                          <TbSelector />
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
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Center sx={{ height: '100%' }}>
          <Stack align="center">
            <TbSearch size={48} />
            <Text size="lg">No results found</Text>
          </Stack>
        </Center>
      )}
      {table.getPageCount() > 1 && (
        <Pagination total={table.getPageCount()} onChange={(e) => table.setPageIndex(e - 1)} />
      )}
    </Stack>
  );
};

export default DoorTable;
