import React from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { actions } from '../Redux/basketSlice';
import { useDispatch, useSelector } from 'react-redux';

export const cartContext = React.createContext();

export default function CartContextProvider({ children }) {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { counter, userName } = useSelector((state) => state);

    async function addToCart(id) {
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: id },
                { headers: { token: localStorage.getItem('Token') } }
            );

            await queryClient.invalidateQueries({ queryKey: ['cart'] });
            
            const cartItems = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/cart`, 
                { headers: { token: localStorage.getItem('Token') } }
            );
            
            const numOfItems = cartItems?.data?.numOfCartItems || 0;
            dispatch(actions.setCounter(numOfItems));
            console.log("Added to cart response:", response);
            console.log("Total items in cart:", numOfItems);
            
            return true;
        } catch (err) {
            console.log("Error adding to cart:", err);
            return false;
        }
    }

    async function getCart() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/cart', 
            { headers: { token: localStorage.getItem('Token') } }
        );
    }

    const queryResponse = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        staleTime: 10 * 1000, // 10 seconds is better for cart data
        gcTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true, // Set to true for cart to stay updated
        retry: 3,
    });

    return (
        <cartContext.Provider value={{ addToCart, queryResponse }}>
            {children}
        </cartContext.Provider>
    );
}