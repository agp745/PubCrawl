import React from "react";
import { Link } from "react-router-dom";

type BaseProps = {
    children: React.ReactNode
}

function Header() {

    return(
        <section className="flex gap-2 bg-red-300 px-9" >
            <div>
                <h1><Link to={'/'}>PubCrawl</Link></h1>
            </div>
            <div>
                <Link to="/">About</Link>
                <Link to="/">Login</Link>
                <Link to="/">Profile</Link>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <section className="flex justify-center">
            <p>©copyright 2023</p>
        </section>
    )
}

export default function BaseLayout(props: BaseProps) {

    return (
        <section>
            <Header />
            {props.children}
            <Footer />
        </section>
    )
}