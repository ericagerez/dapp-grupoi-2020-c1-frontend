import React from 'react'
import MenuAppBar from './MenuAppBar'
import Products from './HomeContent/Products'
import Welcome from './HomeContent/Welcome'

export default function Home(){
  return <>
    <MenuAppBar />
    <Welcome />
    <Products />
    </>
}