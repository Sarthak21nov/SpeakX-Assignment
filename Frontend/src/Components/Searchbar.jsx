/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../DataProvider';

function Searchbar() {
  const[query, SetQuery] = useState('');
  const { setData, setCurrentPage, setTotalPages, currentPage } = useContext(DataContext)
  const [filter, setFilter] = useState('Filter')
  const itemPerPage = 10;

  const SetFilterAndFetch = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); 
    SetQuery('')
  };
  
  const SetAnagram = () => SetFilterAndFetch('ANAGRAM');
  const SetMCQ = () => SetFilterAndFetch('MCQ');
  const SetReadAlong = () => SetFilterAndFetch('READ_ALONG');
  const SetConversation = () => SetFilterAndFetch('CONVERSATION');
  const SetContentOnly = () => SetFilterAndFetch('CONTENT_ONLY');
  const SetDefault = () => SetFilterAndFetch('Filter');

  const fetchQuery = async ()=>{
    try{
      const response = await axios.get('https://speak-x-assignment-gules.vercel.app/questions', {
        params: {
          query: query,
          page: currentPage,
          limit: itemPerPage
        }
      })
      console.log(response)
      if (response.data?.data?.questions?.length > 0) {
        setData(response.data.data.questions);
        setTotalPages(response.data.data.totalPages);
      } else {
        setData([]);
        setTotalPages(0);
      }
    }catch(err){
      console.log("Error fetching the data", err)
      alert("An Error occurred while fetching the Data")
    }
  }

  const FetchQueryBasedOnFilter = async ()=>{
    try{
      const response = await axios.get('https://speak-x-assignment-gules.vercel.app/type', {
        params: {
          type: filter,
          page: currentPage,
          limit: itemPerPage
        }
      })
      console.log(response)
      if (response.data?.data?.questions?.length > 0) {
        setData(response.data.data.questions);
        setTotalPages(response.data.data.totalPages);
      } else {
        setData([]);
        setTotalPages(0);
      }
    }catch(err){
      console.log("Error fetching the data", err)
      alert("An Error occurred while fetching the Data")
    }
  } 

  const HandleSubmit = async (e)=>{
    e.preventDefault();
    setCurrentPage(1)
    fetchQuery()
  }

  useEffect(() => {
    if (query !== '') {
      fetchQuery();
    }
    if (filter !== 'Filter' && query === '') {
      FetchQueryBasedOnFilter();
    }
  }, [query, currentPage, filter]);

  const HandleChange = (e)=>{
    SetQuery(e.target.value);
  }

  return (
    <div>
      <div className='w-100 h-[8vh] bg-slate-800 flex justify-center items-center'>
        <form className='flex w-100 justify-center items-center p-3' onSubmit={HandleSubmit}>
            <input type = 'text' placeholder='Enter Search Query here' className='md:w-[50%] rounded-full md:p-2 md:m-2 w-[80%] p-2 mr-2' value={query} onChange={HandleChange}/>
            <button type="submit" className="btn btn-secondary md:ml-5 rounded-lg md:mr-4 mr-3">Search</button>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {filter}
              </button>
              <ul className="dropdown-menu">
                <li className='text-center hover:cursor-pointer' onClick={SetDefault}>Default</li>
                <li className='text-center hover:cursor-pointer' onClick={SetAnagram}>ANAGRAM</li>
                <li className='text-center hover:cursor-pointer' onClick={SetMCQ}>MCQ</li>
                <li className='text-center hover:cursor-pointer' onClick={SetReadAlong}>READ_ALONG</li>
                <li className='text-center hover:cursor-pointer' onClick={SetConversation}>CONVERSATION</li>
                <li className='text-center hover:cursor-pointer' onClick={SetContentOnly}>CONTENT_ONLY</li>
              </ul>
            </div>Name
        </form>
      </div>
    </div>
  )
}

export default Searchbar
