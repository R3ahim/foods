import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'

const Home = () => {
    const [category,setcategory]= useState('All');

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setcategory={setcategory}  />
        <FoodDisplay category={category}/>
        <Footer/>

    </div>
  )
}

export default Home