
import './App.css'
import Navbar from './Components/Navbar'
import Searchbar from './Components/Searchbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainPage from './Pages/MainPage'

function App() {

  return (
    <div>
      <Navbar/>
      <Searchbar/>
      <div className='grid grid-cols-4'>
        <div className='md:col-span-3 col-span-4'>
          <BrowserRouter>
            <Routes>
              <Route path = '/' element={<MainPage/>} />
            </Routes>
          </BrowserRouter>
        </div>
        <div className='md:col-span-1'>
          <p>Filter the Data Based on Type</p>
        </div>
      </div>
    </div>
  )
}

export default App
