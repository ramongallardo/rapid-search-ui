/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable } from 'react-table';

interface DataRow {
  SR: string;
  Title: string;
  Description: string;
  Customer: string;
  Score: number;
}

function DataTable({ data }: { data: DataRow[] }) {
  const columns = React.useMemo(
    () => 
      Object.keys(data[0]).map(key => ({
        Header: key,
        accessor: key,
      })),
    [data]
  ); 

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  const columns = React.useMemo(
    () => 
      Object.keys(data[0]).map(key => ({
        Header: key,
        accessor: key === 'Score' ? key as 'Score' : key,
      })),
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<DataRow>({ columns, data });

  return (
    <table {...getTableProps()} style={{ width: '100%', margin: '0 auto' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th key={column.getHeaderProps().key} {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;