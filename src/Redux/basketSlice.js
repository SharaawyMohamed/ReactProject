import { createSlice } from "@reduxjs/toolkit";

let basketSlice = createSlice({
    name: 'basket',
    initialState: {
        counter: 0,
        userName: 'number of basket items.'
    },
    reducers: {
        increment: function (state) {
            state.counter++;
        },
        decrement: function (state) {
            state.counter--;
        },
        setUserName(state) {
            state.userName = 'Changed!'
        },
        setCounter(state,action){
            state.counter=action.payload
        }

    }

})

export default basketSlice.reducer
export const actions = basketSlice.actions