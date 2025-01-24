/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

function Searchbar() {
  const[query, SetQuery] = useState('');

  const HandleSubmit = (e)=>{
    e.preventDefault();
    console.log(query);
    SetQuery('')
  }

  const HandleChange = (e)=>{
    SetQuery(e.target.value);
  }

  return (
    <div>
      <div className='w-100 h-[8vh] bg-slate-800'>
        <form className='flex w-100 justify-center items-center' onSubmit={HandleSubmit}>
            <input type = 'text' placeholder='Enter Search Query here' className='w-[70%] rounded-full p-2 m-2' value={query} onChange={HandleChange}/>
            <button type="submit" className="btn btn-secondary ml-5 rounded-2xl">Search</button>
        </form>
      </div>
    </div>
  )
}

export default Searchbar
