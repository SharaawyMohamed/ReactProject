import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto py-20 text-center">
                <Outlet />
            </main>
            <Footer />
        </div>
    )

}
