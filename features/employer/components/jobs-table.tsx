'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  IconBriefcase2,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconPointFilled,
  IconReportMoney,
} from '@tabler/icons-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  experiences,
  jobBenefits,
  jobLevels,
  jobTagValues,
  jobTypes,
  qualifications,
  vacancies,
  workTypes,
} from '@/drizzle/db-constants';
import { useIsMobile } from '@/hooks/use-mobile';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { salarySchema } from '@/lib/zodSchemas/employer.schema';
import { format } from 'date-fns';
import { ChevronRightIcon, TagIcon } from 'lucide-react';
import Link from 'next/link';
import { useGetMyJobs } from '../hooks/use-employers';

export const schema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.enum(jobTagValues)).nullable(),
  salary: salarySchema,
  benefits: z.array(z.enum(jobBenefits)).nullable(),
  city: z.string(),
  country: z.string(),
  jobType: z.enum(jobTypes),
  jobLevel: z.enum(jobLevels),
  workType: z.enum(workTypes),
  experience: z.enum(experiences),
  qualification: z.enum(qualifications),
  vacancy: z.enum(vacancies),
  expiryDate: z.string().nullable(),
  responsibilities: z.string().nullable(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
});

type SchemaValues = z.infer<typeof schema>;

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant='ghost'
      size='icon'
      className='text-muted-foreground size-7 hover:bg-transparent'>
      <IconGripVertical className='text-muted-foreground size-3' />
      <span className='sr-only'>Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<SchemaValues>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <p className='w-fit'>
        {row.original.description.length > 30
          ? `${row.original.description.slice(0, 30)}...`
          : row.original.description}
      </p>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Job Type',
    cell: ({ row }) => (
      <div className='w-fit'>
        <Badge variant='outline' className='text-muted-foreground px-1.5'>
          {capitalizeFirstLetter(row.original.jobType)}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'level',
    header: 'Job Level',
    cell: ({ row }) => (
      <div className='w-fit'>
        <Badge variant='outline' className='text-muted-foreground px-1.5'>
          {capitalizeFirstLetter(row.original.jobLevel)}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {row.original.isFeatured ? (
          <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
        ) : (
          <IconLoader />
        )}
        {row.original.isFeatured ? 'Featured' : 'Standard'}
      </Badge>
    ),
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row }) => (
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {row.original.isActive ? (
          <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
        ) : (
          <IconLoader />
        )}
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    accessorKey: 'workType',
    header: () => <div className='w-full'>Work Type</div>,
    cell: ({ row }) => (
      <div className='w-fit'>
        <Badge variant='outline' className='text-muted-foreground px-1.5'>
          {capitalizeFirstLetter(row.original.workType)}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'experience',
    header: () => <div className='w-full'>Experience</div>,
    cell: ({ row }) => (
      <div className='w-fit'>
        <Badge variant='outline' className='text-muted-foreground px-1.5'>
          {capitalizeFirstLetter(row.original.experience)}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'qualification',
    header: () => <div className='w-full'>Qualification</div>,
    cell: ({ row }) => (
      <div className='w-fit'>
        <Badge variant='outline' className='text-muted-foreground px-1.5'>
          {capitalizeFirstLetter(row.original.qualification)}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'vacancy',
    header: () => <div className='w-full'>Vacancy</div>,
    cell: ({ row }) => (
      <div className='w-fit'>
        <Badge variant='outline' className='text-muted-foreground px-1.5'>
          {capitalizeFirstLetter(row.original.vacancy)}
        </Badge>
      </div>
    ),
  },
  // {
  //   accessorKey: 'reviewer',
  //   header: 'Reviewer',
  //   cell: ({ row }) => {
  //     const isAssigned = row.original.reviewer !== 'Assign reviewer';

  //     if (isAssigned) {
  //       return row.original.reviewer;
  //     }

  //     return (
  //       <>
  //         <Label htmlFor={`${row.original.id}-reviewer`} className='sr-only'>
  //           Reviewer
  //         </Label>
  //         <Select>
  //           <SelectTrigger
  //             className='w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate'
  //             size='sm'
  //             id={`${row.original.id}-reviewer`}>
  //             <SelectValue placeholder='Assign reviewer' />
  //           </SelectTrigger>
  //           <SelectContent align='end'>
  //             <SelectItem value='Eddie Lake'>Eddie Lake</SelectItem>
  //             <SelectItem value='Jamik Tashpulatov'>
  //               Jamik Tashpulatov
  //             </SelectItem>
  //           </SelectContent>
  //         </Select>
  //       </>
  //     );
  //   },
  // },
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
            size='icon'>
            <IconDotsVertical />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<SchemaValues> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className='relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80'
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function JobsTable() {
  const { data: initialData } = useGetMyJobs();

  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      defaultValue='outline'
      className='w-full flex-col justify-start gap-6'>
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          View
        </Label>
        <Select defaultValue='outline'>
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'>
            <SelectValue placeholder='Select a view' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='outline'>Outline</SelectItem>
            <SelectItem value='past-performance'>Past Performance</SelectItem>
            <SelectItem value='key-personnel'>Key Personnel</SelectItem>
            <SelectItem value='focus-documents'>Focus Documents</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className='**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex'>
          <TabsTrigger value='outline'>Outline</TabsTrigger>
          <TabsTrigger value='past-performance'>
            Past Performance <Badge variant='secondary'>3</Badge>
          </TabsTrigger>
          <TabsTrigger value='key-personnel'>
            Key Personnel <Badge variant='secondary'>2</Badge>
          </TabsTrigger>
          <TabsTrigger value='focus-documents'>Focus Documents</TabsTrigger>
        </TabsList>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                <IconLayoutColumns />
                <span className='hidden lg:inline'>Customize Columns</span>
                <span className='lg:hidden'>Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant='outline' size='sm'>
            <IconPlus />
            <span className='hidden lg:inline'>Add Section</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value='outline'
        className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <div className='overflow-hidden rounded-lg border'>
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}>
            <Table>
              <TableHeader className='bg-muted sticky top-0 z-10'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className='**:data-[slot=table-cell]:first:w-8'>
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className='flex items-center justify-between px-4'>
          <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='flex w-full items-center gap-8 lg:w-fit'>
            <div className='hidden items-center gap-2 lg:flex'>
              <Label htmlFor='rows-per-page' className='text-sm font-medium'>
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}>
                <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-fit items-center justify-center text-sm font-medium'>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className='ml-auto flex items-center gap-2 lg:ml-0'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <span className='sr-only'>Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <span className='sr-only'>Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <span className='sr-only'>Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant='outline'
                className='hidden size-8 lg:flex'
                size='icon'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <span className='sr-only'>Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value='past-performance'
        className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed'></div>
      </TabsContent>
      <TabsContent value='key-personnel' className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed'></div>
      </TabsContent>
      <TabsContent
        value='focus-documents'
        className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed'></div>
      </TabsContent>
    </Tabs>
  );
}

