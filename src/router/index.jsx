import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Info from "../pages/DataResults/DataResults";
import Start from "../pages/Start/Start";
import TarotResult from "../pages/TarotResults/TarotResult";
import History from "../pages/history/History";
import ProfileReading from "../pages/ProfileReading/ProfileReading";
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
            path: "/register",
            Component: Register
            },
            {
            path:"/info",
            Component: Info
            },
            {
            path:"/readings",
            Component: Start
            },
            {
            path: "/tarot-result",
            Component: TarotResult
            },
            {
            path:"/history",
            Component: History
            },
            {
            path:"/profile",
            Component: ProfileReading    
            }
            ]
    }
])