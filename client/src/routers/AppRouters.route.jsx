import React from 'react'
import {Routes,Route} from 'react-router-dom';
import HomePage from '../pages/Home'
export default function AppRouters() {
  return (
    <Routes>
        <Route path='/' Component={HomePage}/>
    </Routes>
  )
}
