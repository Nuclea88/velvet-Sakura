import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import {router} from "./router/index";
import Sakura from "./assets/images/petalos-sakura.png";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <img src={Sakura} alt="" className='sakura'/>
  </StrictMode>,
)
