import './App.css';
import axios from 'axios';
import {useState} from "react";
import worldMap from './assets/world_map.png';
import countryColor from "./helpers/countryColor.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [error, toggleError] = useState(false);


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
        </>
    )
}

export default App