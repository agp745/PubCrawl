import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../app/supabaseClient";
import { DrinkInfo } from "./Drinks";
import type { Drink } from "../app/store/slices/drinksSlice";

interface ProfileProps {
    session: Session | null
}

export default function Profile({session}: ProfileProps) {

    const [savedDrinks, setSavedDrinks] = useState<Drink[]>([])
    const [userEmail, setUserEmail] = useState<string>('')
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [selectedDrink, setSelectedDrink] = useState<Drink | any>({})

    useEffect(() => {
        setUserEmail(session?.user.email ?? '')
        fetchSavedDrinks()
    }, [session])

    const fetchSavedDrinks = async () => {
        const id = localStorage.getItem('id')

        const { data, error } = await supabase
            .from('profiles')
            .select('drinks')
            .eq('id', id)
            .maybeSingle()
        
        if (error) {
            console.error(error)
            alert(error.message)
        }
        setSavedDrinks(data?.drinks)
    }

    const mappedDrinks = savedDrinks.map((drink: Drink) => {
        return <button key={drink.id} onClick={() => handleSelectedDrink(drink)} className="flex flex-col w-[30%] items-center shadow-xl p-6 rounded-lg">
            <div className="font-bold text-3xl">{drink.name}</div>
            <div className="text-xl font-light">{drink.tagline}</div>
            <p className="text-lg font-mono">abv: {drink.abv}% ibu: {drink.ibu}%</p>
        </button>
    })

    const handleSelectedDrink = (drink: Drink) => {
        setSelectedDrink(drink)
        setIsSelected(!isSelected)
    }

    const handleIsSelectedToggle = () => {
        setIsSelected(!isSelected)
    }

    return (
        <section className="flex flex-col items-center">
            {isSelected ? <DrinkInfo onSelectedToggle={handleIsSelectedToggle} drinkInfo={selectedDrink}/> : <></>}
            <div className="font-extralight text-xs italic w-full ml-5 md:text-lg">signed in as: <span className="font-semibold">{userEmail}</span></div>
            {savedDrinks.length ? 
            (<div className="flex flex-col flex-wrap items-center mt-10 text-2xl font-light md:text-5xl">
                <h1>your saved drinks</h1>
                <div className="flex gap-5 mt-6 justify-center">
                    {mappedDrinks}
                </div>
            </div>) : 
            (<div className="flex flex-col items-center mt-10">
                <p className="text-2xl font-light md:text-5xl">no saved beers yet</p>
                <p className="mt-3 md:text-2xl">click <Link to={'/drinks'} className="text-green-600 font-normal hover:underline">HERE</Link> to add to your list</p>
            </div>)}
        </section>
    )
}