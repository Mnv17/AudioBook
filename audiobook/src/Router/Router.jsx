import React from 'react';
import {Routes, Route} from "react-router-dom"
import AudioPlayer from '../Components/AudioPlayer';

import Random from '../Components/Random';

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Random/> }/>
        <Route path='/audio' element={ 
        
        <AudioPlayer/> 
        
        }/>
      </Routes>
    </div>
  )
}
