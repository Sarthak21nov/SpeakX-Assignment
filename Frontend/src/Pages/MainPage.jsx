/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Card from '../Components/Card'
import axios from "axios"
import { DataContext } from '../DataProvider'

function MainPage() {

  const {data, currentPage, setCurrentPage, totalPages } = useContext(DataContext)
  
  const HandlePrevious = ()=>{
    if(currentPage > 1){
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  const HandleNext = ()=>{
    if(currentPage < totalPages){
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  return (
    <div className='m-2'>
      {data.map((question, index)=> (
        <Card key={index} title = {question.title} anagram = {question.type} solution = {question.solution}/>
      ))}
      <div className='flex justify-center items-center'>
        <button type="button" className="btn btn-secondary mr-2" onClick={HandlePrevious}>Previous</button>
        <span>Page {currentPage} of {totalPages} </span>
        <button type="button" className="btn btn-secondary ml-2" onClick={HandleNext}>Next</button>
      </div>
    </div>
  )
}

export default MainPage
