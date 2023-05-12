import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store/store";
import { supabase } from "./app/supabaseClient";
import { logout } from "./app/store/slices/authSlice";

type BaseProps = {
    children: React.ReactNode
}

function Header() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthorized } = useSelector((state: RootState) => state.auth)

    const handleSignout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            alert(error.message)
        } else {
            alert('successfully signed out')
            dispatch(logout())
            navigate('/')
        }
    }

    return(
        <section className="flex gap-2 bg-red-300 px-9" >
            <div>
                <h1><Link to={'/'}>PubCrawl</Link></h1>
            </div>
        
            {isAuthorized ? (
                <div>
                    <button onClick={handleSignout}>Signout</button>
                    <Link to="/profile">Profile</Link>
                </div>) : (<Link to="/login">Login</Link>)
            }
            
        </section>
    )
}

export default function BaseLayout(props: BaseProps) {

    return (
        <section>
            <Header />
            {props.children}
        </section>
    )
}