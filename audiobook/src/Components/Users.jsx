import React, { useState, useEffect } from 'react';
import './Users.css';

const Slider = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mock-api-assignment.onrender.com/users');
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateSliderPosition = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 300000);

    return () => clearInterval(interval);
  }, [currentIndex, data]);

  return (
    <>
      <div className='tweet'>Tweet Shorts</div>
      <div className='listen'>Listen to audio versions of tweet threads</div>
      <div className='slider-container'>
        <div className='slider' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {data.map((item, index) => (
            <div key={index} className='slide' style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
                <div >
                <img className='image2' src={item.image} alt={item.name} style={{width:"120px", height:"100px", flexShrink:"0", borderRadius:"6px", }}/>
                </div>
              <div>
              <h2 className='name2'>{item.work}</h2>
              <p className='chapters'>{item.title}</p>
              <p className='hours'> {item.name}</p>
              </div>
              
            </div>
          ))}
        </div>
        <div className='controls'>
          <button onClick={() => updateSliderPosition((currentIndex - 1 + data.length) % data.length)}>Prev</button>
          <button onClick={() => updateSliderPosition((currentIndex + 1) % data.length)}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Slider;
