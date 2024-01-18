import React, { useState, useEffect } from 'react';
import './Slider1.css';

const Slider2 = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mock-api-assignment.onrender.com/audio');
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
    const interval = setInterval(handleNext, 300000);  // Set the interval duration as needed

    return () => clearInterval(interval);
  }, [currentIndex, data]);

  return (
    <>
      <div className='course'>Article Reads</div>
      <div className='text'>Listen to audio versions of top web articles</div>
      <div className='slider-container'>
        <div className='slider' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {data.map((item, index) => (
            <div key={index} className='slide'>
              <img className='image2' src={item.image} alt={item.name} />
              <h2 className='name2'>{item.name}</h2>
              <p className='chapters'>Chapters: {item.chapters}</p>
              <p className='hours'>Hours: {item.hours}</p>
            </div>
          ))}
        </div>
        <div className='controls'>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Slider2;
