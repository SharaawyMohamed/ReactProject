import React from 'react'

export const context = React.createContext();

export default function CounterContextProvider(props) {
    const [data, setData] = React.useState(0);
    function updateData() {
        setData(data+1);
    }
    return (
        <context.Provider value={{counter:data, updateData}}>
            {props.children}
        </context.Provider>
    )
}