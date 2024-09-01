import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './components/context/StoreContext.tsx'

createRoot(document.getElementById('root')!).render(
<BrowserRouter>
<StoreContextProvider>

<App />

</StoreContextProvider>
</BrowserRouter>
  ,
)
