import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CounterContextProvider from '../../context/CounterContextProvider'

export default function Layout() {
    return (
        <CounterContextProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </CounterContextProvider>
    )
}
