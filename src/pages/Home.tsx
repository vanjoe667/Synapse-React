import React from 'react'
import Header from '../components/Home/Header'
import HomeCards from '../components/Home/HomeCards'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="backdrop">
        <Header/>
        <HomeCards/>
    </div>
  )
}

export default Home