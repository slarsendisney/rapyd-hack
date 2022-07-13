import * as React from "react"

const TableHeadCell = ({ text }) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase"
    >
      {text}
    </th>
  )
}

export default TableHeadCell
