import React from 'react';
import './Simple.css';
import { } from './SimpleStyles';

export default function Simple({Type,Device}) {
  return (
    <div style={{ background:"red" ,color:'#fff',float:'right',width:'100%',marginBottom:'20px'}}>
   <br/>
    <h1>Type{Type}</h1>
    <br/>
    <h1>Device{Device}</h1>
    </div>
  )
}

