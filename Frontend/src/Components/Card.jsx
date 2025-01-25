/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function Card(props) {
  return (
    <div>
      <div className='flex-row m-3 w-[90%] min-h-[20vh] rounded-2xl bg-slate-200 md:p-5 p-2 pt-4 shadow-2xl hover:bg-slate-800 hover:text-white transition transform duration-500'>
        <div className='flex pl-5'>
            <p className='text-lg'><b>Title: </b></p>
            <p className='ml-4 text-lg'>{props.title}</p>
        </div>
        <div className='flex pl-5'>
            <p className='text-lg'><b>Type: </b></p>
            <p className='ml-4 text-lg'>{props.anagram}</p>
        </div>
        <div className='flex pl-5'>
            <p className='text-lg'><b>Solution: </b></p>
            <p className='ml-4 text-lg'>
              {props.solution ? props.solution: 'No Solution for this Type'}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Card
