import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Drug = lazy(() => import('./Drugs/Drug'));
const Home = lazy(() => import('./Home'));

export default function Routing(props) {
    return <div>
        <Suspense fallback={<div>Loading</div>}>
        <Routes>
            <Route path=':drug' element={<Drug user={props.user} />}></Route>
            <Route path='/' exact element={<Home user={props.user} />} ></Route>
        </Routes>
        </Suspense>
    </div>
}