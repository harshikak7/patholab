import React from 'react'
import Navbar from '../components/home/Navbar'
import Hero from '../components/home/Hero'
import PopularPackages from '../components/home/PopularPackages'
import Form from '../components/home/Form'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <PopularPackages/>
      <Form/>
    </div>
  )
}

export default Home
