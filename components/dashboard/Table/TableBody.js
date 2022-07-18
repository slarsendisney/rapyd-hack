import * as React from "react"

import TableRow from "./TableRow"

const TableBody = ({ data, columns, expandable }) => {
  return (
    <tbody className="bg-site-background divide-y divide-gray-700">
      {data.map((row, index) => (
        <TableRow
          row={row}
          expandable={expandable}
          columns={columns}
          key={index}
        />
      ))}
    </tbody>
  )
}

export default TableBody
