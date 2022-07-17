import * as React from "react"

import TableBody from "./TableBody"
import TableHead from "./TableHead"

const Table = ({ columns, data, expandable }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-700">
            <table className="min-w-full divide-y divide-gray-700 border">
              <TableHead columns={columns} expandable={expandable} />
              <TableBody
                data={data}
                columns={columns}
                expandable={expandable}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
