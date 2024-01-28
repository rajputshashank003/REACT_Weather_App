import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox";
import {useState } from "react";

export default function WeatherApp () {
    const [weatherInfo , setWeatherInfo] = useState({
        city : "Delhi",
        feelsLike : 16.35,
        humidity : 59,
        temp : 17.05,
        tempMax : 17.05,
        tempMin : 17.05,
        weather : "smoke",
    });
    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }
    return (
        <div style={ {textAlign:"center"}}>
            <h2 style={{fontFamily:"sans-serif"}}>Weather web-app by - SHASHANK RAJPUT</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}
