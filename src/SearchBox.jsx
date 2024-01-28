import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import React , {useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sliderClasses } from '@mui/material';


export default function SearchBox({updateInfo}) {
    let [city , setCity] = useState("");
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
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            showSuccess("Data fetched Successfully !");
        } catch (err) {
            showError("No such place exist !");
        } 
    };

    const showError = (msg) => {
        toast.error(msg);
    };
    const showSuccess = (msg) => {
        toast.success(msg);
    }
    
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
                
                <ToastContainer/>
            </form>
        </div>
    );
}  