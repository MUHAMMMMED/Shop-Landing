import React from 'react'
import BrowserStats from './components/BrowserStats/BrowserStats'
import CustomChart from './components/CustomChart/CustomChart'
import SocialMediaChart from './components/SocialMediaChart/SocialMediaChart'
 
export default function Traffic() {
  return (
    <>
     
    <CustomChart />
    <BrowserStats/>
    <SocialMediaChart/>
    </>
  )
}
