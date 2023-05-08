import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import App from './App.tsx'
import PubSearch from './components/PubSearch.tsx'
import Drinks from './components/Drinks.tsx'
import BaseLayout from './BaseLayout.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <BaseLayout>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/pubs' element={<PubSearch />} />
            <Route path='/drinks' element={<Drinks />} />
          </Routes>
        </BaseLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
