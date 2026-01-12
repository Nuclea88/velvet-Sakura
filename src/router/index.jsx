import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import Prueba from "../pages/prueba"; // esto se borra al final
import Register from "../pages/Register/Register";
import Info from "../pages/DataResults/DataResults";
import History from "../pages/hystory/History";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
            index: true,
            Component: Home
            },
            {
            path: "/prueba",
            Component: Prueba
            },
            {
            path: "/register",
            Component: Register
            },
            {
            path:"/info",
            Component: Info
            },
            {
            path:"/history",
            Component: History
            }
            ]
    }
])