import React from 'react'
import { Route, Routes } from 'react-router';
import { Home } from './Pages/Home';
import { Create } from './Pages/Create';
import { Details } from './Pages/Details';
import toast from 'react-hot-toast';



export default function App() {
  return <div data-theme="forest">
   <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/Create' element={<Create/>}/>
  <Route path='/node/:id' element={<Details/>}/>
</Routes>
  </div>;
}