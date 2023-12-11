import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import List from './components/post/List'
import Detail from './components/post/Detail'
import Modify from './components/post/Modify'
import Write from './components/post/Write'
import Main from './components/layout/Main'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/user/Login'
import Join from './components/user/Join'


const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/write' element={<Write />}></Route>
          <Route path='/detail/:postNum' element={<Detail />}></Route>
          <Route path='/modify/:postNum' element={<Modify />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>

  )
}

export default App