import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function AllOrders() {
    const [allOrders, setAllOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    async function getAllOrders() {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
            setAllOrders(response.data);
            console.log('Orders: ', response.data);
        } catch (err) {
            console.log('Error: ', err);
        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getAllOrders();
    }, [])

    return (
        <div>AllOrders</div>
    )
}

