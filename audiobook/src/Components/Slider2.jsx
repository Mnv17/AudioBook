import React, { useState, useEffect, useRef } from 'react';
import './Slider1.css';
import { useNavigate } from 'react-router-dom';
import AudioPlayer from './AudioPlayer'; // Import your AudioPlayer component

const Slider2 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [audioPlayerIndex, setAudioPlayerIndex] = useState(null);
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

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };

  const handleSlideClick = (index) => {
    setAudioPlayerIndex(index);
    navigate("/audio"); // Navigate to the '/audio' route
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((currentIndex + 1) % data.length);
      }
    }, 300000); // Set the interval duration as needed

    return () => clearInterval(interval);
  }, [currentIndex, data, isDragging]);

  return (
    <>
      <div className='course'>Article Reads</div>
      <div className='text'>Listen to audio versions of top web articles</div>
      <div
        className='slider-container'
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
      >
        <div className='slider' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {data.map((item, index) => (
            <div
              key={index}
              className='slide'
              onClick={() => handleSlideClick(index)}
            >
              <img className='image2' src={item.image} alt={item.name} />
              <h2 className='name2'>{item.name}</h2>
              <p className='chapters'>Chapters: {item.chapters}</p>
              <p className='hours'>Hours: {item.hours}</p>
            </div>
          ))}
        </div>
      </div>
      {audioPlayerIndex !== null && (
        <AudioPlayer audioUrl={data[audioPlayerIndex].audioUrl} />
      )}
    </>
  );
};

export default Slider2;
