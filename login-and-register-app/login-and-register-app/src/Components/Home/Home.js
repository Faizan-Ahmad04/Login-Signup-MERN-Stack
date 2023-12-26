import React from 'react'
import './home.css'

export default function Home(props) {
  return (
   <div className="home-page">
    <h1>Hello Homepage</h1>
    <h3>{props.name}</h3>
    <div className="button">Logout</div>
   </div>
  )
}
