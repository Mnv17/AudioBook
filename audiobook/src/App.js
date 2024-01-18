import './App.css';
import AudioPlayer from './Components/AudioPlayer';
import Head from './Components/Head';
import Search from './Components/Search';
import Slider from './Components/Slider1';
import Slider2 from './Components/Slider2';
import User from './Components/Users';


function App() {
  return (
    <div className="App">
     <Head/>
     <Search/>
     <Slider/>
     <Slider2/>
     <User/>
     <AudioPlayer/>
    </div>
  );
}

export default App;
