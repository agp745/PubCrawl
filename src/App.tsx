import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { supabase } from "./app/supabaseClient"
import { login } from "./app/store/slices/authSlice"
import Home from "./components/Home"
import './css/App.css'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if(session) dispatch(login())
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      if(session) dispatch(login())
    })
  }, [])

  return (
    <>
      <Home />
    </>
  )
}

export default App
