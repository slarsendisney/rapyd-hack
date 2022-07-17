import * as React from "react";

import TableCell from "./TableCell";
import DropdownButtonCell from "./DropdownButtonCell";

const TableRow = ({ row, expandable, columns }) => {
  const [expanded, setExpanded] = React.useState(false);
  return [
    <tr
      key={Object.entries(row)[0][1]}
      className={`${expandable ? "cursor-pointer" : ""} ${
        expanded && "bg-gray-800"
      } hover:bg-gray-800`}
      onClick={() => setExpanded(!expanded)}
    >
      {expandable && <DropdownButtonCell expanded={expanded} />}
      {columns.map(({ accessor }, index) => (
        <TableCell
          render={() =>
            accessor === "subdomain" ? (
              <a
                className="text-indigo-400"
                href={`https://${row[accessor]}.plutuspay.app`}
              >{`${row[accessor]}.plutuspay.app`}</a>
            ) : accessor === "amount" ? (
              "$" + row[accessor]
            ) : (
              row[accessor]
            )
          }
          colIndex={index}
          key={index}
        />
      ))}
    </tr>,
    expandable && expanded ? (
      <tr className="w-full" key="Expanded Content">
        <td colSpan={columns.length+1} className="pr-8 border-gray-800 border-l-2 border-b-0">{row.expandedContent}</td>
      </tr>
    ) : (
      <tr key="No Expanded Content" />
    ),
  ];
};

export default TableRow;
