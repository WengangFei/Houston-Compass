import React from 'react'

export default function HeaderSearchBar() {
  return (
    <div>
      <form>
        <input type="text" placeholder='Search' className='border-2 border-white md:p-1 rounded-lg min-w-10 text-sm px-1 md:min-w-xs'/>
      </form>
    </div>
  )
}
