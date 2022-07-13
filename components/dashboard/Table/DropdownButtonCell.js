import * as React from "react"

import { m as motion } from "framer-motion"

import { ChevronUpIcon } from "@heroicons/react/outline"

const DropdownButtonCell = ({ expanded }) => {
  return (
    <td className="pl-2 py-2 whitespace-nowrap font-medium text-gray-400">
      <motion.div
        className="w-6 h-6"
        animate={{
          rotate: expanded ? [90, 90, 180] : [180, 180, 90],
        }}
        transition={{
          ease: "easeInOut",
          times: [0, 0.1, 0.35],
        }}
      >
        <ChevronUpIcon className="w-6 h-6" />
      </motion.div>
    </td>
  )
}

export default DropdownButtonCell
