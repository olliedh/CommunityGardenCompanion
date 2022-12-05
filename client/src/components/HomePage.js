import styled from "styled-components";
import { useState, useEffect } from "react";

// import {Swiper, SwiperSlide} from "swiper/react";
// import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
// import 'swiper/swiper-bundle.css';
import moment from "moment/moment";

const HomePage = () => {
    const [weather, setWeather] = useState(null);
    const [weatherAverage, setWeatherAverage] = useState(null);
    const openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    useEffect(()=> {
     
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=45.5088&lon=-73.554&appid=${openWeatherKey}`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
      
        
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
      // console.log(typeof average[0].precipitation);
     
      }
    return ( 
        <>
        <Wrapper>
       

        <h3> Welcome to the Villeray Community Garden page!</h3>
        {/* I would like to show today's date and min/ max daily temperature here */}
        <WeatherContainer>
        <LeftCloud src={require('./suncloud.png')} />
        <WidgetDiv>
        {moment().format('MMMM Do YYYY')}
        {/* !weather?  */}
        <p>{weather && `Average temperature: ${average[0].temperature} °C`}</p>
        <p>{weather && `Chance of rain: ${average[0].precipitation}%`}</p>
        </WidgetDiv>
        <RightCloud src={require('./clouds.png')} />

        
        </WeatherContainer>

       {weather && average[0].precipitation < 50? <div><StyledCondImg src={require("./watercan.gif")} /> </div> : <div><StyledCondImg src={require("./rain.gif")} /> </div>}

        <StyledImage src={require('./flowerx2.png')} />
        </Wrapper>

        </>
    );
}
 
export default HomePage;

const Wrapper = styled.div` 
margin: 3%;
margin-bottom: 130px;


`
const StyledImage = styled.img`
 height: auto; 
    width: auto; 
    max-height: 250px;
position: -webkit-sticky; /* Safari */
  position: fixed;
 
bottom: 50px;
  right: 2%;
  z-index:999;
`


const WeatherContainer = styled.div`
display: flex;
margin-top: 0.75%;

`

const WidgetDiv = styled.div`
display: flex;
flex-direction: column;
margin: 1% 1% 1% 1%;
`

const LeftCloud = styled.img`
max-height: 17vh;
width: auto;
`

const RightCloud = styled.img`
max-height: 17vh;
width: auto;
`

const StyledCondImg = styled.img`

width: 10rem;
margin-left: 8%;

animation:signup-response 0.7s 1;
    -webkit-animation:signup-response 0.7s 1;
    animation-fill-mode: forwards;

    animation-delay:5s;
    -webkit-animation-delay:5s; /* Safari and Chrome */
    -webkit-animation-fill-mode: forwards;

    @keyframes signup-response{
    from {opacity :1;}
    to {opacity :0;}
}

@-webkit-keyframes signup-response{
    from {opacity :1;}
    to {opacity :0;}
}
`