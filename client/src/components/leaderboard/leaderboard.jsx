import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../utils/queries';

export default function Leaderboard(){
const { loading, data } = useQuery(GET_USERS);

useEffect(()=>{
    if(data && !loading){
        document.querySelector('#getUsers').innerHTML = data.getUsers
        console.log(data.getUsers)
    }
})
    return(
        <p id='getUsers'></p>
    )
}