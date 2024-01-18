import React from 'react';
import "./Head.css";
import pic from "../Images/image 1.png"

export default function Head() {
  return (
    <div>
      <div className='head'>
        <div className='header'>
        <div className='name'> Hey <span>Anirudh </span> 👋</div>
        <div className='line'>It’s a nice day to learn something new</div>
        </div>
        
        <img className='image' src={pic} alt="" />
      </div>
    </div>
  )
}
