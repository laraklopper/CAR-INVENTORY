import React, { useEffect, useState } from 'react';
import './App.css';//Import CSS File
import axios from 'axios';

export default function Table(){
  const [carData, setCardata] = useState([]);
  const [car, setCars] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getCars')
    .then(users.setUsers(users.data))
    .catch(err => console.log(err))
  },[])

  return(
    <div>
    <table>
    <thead>
    <tr>
      <th>MAKE</th>
      <th>MODEL</th>
      <th>REGISTRATION</th>
      <th>OWNER</th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {carData.map(car => {
      <tr>
         <td>{car.make}</td>
         <td>{car.model}</td>
         <td>{car.registration}</td>
         <td>{car.owner}</td>
         <td><button>UPDATE</button></td>
         <td><button>REMOVE</button></td>
      </tr>
    })}
    
    </tbody>
    </table>
    </div>
  )
}
