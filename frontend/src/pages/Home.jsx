import React from 'react'
import Navbar from '../components/home/Navbar'
import Hero from '../components/home/Hero'
import PopularPackages from '../components/home/PopularPackages'
import Form from '../components/home/Form'
import WhyPatholab from '../components/home/WhyPatholab'
import Testimonials from '../components/home/Testimonials'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <PopularPackages/>
      <Form/>
      <WhyPatholab/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Home
