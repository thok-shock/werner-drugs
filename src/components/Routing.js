import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Drug from './Drugs/Drug'
import Home from './Home'

export default function Routing(props) {
    return <div>
        <Routes>
            <Route path=':drug' element={<Drug user={props.user} />}></Route>
            <Route path='/' exact element={<Home user={props.user} />} ></Route>
        </Routes>
    </div>
}