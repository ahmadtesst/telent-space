import React from "react";

interface Column<T> {
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead className="border-b border-[#42325d]">
          <tr className="text-white">
            {columns.map((column, index) => (
              <th key={index} className="text-start p-4">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-white border-b border-[#42325d] hover:bg-[#1d0647]">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-4">
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
