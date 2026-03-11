import { Outlet } from "react-router-dom"
import { Navebar } from "../Navebar/Navebar"
import  Footer  from "../Footer/Footer"
export default function Layout() {
    return <>
        <Navebar />
        <Outlet />
        <Footer/>
    </>
}