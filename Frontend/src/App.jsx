
import './App.css'
import Navbar from './Components/Navbar'
import Searchbar from './Components/Searchbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainPage from './Pages/MainPage'

function App() {

  return (
    <>
      <Navbar/>
      <Searchbar/>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<MainPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
