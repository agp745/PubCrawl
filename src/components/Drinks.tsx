import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRandomBeer } from "../app/store/slices/drinksSlice"
import { setDrinkList, setDrink } from "../app/store/slices/drinksSlice"
import axios from "axios"
import type { Drink } from "../app/store/slices/drinksSlice"
import { AppDispatch, RootState } from "../app/store/store"

type DrinkModuleProps = {
    onSelectedToggle: () => void
    drinkInfo: Drink
}

function Search() {

    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const handleSearch = async (beer: string) => {
        const beerName = beer.replace(' ', '_')
        const { data } = await axios(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`)
        dispatch(setDrinkList(data))
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)
    }

    return <section className="flex justify-center mt-3">
                <input type="text" value={search} placeholder="search beers..." onChange={handleInput} className="p-1 rounded-md border-neutral-900 border-2"/>
                <button onClick={() => handleSearch(search)}>
                    <img src="/search-icon.svg" className="max-w-[2rem] ml-1"/>
                </button>
        </section>
}


function DrinkInfo({onSelectedToggle, drinkInfo}: DrinkModuleProps) {

    const [selectedDrink, setSelectedDrink] = useState<Drink | undefined>(undefined)

    useEffect(() => {
        setSelectedDrink(drinkInfo)
    }, [])

    const foodPairings = selectedDrink?.food_pairing.map((food) => <div>{food}</div>)

    const drinkInfoDisplay = (drink?: Drink) => {
        return <div className="flex flex-col items-center gap-5">
            <h1 className="text-5xl font-bold ">{drink?.name}</h1>
            <h2 className="text-xl font-light">{drink?.tagline}</h2>

            <section id="split" className="flex mx-1">
                <section id="left" className="basis-1/2">
                    <div className="text-lg text-left font-medium text-blue-950 ml-3 pl-10">{drink?.description}</div>
                </section>
                <section id="right" className="basis-1/2">
                    <div id="container" className="flex justify-center items-center">
                        {drink?.image_url ? (<img src={drink?.image_url} className="max-w-[7rem]"/>) : 
                        (<img src="/pubcrawl.svg" className="max-w-[7rem]"/>)}
                    </div>
                </section>
            </section>

            <section id="table" className="flex flex-col gap-5 bg-white rounded-lg w-[90%] p-5 font-mono bg-opacity-50">
                <div id="row" className="flex justify-between shadow-sm">
                    <div>abv</div>
                    <div className="font-semibold">{drink?.abv}%</div>
                </div>
                <div id="row" className="flex justify-between shadow-sm">
                    <div>ibu</div>
                    <div className="font-semibold">{drink?.ibu}%</div>
                </div>
                <div id="row" className="flex justify-between shadow-sm">
                    <div>ebc</div>
                    <div className="font-semibold">{drink?.ebc}</div>
                </div>
                <div id="row" className="flex justify-between shadow-sm">
                    <div>srm</div>
                    <div className="font-semibold">{drink?.srm}</div>
                </div>
                <div id="row" className="flex justify-between shadow-sm">
                    <div>ph</div>
                    <div className="font-semibold">{drink?.ph}</div>
                </div>
                <div id="row" className="flex justify-between shadow-sm">
                    <div>attenuation level</div>
                    <div className="font-semibold">{drink?.attenuation_level}</div>
                </div>
                <div id="row" className="flex justify-between shadow-sm">
                    <div>volume</div>
                    <div className="font-semibold">{drink?.volume.value} {drink?.volume.unit}</div>
                </div>
                <div id="row" className="flex justify-between shadow-sm">
                    <div>first brewed</div>
                    <div className="font-semibold">{drink?.first_brewed}</div>
                </div>

                <div id="foodPairings" className="shadow-sm">
                    <h2 className="text-lg underline">food pairings</h2>
                    <div className="flex flex-col items-center gap-2">{foodPairings}</div>
                </div>

            </section>
        </div>
    }


    return (
    <section className="fixed top-0 left-0 bottom-0 right-0 bg-gray-500 bg-opacity-60 backdrop-blur w-full h-full pb-10 text-center overflow-y-auto">
        {drinkInfoDisplay(selectedDrink)}
        <div id="buttons" className="flex gap-2 mt-2 justify-center">
        <button className="bg-green-200 border-green-500 text-green-950 font-medium border-2 px-3 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" >save</button>
        <button onClick={onSelectedToggle} className="bg-red-200 border-red-500 text-red-950 font-medium border-2 px-3 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" >close</button>
        </div>
    </section>
    )
}

export default function Drinks() {

    const [isSelected, setIsSelected] = useState(false)
    const [page, setPage] = useState(0)
    const { drink, drinksList } = useSelector((state: RootState) => state.drinks)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRandomBeer())
    }, [])

    const handleSelectedToggle = () => {
        setIsSelected(!isSelected)
    }
    
    const handleSearchSelectToggle = (drink: Drink) => {
        setIsSelected(!isSelected)
        dispatch(setDrink(drink))
    }

    const randomDrink = (drink: Drink) => {
        return <button key={drink.id} onClick={handleSelectedToggle} className="flex flex-col h-[90%] w-[90%] items-center shadow-xl p-6 rounded-lg">
                <div className="font-bold text-3xl">{drink.name}</div>
                <div className="text-xl font-light">{drink.tagline}</div>
                {drink.image_url ? (<img src={drink.image_url} className="max-w-[7rem]"/>) : 
                (<img src="/pubcrawl.svg" className="max-w-[10rem]"/>)}
                <p className="text-lg font-mono">abv: {drink.abv}% ibu: {drink.ibu}%</p>
            </button>
    }

    const searchedDrinks = (drink: Drink) => {
        return <button key={drink.id} onClick={() => handleSearchSelectToggle(drink)} className="flex flex-col h-[90%] w-[90%] items-center shadow-xl p-6 rounded-lg">
                <div className="font-bold text-3xl">{drink.name}</div>
                <div className="text-xl font-light">{drink.tagline}</div>
                {drink.image_url ? (<img src={drink.image_url} className="max-w-[7rem]"/>) : 
                (<img src="/pubcrawl.svg" className="max-w-[10rem]"/>)}
                <p className="text-lg font-mono">abv: {drink.abv}% ibu: {drink.ibu}%</p>
            </button>
    }

    const handleNext = () => {
        let check = page + 1
        if (check === drinksList.length) {
            setPage(0)
        } else {
            setPage(page + 1)
        }
    }

    const handlePrev = () => {
        let check = page - 1
        if (check < 0) {
            setPage(drinksList.length - 1)
        } else (
            setPage(page - 1)
        )
    }

    // const searchedDrinks = drinksList.map((drink: Drink) => {
    //     return <button key={drink.id} onClick={() => handleSearchSelectToggle(drink)} className="flex flex-col h-[90%] w-[90%] items-center shadow-xl p-6 rounded-lg">
    //         <div className="font-bold text-3xl">{drink.name}</div>
    //         <div className="text-xl font-light">{drink.tagline}</div>
    //         {drink.image_url ? (<img src={drink.image_url} className="max-w-[7rem]"/>) : 
    //         (<img src="/pubcrawl.svg" className="max-w-[10rem]"/>)}
    //         <p className="text-lg font-mono">abv: {drink.abv}% ibu: {drink.ibu}%</p>
    //     </button>
    // })

    return ( 
        <section id="drinks" className="pb-10 overflow-y-hidden">
            {isSelected ? (<DrinkInfo onSelectedToggle={handleSelectedToggle} drinkInfo={drink}/>) : (<Search />)}
            
            {drinksList.length === 0 ? (
                <section className="flex flex-col items-center mt-8">
                    <h2 className="uppercase font-black text-6xl text-center mb-4">your lucky drink</h2>
                    <div className="font-thin text-lg">not intersted?</div>
                    {isSelected ? (<></>) : (<button onClick={() => dispatch(fetchRandomBeer())} className="bg-amber-100 border-amber-400 text-amber-800 font-medium border-2 px-3 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-4">try another!</button>)}
                    {randomDrink(drink)}
                </section>
            ) : (
                <section className="flex flex-col gap-6 items-center mt-8" >
                    <h2 className="uppercase font-black text-6xl text-center mb-4">your lucky drinks</h2>
                        <div className="flex gap-2 justify-center mt-5 -mb-8">
                            <button onClick={handlePrev}><img src="/left-arrow.svg" alt="<" className="max-w-[2rem]"/></button>
                            <button onClick={handleNext}><img src="/right-arrow.svg" alt=">" className="max-w-[2rem]"/></button>
                        </div>
                        {searchedDrinks(drinksList[page])}
                </section>
            )}
        </section>
    )
}