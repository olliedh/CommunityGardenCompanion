import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Post from "./MessageBoard/PostForm";
import MessageBoard from "./MessageBoard/MessageBoard";
import PlantingTable from "./PlantingTable";
import LoginButton from "./LoginButton";
import LogoutButton from "./LoginButton";
import Profile from "./Profile";
import PlantingTableTest from "./PlantingTableTest";

const App = () => {

  const [post, setPost] = useState({});
  const [toggle, setToggle] = useState(false)
  useEffect(()=> {

    fetch("http://api.openweathermap.org/data/2.5/forecast?lat=45.5088&lon=-73.554&appid=498b5bd5209a45fb40c5dfde11edf05c")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <MainBox>
      <NavBar/>
      <Header />
        <Routes>
       
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/post"
            element={ <Post toggle={toggle} setToggle={setToggle}/>}
          />
         
         <Route
            path="/messageboard"
            element={ <MessageBoard toggle={toggle} setToggle={setToggle}/>}
          />
 <Route
            path="/profile"
            element={ <Profile/>}
          />
<Route
            path="/plantingtabletest"
            element={ <PlantingTableTest/>}
          />

          <Route path="" element={<h1>404: Oops!</h1>} />
        </Routes>
        </MainBox>
        <Footer />
        </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
`

const MainBox = styled.div`
flex: 1;
`