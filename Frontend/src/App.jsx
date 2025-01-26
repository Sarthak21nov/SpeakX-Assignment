
import './App.css'
import Navbar from './Components/Navbar'
import Searchbar from './Components/Searchbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainPage from './Pages/MainPage'

function App() {

  return (
    <div className='overflow-hidden'>
      <Navbar/>
      <Searchbar/>
      <div className='flex justify-center items-center'>
        <div className='md:col-span-3 col-span-4 '>
          <BrowserRouter>
            <Routes>
              <Route path = '/' element={<MainPage/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
