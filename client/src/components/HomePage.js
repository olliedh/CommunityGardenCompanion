import styled from "styled-components";
import { useState, useEffect } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';


const HomePage = () => {
    const [weather, setWeather] = useState(null);
    const [weatherAverage, setWeatherAverage] = useState(null);
    const openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    useEffect(()=> {
     
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=45.5088&lon=-73.554&appid=${openWeatherKey}`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
      }, [])
      const average = [];
      const weatherArray = []
     if (weather) {
     //creating an array of 5 arrays, each representing a day. The nested arrays show weather info in 3 hours chunks, 8 per day)
      weatherArray.push(weather.list.slice(0,8));
      weatherArray.push(weather.list.slice(8,16));
      weatherArray.push(weather.list.slice(16,24));
      weatherArray.push(weather.list.slice(24,32));
      weatherArray.push(weather.list.slice(32,40));
     
      //avgObject accumulates the relevant values from each nested array
      weatherArray.forEach(array => {
        let avgObject = {precipitation: 0, temperature: 0, temp_min: [], temp_max: []};
        array.forEach((element)=> {
       avgObject.precipitation += element.pop
      avgObject.temperature += element.main.temp - 273.15
    //   avgObject.temp_min.push(element.main.temp_min )
    //   avgObject.temp_max.push(element.main.temp_max )
        })
    
        avgObject.precipitation =Math.round( avgObject.precipitation/array.length * 100) 
        avgObject.temperature = Math.round(avgObject.temperature/array.length)
        // avgObject.temp_min = Math.min(avgObject.temp_min)
        // console.log( avgObject.temp_min)
        average.push(avgObject);

      });
      console.log(average);
     
      }
    return ( 
        <>
        <Wrapper>
       

        <p> Welcome to the Villeray Community Garden webpage!</p>
        {/* I would like to show today's date and min/ max daily temperature here */}
        <p>{weather && `Chance of rain: ${average[0].precipitation}%`}</p>

        </Wrapper>

        </>
    );
}
 
export default HomePage;

const Wrapper = styled.div` 
margin: 3%;


`