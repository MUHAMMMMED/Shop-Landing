import React from 'react';
import './Classic.css';
import { } from './ClassicStyles';

export default function Classic({Type,Device}) {
  return (
    <div style={{ background:"red" ,color:'#fff',float:'right',width:'100%',marginBottom:'20px'}}>
<br/>
    <h1>Type{Type}</h1>
    <br/>
    <h1>Device{Device}</h1>
    </div>
  )
}


 