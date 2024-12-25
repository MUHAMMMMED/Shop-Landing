import React from 'react';
import './Simple.css';
import { } from './SimpleStyles';

export default function Simple({Type,Device}) {
  return (
    <div style={{ background:"#000" ,color:'#fff',float:'right',width:'100%',marginBottom:'20px'}}>

    <h1>Type   {Type}</h1>
    <br/>
    <h1>Device   {Device}</h1>
    </div>
  )
}

