import { ActionIcon, Table, Tooltip, UnstyledButton, Text, Group, Center, Stack, Pagination } from '@mantine/core';
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
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbSettings, TbTrash, TbSelector, TbChevronDown, TbChevronUp, TbSearch } from 'react-icons/tb';
import { useSearch } from '../../../store/search';
import { openConfirmModal } from '@mantine/modals';
import { useDoors, type DoorColumn } from '../../../store/doors';
import { fetchNui } from '../../../utils/fetchNui';
import { useStore } from '../../../store';
import { HiOutlineClipboardCopy } from 'react-icons/all';
import { useClipboard } from '../../../store/clipboard';
import { convertData } from '../../../utils/convertData';

const DoorTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const globalFilter = useSearch((state) => state.debouncedValue);
  const navigate = useNavigate();
  const setClipboard = useClipboard((state) => state.setClipboard);
  const data = useDoors((state) => state.doors);

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
        id: 'copy',
        cell: (data) => (
          <Tooltip label="Copy settings">
            <ActionIcon
              variant="transparent"
              color="blue.4"
              onClick={() => {
                setClipboard({ ...convertData(data.row.original), name: '' });
                fetchNui('notify', 'Settings copied');
              }}
            >
              <HiOutlineClipboardCopy size={20} />
            </ActionIcon>
          </Tooltip>
        ),
      },
      {
        id: 'edit',
        cell: (data) => (
          <Tooltip label="Edit">
            <ActionIcon
              color="blue.4"
              variant="transparent"
              onClick={() => {
                useStore.setState(convertData(data.row.original), false);
                navigate('/settings/general');
              }}
            >
              <TbSettings size={20} />
            </ActionIcon>
          </Tooltip>
        ),
      },
      {
        id: 'delete',
        cell: (data) => (
          <Tooltip label="Delete">
            <ActionIcon
              color="red.4"
              variant="transparent"
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
                    // Remove row from data
                  },
                })
              }
            >
              <TbTrash size={20} />
            </ActionIcon>
          </Tooltip>
        ),
      },
    ],
    []
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

  useEffect(() => {
    table.setPageIndex(currentPage - 1);
  }, [currentPage, data]);

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
        <Pagination page={currentPage} total={table.getPageCount()} onChange={(e) => setCurrentPage(e)} />
      )}
    </Stack>
  );
};

export default DoorTable;
