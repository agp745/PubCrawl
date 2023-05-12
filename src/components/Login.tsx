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
        <section className="flex flex-col items-center mt-80">
                <p className="text-5xl font-thin">passwordless sign in</p>
                <form className="mt-8" onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            placeholder="your email"
                            value={email}
                            required={true}
                            onChange={e => setEmail(e.target.value)}
                            className="px-3 py-1 rounded-md"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button className='bg-green-200 hover:bg-green-300 border-green-500 text-green-950 text-lg font-medium border-2 mt-3 px-3 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] active:scale-95' disabled={loading}>
                            {loading ? <span>Loading</span> : <span>send verification</span>}
                        </button>
                    </div>
                </form>
        </section>

    )
}