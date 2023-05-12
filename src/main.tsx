import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store/store.ts'
import { supabase } from './app/supabaseClient.ts'
import App from './App.tsx'
import PubSearch from './components/PubSearch.tsx'
import Drinks from './components/Drinks.tsx'
import BaseLayout from './BaseLayout.tsx'
import Login from './components/Login.tsx'
import Profile from './components/Profile.tsx'
import type { Session } from '@supabase/supabase-js'

function Main() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      const userID = session?.user.id ?? '';
      localStorage.setItem('id', userID)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <BaseLayout>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/pubs' element={<PubSearch />} />
              <Route path='/drinks' element={<Drinks />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile key={session?.user.id} session={session}/>} />
            </Routes>
          </BaseLayout>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Main />)
