import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBeers } from "../app/store/slices/drinksSlice"
import { setDrink } from "../app/store/slices/drinksSlice"
import axios from "axios"
import type { Drink } from "../app/store/slices/drinksSlice"
import { AppDispatch, RootState } from "../app/store/store"

export default function Drinks() {

    const [search, setSearch] = useState('')
    const { drinksList } = useSelector((state: RootState) => state.drinks)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBeers())
    }, [])
    
    const handleSearch = async (type: string) => {
        const { data } = await axios(`https://api.punkapi.com/v2/beers?per_page=3/${type}`)
        console.log(data)
    }

    return (
        <section id="drinks">
            <section className="flex justify-center">
                <h1>search for a specific beer or type of beers</h1>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                <button onClick={() => handleSearch('')}>Search</button>
            </section>
        </section>
    )
}