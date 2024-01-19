// Slider.jsx
import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from './AudioPlayer'; 
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioPlayerIndex, setAudioPlayerIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

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

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (isDragging) {
      const containerWidth = containerRef.current.clientWidth;
      const newPosition = e.clientX / containerWidth;
      setCurrentIndex(Math.floor(newPosition * data.length));
    }
  };

  const handleSlideClick = (index) => {
    setAudioPlayerIndex(index);
    navigate("/audio");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((currentIndex + 1) % data.length);
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [currentIndex, data, isDragging]);

  return (
    <>
      <div className='course'>Courses for you</div>
      <div className='text'>Listen to byte-sized audio courses from top thinkers</div>
      <div
        className='slider-container'
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onTouchMove={handleDragMove}
      >
        <div className='slider' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {data.map((item, index) => (
            <div key={index} className='slide' onClick={() => handleSlideClick(index)}>
              <img className='image2' src={item.image} alt={item.name} />
              <h2 className='name2'>{item.name}</h2>
              <p className='chapters'>Chapters: {item.chapters}</p>
              <p className='hours'>Hours: {item.hours}</p>
            </div>
          ))}
        </div>
      </div>
      {/* {audioPlayerIndex !== null &&  <AudioPlayer audioUrl={data[audioPlayerIndex].audioUrl} />} */}
    </>
  );
};

export default Slider;
