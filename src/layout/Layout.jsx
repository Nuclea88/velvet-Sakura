import { Outlet } from "react-router";
import Header from "../components/organisms/Header/Header";
import {AuthProvider} from "../context/auth/AuthProvider";

const Layout = () => {
    return (
        <>
        <AuthProvider>
            <Header/>
            <main><Outlet/></main>
        </AuthProvider>
        </>
    )
}

export default Layout