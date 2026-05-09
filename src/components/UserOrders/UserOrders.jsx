import React from 'react'
import {useState} from 'react' 
import axios from 'axios'
export default function UserOrders() {

    const[userOrders,setUserOrders] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    async function getUserOrders(){
       setIsLoading(true);

       try{
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`)
       }
       catch(err){
          console.log('Error: ',err)
       }

       
    }

  return (
    <div>UserOrders</div>
  )
}

