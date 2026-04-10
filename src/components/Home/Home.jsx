import React from 'react'
import {context} from '../../context/CounterContextProvider'

export default function Home() {
  let data = React.useContext(context);
  return (
    <div className='container pt-24'>
      {data.counter}
      <button onClick={data.updateData} className='bg-blue-500 text-white p-2 rounded'>Update Data</button>
    </div>
  )
}
