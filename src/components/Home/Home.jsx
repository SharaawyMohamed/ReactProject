import React from 'react'
import {context} from '../../context/CounterContextProvider'
import Products from '../Products/Products';

export default function Home() {
  let data = React.useContext(context);
  return (
    <Products />
  )
}
