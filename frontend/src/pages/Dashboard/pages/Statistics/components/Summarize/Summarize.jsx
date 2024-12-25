import React from 'react'
import ActiveUsersCard from './components/ActiveUsersCard/ActiveUsersCard'
import SummarizeCard from './components/SummarizeCard/SummarizeCard'

export default function Summarize({data}) {
  return (
    <>
      <ActiveUsersCard/>
      {/* <DashboardCard/> */}
      <SummarizeCard data={data} />  
   
    </>
  )
}
