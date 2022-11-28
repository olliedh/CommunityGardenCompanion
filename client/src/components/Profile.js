import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
    isAuthenticated && (
//column
        <Article>
            {JSON.stringify(user)}
            {" "}
            {user.email}
        </Article>
    )
    )
}
 
export default Profile ;

const Article = styled.div`
display: flex;
flex-direction: column;
margin: 2%;
`
