/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const DataContext = createContext()

const DataProvider = ({ children }) => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemPerPage = 10;

    useEffect(()=>{
        const getInitialData = async ()=>{
            try{
                const response = await axios.get('http://localhost:4000/getAll',{
                    params: {
                        page: currentPage,
                        limit: itemPerPage
                    }
                })
                console.log(response)
                setData(response.data.data.questions)
                setTotalPages(response.data.data.totalPages)
            } catch(err){
                console.log("Error fetching the data", err)
                alert("An Error occurred while fetching the Data")
            }
        }

        getInitialData()
    }, [currentPage])

    return (
        <DataContext.Provider value={{data, setData, currentPage, setCurrentPage, totalPages, setTotalPages}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
