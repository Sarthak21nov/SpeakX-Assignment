/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { DataContext } from '../DataProvider';

function Searchbar() {
  const[query, SetQuery] = useState('');
  const { setData, setCurrentPage, setTotalPages, currentPage } = useContext(DataContext)
  const itemPerPage = 10;

  const HandleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.get('http://localhost:4000/questions', {
        params: {
          query: query,
          page: currentPage,
          limit: itemPerPage
        }
      })
      console.log(response)
      setData(response.data.data.questions)
      setCurrentPage(1)
      setTotalPages(response.data.data.totalPages)
    }catch(err){
      console.log("Error fetching the data", err)
      alert("An Error occurred while fetching the Data")
    }
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