function TableCellViewer({ item }: { item: SchemaValues }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={isOpen}
      onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant='link' className='text-foreground w-fit px-0 text-left'>
          {capitalizeFirstLetter(item.title)}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>
            Job Details - {capitalizeFirstLetter(item.title)}
          </DrawerTitle>
          <DrawerDescription>
            Detailed information about the job posting.
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <Separator />
          <div className='grid gap-4'>
            <h2 className={'text-2xl font-medium'}>{item.title}</h2>
            <p className={'text-sm text-muted-foreground'}>
              {item.description}
            </p>
          </div>
          <Separator />
          <p>
            Expiry date :{' '}
            <Badge>
              {format(item.expiryDate || new Date(), 'MMMM dd, yyyy')}
            </Badge>
          </p>
          <div className='grid gap-2'>
            <Item variant='outline' size='sm'>
              <ItemMedia variant='icon'>
                <IconReportMoney className='size-5' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Salary</ItemTitle>
                <ItemDescription>
                  {item.salary.min} - {item.salary.max} {item.salary.currency}{' '}
                  per {item.salary.period}
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item size={'sm'} variant='outline'>
              <ItemMedia variant='icon'>
                <TagIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Featured</ItemTitle>
                <ItemDescription>
                  {item.isFeatured
                    ? 'This job is marked as featured.'
                    : 'This job is not featured.'}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item size={'sm'} variant='outline'>
              <ItemMedia variant='icon'>
                <IconPointFilled
                  className={cn(
                    'size-4 animate-pulse',
                    item.isActive
                      ? 'text-green-500 dark:text-green-400'
                      : 'text-amber-500 dark:text-amber-400'
                  )}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Active</ItemTitle>
                <ItemDescription>
                  {item.isActive
                    ? 'This job is currently active.'
                    : 'This job is not active.'}
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant='outline'>
              <ItemContent>
                <ItemTitle>Tags</ItemTitle>
                <div className={'flex flex-wrap items-center gap-2'}>
                  {item.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant='outline'
                      className='text-muted-foreground px-1.5 mr-1 mt-1'>
                      {capitalizeFirstLetter(tag)}
                    </Badge>
                  ))}
                </div>
              </ItemContent>
            </Item>
            <Item variant='outline'>
              <ItemContent>
                <ItemTitle>Benefits</ItemTitle>
                <div className={'flex flex-wrap items-center gap-2'}>
                  {item.benefits?.map((benefit) => (
                    <Badge
                      key={benefit}
                      variant='outline'
                      className='text-muted-foreground px-1.5 mr-1 mt-1'>
                      {capitalizeFirstLetter(benefit)}
                    </Badge>
                  ))}
                </div>
              </ItemContent>
            </Item>

            <Item variant='outline' size='sm' asChild>
              <Link href={`/employer/jobs/${item.id}/update`} prefetch={true}>
                <ItemMedia>
                  <IconBriefcase2 className='size-5' />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Update job</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className='size-4' />
                </ItemActions>
              </Link>
            </Item>
            <Separator />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              type='button'
              variant='outline'
              onClick={() => setIsOpen((prev) => !prev)}>
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
