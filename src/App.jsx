import './App.css';
import axios from 'axios';
import {useState} from "react";
import worldMap from './assets/world_map.png';
import countryColor from "./helpers/countryColor.jsx";
import numberToMillion from "./helpers/numberToMillion.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [countryCard, setCountryCard] = useState({});
    const [error, toggleError] = useState(false);
    const [errorCountry, setErrorCountry] = useState("");
    const [search, setSearch] = useState("")


    async function allCountries() {
        toggleError(false);
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all?fields=name,flag,population,region');
            setCountries(result.data);

        } catch (e) {
            console.error(error);
            toggleError(true);
        }
    }
    async function oneCountries() {
        setErrorCountry('');

        try {
            const result = await axios.get(`https://restcountries.com/v3.1/name/${search}`);
            setCountryCard(result.data[0]);
            setSearch('');

        } catch (e) {
            console.error(error);
            setErrorCountry(`${search} bestaat niet. Probeer het opniew`);
            setSearch('');
            setCountryCard([]);
        }
    }
    return (
        <>
            <header>
                <img className="world-map" src={worldMap} alt="wereldkaart"/>
                {countries.length === 0 && <button type="button" onClick={allCountries}>Klik hier om alle landen te zien!</button>}
            </header>
            {error === true &&
                <p className="error-message">
                    Er is iets misgegaan met het ophalen. Probeer het
                    opnieuw!</p>}
            <ul>
                {countries.sort((a, b) => a.population - b.population)
                    .map((country) => {
                    return <li key={country.name.common}>
                       <span className="flag-icon">{country.flag}</span>
                        <h2 className={countryColor(country.region)}>{country.name.common}</h2>
                        <p>has a population of {country.population} people</p>
                        </li>
                })}
            </ul>
            <section>
            <h2>Search country information</h2>
               <label form="searchbalk">
                   <input id="searchbalk" name="searchbalk" type="text" placeholder="type hier een land.." value={search} onChange={(e)=>setSearch(e.target.value)}/>
                   <button type="button" onClick={oneCountries} >Zoek</button>
                   {errorCountry && <p>{errorCountry}</p>}
               </label>
                {Object.keys(countryCard).length > 0 &&
                   <article>
                <h3>{countryCard.name.common}</h3> <img src={countryCard.flags.png} alt="vlag land"/>
                       <p>{countryCard.name.common} is situated in {countryCard.subregion} and the capital is {countryCard.capital} It has a population of {numberToMillion(countryCard.population)} million people and it borders with {countryCard.borders.length} neighboring countries</p>
                   </article>}

            </section>
        </>
    )
}

export default App