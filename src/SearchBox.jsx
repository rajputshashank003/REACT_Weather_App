import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import React , {useState } from "react";


export default function SearchBox({updateInfo}) {
    let [city , setCity] = useState("");
    let [error , setError] = useState(false);
    const API_URL = import.meta.env.REACT_APP_API_URL;
    const API_KEY = import.meta.env.REACT_APP_SECRET_KEY;

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                city : city ,
                temp : jsonResponse.main.temp,
                tempMin : jsonResponse.main.temp_min,
                tempMax : jsonResponse.main.temp_max,
                humidity : jsonResponse.main.humidity,
                feelsLike : jsonResponse.main.feels_like,
                weather : jsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
        } catch (err){
            throw err;  
        }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch (err){
            setError(true);
        }
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="standard-basic" 
                    label="City Name" 
                    variant="standard" 
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" endIcon={<SendIcon />} type='submit'>
                    Send
                </Button>
                {error && <p style={{color: "red"}}>No Such Place Exist</p>}
            </form>
        </div>
    );
}  