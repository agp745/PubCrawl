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
        <>
            <section className="flex justify-end bg-neutral-400 px-9 py-2 shadow-2xl" >
                <div>
                    <h1><Link to={'/'}><img src="/pubcrawl.svg" className="fixed top-0.5 left-1 w-[2.5rem]"/></Link></h1>
                </div>
            
                {isAuthorized ? (
                    <div className="flex gap-7 text-lg font-semibold">
                        <button onClick={handleSignout} className="active:scale-95">Signout</button>
                        <div>|</div>
                        <Link to="/profile" className="active:scale-95">Profile</Link>
                    </div>) : (<Link to="/login" className="text-lg font-semibold active:scale-95">Login</Link>)
                }
                
            </section>
        </>
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