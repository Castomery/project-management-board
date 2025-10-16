import React from 'react'

interface BoardHeaderProps{
    title: string;
}

const BoardHeader = ({title} : BoardHeaderProps) => {
  return (
    <div className='w-full bg-amber-300 font-bold text-xl p-3'>{title}</div>
  )
}

export default BoardHeader