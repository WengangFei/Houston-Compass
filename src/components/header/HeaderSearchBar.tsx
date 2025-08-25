import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function HeaderSearchBar() {
  return (
    <div>
      <form>
        <div className="relative w-full max-w-md">
          {/* Icon positioned inside input */}
          <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search"
            className="pl-8 border-2 border-gray-300 rounded-lg w-full text-sm py-1"
          />
        </div>
      </form>
    </div>
  )
}
