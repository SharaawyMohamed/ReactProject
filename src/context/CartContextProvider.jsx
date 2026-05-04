import React from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const cartContext = React.createContext();

export default function CartContextProvider({ children }) {
    const token = localStorage.getItem('Token');

    async function addToCart(id) {
        await axios.post(
            `https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: id },
            { headers: { token: token } }
        ).then((response) => {
            console.log("Added to cart response:", response);
            return true;
        }).catch((error) => {
            console.log("Error adding to cart:", error);
            return false;
        });
    }

    async function getCart() {
       return await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: { token: token } });  
    }

    const queryResponse = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
    });

    return (
        <cartContext.Provider value={{ addToCart, queryResponse }}>
            {children}
        </cartContext.Provider>
    )
}