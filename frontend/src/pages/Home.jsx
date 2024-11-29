import React from 'react'
import Hero from '../components/Hero'
import LatestCollecrions from '../components/LatestCollecrions'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollecrions />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </div>
  )
}

export default Home