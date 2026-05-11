import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CounterContextProvider from '../../context/CounterContextProvider'
import { actions } from '../../Redux/basketSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'

export default function Layout() {

    const dispatch = useDispatch();
    async function getCartItems() {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: { token: localStorage.getItem('Token') } })
            console.log('Product Data: ', response.data);
            if (response.data.status === 'success') {
                dispatch(actions.setCounter(response.data.numOfCartItems))
            }
        } catch (err) {
            console.log('Product Error: ', err);
        }
    }

    useEffect(() => {
        getCartItems();
    }, [])

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
