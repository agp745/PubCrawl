import '../css/App.css'

export default function Loading() {

    return(
        <section id="loading" className="flex flex-col loading-div">
            <div className="loading-div bg-slate-900"> </div>
            <div className="loading-div bg-slate-500"> </div>
            <div className="loading-div bg-slate-900"> </div>
        </section>
    )
}