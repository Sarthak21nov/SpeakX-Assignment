/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function Card(props) {
  return (
    <div>
      <div className='flex-row m-3 w-[95%] min-h-[10vh] rounded-2xl bg-slate-200 p-3'>
        <div className='flex pl-5'>
            <p className='text-lg'><b>Title: </b></p>
            <p className='ml-4 text-lg'>{props.title}</p>
        </div>
        <div className='flex pl-5'>
            <p className='text-lg'><b>Type: </b></p>
            <p className='ml-4 text-lg'>{props.anagram}</p>
        </div>
        <div className='flex pl-5'>
            <p className='text-lg'><b>Anagram Type: </b></p>
            <p className='ml-4 text-lg'>{props.anagramType}</p>
        </div>
        <div className='flex pl-5'>
            <p className='text-lg'><b>Blocks: </b></p>
            <div className='flex-row'>
                {props.blocks}
            </div>
        </div>
        <div className='flex pl-5'>
            <p className='text-lg'><b>Solution: </b></p>
            <p className='ml-4 text-lg'>{props.solution}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
