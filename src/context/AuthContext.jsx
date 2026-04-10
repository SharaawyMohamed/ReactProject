import React, { use } from 'react'

export const context = React.createContext();

export default function AuthContext(props) {
    const [token, setToken] = React.useState(localStorage.getItem('Token'));

    return (
        <context.Provider value={{Token:token, setToken}}>
            {props.children}
        </context.Provider>
    )   
}