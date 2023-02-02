import { MouseEvent } from 'react';
import { Table, flexRender, ColumnResizeMode } from "@tanstack/react-table";
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { List, ListItemButton, ListItemText, Popover, Typography, Table as MuiTable, TableHead, TableRow, TableCell, TableBody, TableContainer as MuiTableContainer, Pagination } from "@mui/material";
import { useState } from "react";
import {  ExpandLess, ExpandMore } from "@mui/icons-material";
import styled, { css } from "styled-components";
import Loading from '../Loading';

const BlankDiv = styled('div')`
    height: 560px;
    width: 1450px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TableContainer = styled(MuiTableContainer)`
    max-height: 600px;
    min-height: 600px;
    box-shadow: 1px 1px #0000001a;
    border-top: 2px solid #5675cf;
    border-bottom: 2px solid #5675cf;
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb {
        height: 10%; /* 스크롤바의 길이 */
        background: #d3d3d3; /* 스크롤바의 색상 */
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: #fafafa;  /*스크롤바 뒷 배경 색상*/
    }
`;

const TableHeader = styled('div')`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    & > div {
        display: flex;
    }
    & > .MuiListItemButton-root {
        height: 40px;
        width:200px;
        border: 1px solid #dddddd;
        border-radius: 5px;
        padding: 10px;
    }
`;

const Paging = styled('div')`
    display: inline-flex;
    justify-content: flex-end;
    & > .MuiButtonBase-root {
        height: fit-content;
    }
    & > div {
        padding: 10px 5px;
        min-width: fit-content;
    }
    & > select {
        height: 40px;
        width: 100px;
    }
`;

const StyledTable = styled(MuiTable)<ITableProps>`
    border-collapse: collapse;
    border-spacing: 0;

    ${props => props.widthType === 'max' && css`
        width: max-content;
    `}

    & th {
        padding: 3px;
        border-bottom: 1px solid #c5c9d6;
        border-right: 1px solid #dddddd;
        background-color: #f7f9fd;
        font-weight: bold;
        text-align: center;
        & > div {
            padding: 4px;
            border-radius: 4px;
            &:hover {
                background-color: #dddddd;
            }
        }
    }
    & td {
        padding: 1px;
        text-align: center;
        border-bottom: 1px solid #c5c9d6;
        border-right: 1px solid #e9e9e9;
    }
    & tr {
        cursor: text;
        &:hover {
            background-color: #f5f5f5;
        }
        & > td:last-child {
            border-right:0;
        }
        & > th:last-child {
            border-right:0;
        }
    }
`;

const ColumnSelector = styled(ListItemButton)`
    width: 200px;
    height: 40px;
    border: 1px solid #cccccc;
    border-radius: 6px;
`

const PopoverList = styled(List)`
    width:200px;
`

function CustomTable(props: ITableProps): JSX.Element {
    const { table } = props;
    const [ open, setOpen ] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setOpen(!open);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(!open);
        setAnchorEl(null);
    };

    const handlePageChange = (e: React.ChangeEvent<unknown>, pageNum: number) => {
        table.setPageIndex(pageNum-1);
    }

    return (
        <>
            <TableHeader>
                <div>
                    <Typography style={{lineHeight:'35px',marginRight:'10px'}}>Show</Typography>
                    <ColumnSelector onClick={handleClick}>
                        <input
                            {...{
                                type: 'checkbox',
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />{' '}
                        <ListItemText />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ColumnSelector>
                </div>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <PopoverList disablePadding>
                        {table.getAllLeafColumns().map(column => {
                            return (
                                <ListItemButton sx={{ pl: 4 }} key={column.id}>
                                    <input
                                        {...{
                                            type: 'checkbox',
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />{' '}
                                    <ListItemText/>
                                </ListItemButton>
                            )
                        })}
                    </PopoverList>
                </Popover>
                <Paging>
                    <Pagination
                        shape="rounded"
                        count={table.getPageCount()}
                        onChange={handlePageChange}
                    />
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[15, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                            </option>
                        ))}
                    </select>
                </Paging>
            </TableHeader>
            <TableContainer style={props.customStyle}>
                <StyledTable table={props.table} widthType={props.widthType || 'fit'} stickyHeader>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup,i) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header,j) => (
                                    <TableCell key={header.id} colSpan={header.colSpan}>
                                        <div
                                            {...{
                                                style: header.column.getCanSort() ?
                                                    {cursor: 'pointer',display:'inline-flex',fontSize:'12px'}
                                                    : {fontSize:'12px'},
                                                onClick: (table.getHeaderGroups().length >= 2 && i === 0) ? undefined : header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext())
                                            }
                                            {(table.getHeaderGroups().length >= 2 && i === 0)
                                                ? null
                                                : {
                                                    asc: <NorthIcon color="action" style={{fontSize:'12px',marginLeft:'3px',marginTop:'3px'}}/>,
                                                    desc: <SouthIcon color="action" style={{fontSize:'12px',marginLeft:'3px',marginTop:'3px'}}/>,
                                                }[header.column.getIsSorted() as string] ?? null
                                            }
                                            <div
                                                {...{
                                                    onMouseDown: header.getResizeHandler(),
                                                    onTouchStart: header.getResizeHandler(),
                                                    className: `resizer ${
                                                    header.column.getIsResizing() ? 'isResizing' : ''
                                                    }`,
                                                    style: {
                                                    transform:
                                                        props.resizeMode === 'onEnd' &&
                                                        header.column.getIsResizing()
                                                        ? `translateX(${
                                                            table.getState().columnSizingInfo.deltaOffset
                                                            }px)`
                                                        : '',
                                                    },
                                                }}
                                            />
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {props.loadingStatus?
                            <TableRow>
                                <TableCell colSpan={table.getLeafHeaders().length}>
                                    <BlankDiv>
                                        <Loading />
                                    </BlankDiv>
                                </TableCell>
                            </TableRow>
                            :
                                table.getRowModel().rows.length === 0 ?
                                    <TableRow>
                                        <TableCell colSpan={table.getLeafHeaders().length}>
                                            <BlankDiv>
                                                <Typography>NO DATA</Typography>
                                            </BlankDiv>
                                        </TableCell>
                                    </TableRow>
                                :
                                    table.getRowModel().rows.map(row => (
                                        <TableRow key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} style={{width:cell.column.getSize()}}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    ))
                        }
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </>
    )
}

interface ITableProps {
    customStyle? : React.CSSProperties;
    table: Table<any>;
    widthType?: 'fit' | 'max';
    resizeMode?: ColumnResizeMode;
    loadingStatus? : boolean;
}

export default CustomTable;