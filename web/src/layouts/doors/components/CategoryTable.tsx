import { ActionIcon, Center, Group, Pagination, Stack, Table, Text, UnstyledButton } from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { TbChevronDown, TbChevronUp, TbSearch, TbSelector } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useDoors } from '../../../store/doors';
import { useSearch } from '../../../store/search';

const CategoryTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const globalFilter = useSearch((state) => state.debouncedValue);
  const data = useDoors((state) => state.doors);

  const categories = useMemo(() => {
    const categories: {
      category: string;
      zone: string
    }[] = [];

    data.forEach((door) => {
      if (categories.some((category) => category.category === door.category)) return;

      categories.push({
        category: door.category,
        zone: door.zone
      });
    });

    return categories;
  }, [data]);

  const columns = useMemo<ColumnDef<{
    category: string;
    zone: string;
  }>[]>(
    () => [
      {
        id: 'category',
        header: 'Category',
        accessorKey: 'category',
        cell: (info) => info.getValue(),
        enableHiding: false,
        enableGlobalFilter: false, // id is of type number so it breaks filter function
      },
      {
        id: 'zone',
        header: 'Zone',
        accessorKey: 'zone',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'view',
        cell: (data) => (
          <Link to={`/doors/${data.row.original.category}`}>
            <ActionIcon color="blue.4" variant="transparent">
              <HiEye color='blue.4' size={16} />
            </ActionIcon>
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: categories,
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
    <Stack justify="space-between" align="center" sx={{ height: '100%', paddingBottom: 16, paddingRight: 16, paddingLeft: 16 }} spacing={0}>
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

export default CategoryTable;
