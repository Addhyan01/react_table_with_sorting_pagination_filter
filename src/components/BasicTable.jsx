import React, { useMemo, useState } from 'react'
import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel} from '@tanstack/react-table'
import { parseISO, format } from 'date-fns';
import { DateTime} from 'luxon'
import mData from '../data.json'


function BasicTable() {
 
 
 /*
 "id": 1,
        "name": "Nutrition Attachment",
        "category": "Health",
        "subcategory": "Nutrition",
        "createdAt": "2016-03-24T05:28:03.099+05:30",
        "updatedAt": "2016-03-24T05:28:03.099+05:30",
        "price": 24.99,
        "sale_price": 21.95
 */
    const data = useMemo(() => mData, [])
    /** @type import('@tanstack/react-table').columnDef<any> */
    const columns = [
        {
            header : 'ID',
            accessorKey : 'id',
            footer : 'ID'


        },
        {
            header : 'Name',
            accessorKey : 'name',
            footer : 'Name'


        },
        {
            header : 'Category',
            accessorKey : 'category',
            footer : 'Category'


        },
        {
            header : 'Subcategory',
            accessorKey : 'subcategory',
            footer : 'Subcategory'


        },
        {
            header : 'CreatedAt',
            accessorKey : 'createdAt',
            footer : 'CreatedAt',
            cell: info => DateTime.fromISO(info.getValue()).toFormat('dd-MMM-yyyy'),
          


        },
        {
            header : 'UpdatedAt',
            accessorKey : 'updatedAt',
            footer : 'UpdatedAt',
            cell: info => DateTime.fromISO(info.getValue()).toFormat('dd-MMM-yyyy'),
           


        },
        {
            header : 'Price',
            accessorKey : 'price',
            footer : 'Price'


        },
        {
            header : 'Sale_price',
            accessorKey : 'sale_price',
            footer : 'Sale_price'


        },
    ]


    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

        const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel:getPaginationRowModel(),
            getSortedRowModel:getSortedRowModel(), getFilteredRowModel : getFilteredRowModel(), 
            state: {
                sorting : sorting,
                globalFilter : filtering
            },
            onSortingChange: setSorting,
            onGlobalFilteredChange: setFiltering
        })
    return (
    <div className='w3-container'>
        <input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} />
      <table className='w3-table-all'>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                        header.column.columnDef.header, 
                        header.getContext()
                )}
                {
                    {asc:'🔼', des:'🔽'}[
                        header.column.getIsSorted() ?? null
                    ]
                }
                </th>
            ))}
          </tr>
        ))}
    
        </thead>
        <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            
        </tbody>
        {/* <tfoot>
        {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                <th key={header.id}>
                    {flexRender(
                        header.column.columnDef.header, 
                        header.getContext()
                )}
                </th>
            ))}
          </tr>
        ))}
    
        </tfoot> */}
      </table>
    <center>
      <div>
       <button onClick={() => table.setPageIndex(0)}>First Page</button>
       <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous Page</button>
       <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
       <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
      </div>
      </center>
    </div>
  )
}

export default BasicTable
