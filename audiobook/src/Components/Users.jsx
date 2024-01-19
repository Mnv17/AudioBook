import React, { useState, useEffect, useRef } from 'react';
import './Users.css';

const User = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

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
      <div className='tweet'>Tweet Shorts</div>
      <div className='listen'>Listen to audio versions of tweet threads</div>
      <div
        className='slider-container'
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
      >
        <div className='slider' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {data.map((item, index) => (
            <div key={index} className='slide' style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
              <div>
                <img className='image2' src={item.image} alt={item.name} style={{ width: "120px", height: "100px", flexShrink: "0", borderRadius: "6px" }} />
              </div>
              <div>
                <h2 className='name2'>{item.work}</h2>
                <p className='chapters'>{item.title}</p>
                <p className='hours'> {item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default User;
