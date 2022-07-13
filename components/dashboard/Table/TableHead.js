import * as React from "react"
import TableHeadCell from "./TableHeadCell"

const TableHead = ({ columns, expandable }) => {
  return (
    <thead className="bg-gray-900">
      <tr>
        {expandable && (
          <th
            scope="col"
            className="px-1 py-3 text-left text-xs font-semibold text-gray-400 uppercase"
          ></th>
        )}
        {columns.map(({ value }) => {
          return <TableHeadCell text={value} key={value} />
        })}
      </tr>
    </thead>
  )
}

export default TableHead
