import { useState } from "react";
import { supabase } from "../app/supabaseClient";
// import '../css/Login.css'

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email })

        if (error) {
            alert(error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    return(
        <section className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">Supabase + react</h1>
                <p className="description">Sign in via magic link with your email below</p>
                <form className="form-widget" onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            placeholder="your email"
                            value={email}
                            required={true}
                            onChange={e => setEmail(e.target.value)}
                            className="inputfield"
                        />
                    </div>
                    <div>
                        <button className='{button block}' disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Send magic link</span>}
                        </button>
                    </div>
                </form>
            </div>
        </section>

    )
}