import { useCallback, useEffect, useState } from "react";
import useStores from "../../hooks/useStore";
import { IScheduler, ISchedulerSearchParams } from "../../interface/scheduler/IScheduler";
import { useReactTable, ColumnDef, ColumnResizeMode, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState } from "@tanstack/react-table";
import Table from "../../components/elements/Table";

const SchedulerPage =() => {
    const [open, setOpen] = useState(false);
    const { schedulerStore } = useStores();
    const [loading, setLoading] = useState(false);
    const columnResizeMode: ColumnResizeMode = 'onChange';
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState({});


    useEffect(() => {
        handleSearch({});
    }, [schedulerStore])


    const handleOpen = () => setOpen(true);
    
    const handleSearch = async(filter: ISchedulerSearchParams) => {
        setLoading(true);
        await schedulerStore.search(filter);
        setLoading(false);
    };

    const columns : ColumnDef<IScheduler>[] = [
        {
            header : '',
            size : 60,
            accessorKey : 'schedulerKey',
            id : 'key'
        },
        {
            header : '제목',
            size : 100,
            accessorKey : 'schedulerTitle'
        },
        {
            header : '내용',
            size : 100,
            accessorKey : 'schedulerContent'
        },
        {
            header : '작업 시작 시간',
            size : 100,
            accessorKey : 'schedulerStartTime'
        },
        {
            header : '작업 반복 여부',
            size : 100,
            accessorKey : 'schedulerRepetition'
        },
        {
            header : '작업 끝나는 시간',
            size : 100,
            accessorKey : 'schedulerEndTime'
        },
        {
            header : '작업 일시',
            size : 100,
            accessorKey : 'schedulerDate'
        }
    ]
    const table = useReactTable<IScheduler>({
        data:schedulerStore.schedulerList,
        columns,
        columnResizeMode,
        state:{sorting, columnVisibility},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        initialState: {
            pagination : {
                pageSize: 15
            }
        }
    });



    return (
        <div>
            <h1>test중입니다</h1>        
            <Table table={table} resizeMode={columnResizeMode} loadingStatus={loading}/>
        </div>
        
    )
}

export default SchedulerPage;