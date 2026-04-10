import React from 'react'
import { context } from '../../context/CounterContextProvider'

export default function Products() {
  let data = React.useContext(context);
  return (
    <div className='pt-24'>Products: {data.counter}</div>
  )
}
