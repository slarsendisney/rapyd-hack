import * as React from "react"

const TableCell = ({ render, colIndex }) => {
  const isFirst = colIndex === 0
  return (
    <td
      className={`px-6 py-2 whitespace-nowrap font-medium ${
        isFirst ? "text-primary" : "text-gray-400"
      } `}
    >
      {render()}
    </td>
  )
}

export default TableCell
