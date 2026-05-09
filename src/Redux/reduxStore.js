import { configureStore } from "@reduxjs/toolkit";
import basketSlice from './basketSlice'


export const reduxStore = configureStore({
    reducer: basketSlice
})