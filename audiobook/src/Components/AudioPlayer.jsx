import React, { useEffect, useRef, useState } from 'react'
import "./AudioPlayer.css";
import rectangle from "../Images/Rectangle.png"
import audioFile from "../audio/file_example_MP3_700KB.mp3";

export default function AudioPlayer() {
    const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackList, setTrackList] = useState([{ src: audioFile }]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;
  
    if (!audioElement) return; // Add a check to ensure audioElement is not null
  
    const loadedMetadataHandler = () => {
      setDuration(audioElement.duration);
    };
  
    const timeUpdateHandler = () => {
      setCurrentTime(audioElement.currentTime);
    };
  
    audioElement.addEventListener('loadedmetadata', loadedMetadataHandler);
    audioElement.addEventListener('timeupdate', timeUpdateHandler);
  
    return () => {
      audioElement.removeEventListener('loadedmetadata', loadedMetadataHandler);
      audioElement.removeEventListener('timeupdate', timeUpdateHandler);
    };
  }, [audioRef.current]);
  

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForwardHandler = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackwardHandler = () => {
    audioRef.current.currentTime -= 15;
  };

  const nextTrackHandler = () => {
    const newIndex = (currentTrackIndex + 1) % trackList.length;
    setCurrentTrackIndex(newIndex);

    audioRef.current.pause();
    audioRef.current.src = trackList[newIndex].src;
    audioRef.current.load();
    audioRef.current.play();
  };

  const prevTrackHandler = () => {
    const newIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    setCurrentTrackIndex(newIndex);

    audioRef.current.pause();
    audioRef.current.src = trackList[newIndex].src;
    audioRef.current.load();
    audioRef.current.play();
  };

  const progress = (currentTime / duration) * 100 || 0;
      
    return (
        <div className='audioPlayer'>
            <div className='icons'>
                <div className='arrow'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_2_261)">
                            <path d="M12 13.172L16.95 8.222L18.364 9.636L12 16L5.63599 9.636L7.04999 8.222L12 13.172Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2_261">
                                <rect width="24" height="24" fill="white" transform="matrix(0 -1 1 0 0 24)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className='share'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_2_264)">
                            <path d="M13.12 17.023L8.92102 14.733C8.37282 15.3191 7.66101 15.7267 6.8781 15.9029C6.09518 16.0791 5.27737 16.0157 4.53094 15.7211C3.78452 15.4264 3.14398 14.914 2.69259 14.2505C2.2412 13.587 1.99982 12.803 1.99982 12.0005C1.99982 11.198 2.2412 10.4141 2.69259 9.75058C3.14398 9.08707 3.78452 8.57467 4.53094 8.27998C5.27737 7.98529 6.09518 7.92193 6.8781 8.09813C7.66101 8.27434 8.37282 8.68196 8.92102 9.26802L13.121 6.97802C12.8826 6.03409 12.9966 5.03561 13.4417 4.16972C13.8867 3.30384 14.6323 2.63 15.5387 2.27452C16.445 1.91904 17.4499 1.90633 18.365 2.23875C19.2801 2.57118 20.0425 3.22594 20.5093 4.08028C20.9762 4.93463 21.1154 5.92991 20.9009 6.87957C20.6864 7.82922 20.133 8.66806 19.3443 9.23883C18.5555 9.8096 17.5857 10.0731 16.6166 9.98001C15.6475 9.8869 14.7456 9.44353 14.08 8.73302L9.88002 11.023C10.0412 11.6644 10.0412 12.3357 9.88002 12.977L14.079 15.267C14.7446 14.5565 15.6465 14.1131 16.6156 14.02C17.5847 13.9269 18.5545 14.1904 19.3433 14.7612C20.132 15.332 20.6854 16.1708 20.8999 17.1205C21.1144 18.0701 20.9752 19.0654 20.5083 19.9198C20.0415 20.7741 19.2791 21.4289 18.364 21.7613C17.4489 22.0937 16.444 22.081 15.5377 21.7255C14.6313 21.37 13.8857 20.6962 13.4407 19.8303C12.9956 18.9644 12.8816 17.9659 13.12 17.022V17.023ZM6.00002 14C6.53046 14 7.03916 13.7893 7.41424 13.4142C7.78931 13.0392 8.00002 12.5305 8.00002 12C8.00002 11.4696 7.78931 10.9609 7.41424 10.5858C7.03916 10.2107 6.53046 10 6.00002 10C5.46959 10 4.96088 10.2107 4.58581 10.5858C4.21074 10.9609 4.00002 11.4696 4.00002 12C4.00002 12.5305 4.21074 13.0392 4.58581 13.4142C4.96088 13.7893 5.46959 14 6.00002 14ZM17 8.00002C17.5305 8.00002 18.0392 7.78931 18.4142 7.41423C18.7893 7.03916 19 6.53045 19 6.00002C19 5.46959 18.7893 4.96088 18.4142 4.58581C18.0392 4.21073 17.5305 4.00002 17 4.00002C16.4696 4.00002 15.9609 4.21073 15.5858 4.58581C15.2107 4.96088 15 5.46959 15 6.00002C15 6.53045 15.2107 7.03916 15.5858 7.41423C15.9609 7.78931 16.4696 8.00002 17 8.00002ZM17 20C17.5305 20 18.0392 19.7893 18.4142 19.4142C18.7893 19.0392 19 18.5305 19 18C19 17.4696 18.7893 16.9609 18.4142 16.5858C18.0392 16.2107 17.5305 16 17 16C16.4696 16 15.9609 16.2107 15.5858 16.5858C15.2107 16.9609 15 17.4696 15 18C15 18.5305 15.2107 19.0392 15.5858 19.4142C15.9609 19.7893 16.4696 20 17 20Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2_264">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className='rectangle'>
                <img src={rectangle} alt="" />
            </div>
            <div className='fund'>
                Fundamentals of Product Des..
            </div>
            <div className='chapter2'>
                Chapter 2 - What is Product Design?
            </div>
            <div className='notes'>
                <p>View Chapter Notes </p>
            </div>
            <div className='quiz'>
                <p>Attempt Quiz</p>
            </div>

            <audio ref={audioRef} src={process.env.PUBLIC_URL + audioFile} />

            <div className='progress-container'>
          <input
            type='range'
            className='progress-bar'
            value={progress}
            onChange={(e) => {
              const seekTime = (e.target.value / 100) * duration;
              audioRef.current.currentTime = seekTime;
            }}
          />
          </div>

            <div className='functions'>
  <div onClick={prevTrackHandler}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10.6666 15.1107L24.2973 6.024C24.3977 5.9572 24.5143 5.91887 24.6348 5.91311C24.7552 5.90735 24.875 5.93436 24.9813 5.99128C25.0876 6.0482 25.1765 6.13289 25.2385 6.23633C25.3005 6.33976 25.3333 6.45808 25.3333 6.57867L25.3333 25.4213C25.3333 25.5419 25.3005 25.6602 25.2385 25.7637C25.1765 25.8671 25.0876 25.9518 24.9813 26.0087C24.875 26.0656 24.7552 26.0927 24.6348 26.0869C24.5143 26.0811 24.3977 26.0428 24.2973 25.976L10.6666 16.8893L10.6666 25.3333C10.6666 25.687 10.5262 26.0261 10.2761 26.2761C10.0261 26.5262 9.68693 26.6667 9.33331 26.6667C8.97969 26.6667 8.64055 26.5262 8.3905 26.2761C8.14045 26.0261 7.99998 25.687 7.99998 25.3333L7.99998 6.66667C7.99998 6.31305 8.14045 5.97391 8.3905 5.72386C8.64055 5.47381 8.97969 5.33334 9.33331 5.33334C9.68693 5.33334 10.0261 5.47381 10.2761 5.72386C10.5262 5.97391 10.6666 6.31305 10.6666 6.66667V15.1107ZM22.6666 21.684L22.6666 10.316L14.1413 16L22.6666 21.684Z" fill="white" />
    </svg>
  </div>
  <div onClick={skipBackwardHandler}>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5.28398 24.0893C7.70339 26.1858 10.7986 27.3378 14 27.3333C21.364 27.3333 27.3333 21.364 27.3333 14C27.3333 6.636 21.364 0.666668 14 0.666668C6.63598 0.666668 0.666645 6.636 0.666645 14C0.666645 16.848 1.55998 19.488 3.07998 21.6533L7.33331 14H3.33331C3.33351 11.5416 4.18289 9.15875 5.73775 7.25452C7.29261 5.35029 9.4575 4.04159 11.8662 3.54981C14.2749 3.05803 16.7795 3.41336 18.9564 4.55569C21.1333 5.69802 22.8487 7.55722 23.8126 9.81878C24.7765 12.0803 24.9296 14.6054 24.246 16.9669C23.5624 19.3283 22.0841 21.3811 20.0612 22.7781C18.0383 24.175 15.5949 24.8304 13.1445 24.6332C10.694 24.436 8.38684 23.3984 6.61331 21.696L5.28398 24.0893Z" fill="white" />
    </svg>
  </div>
  <div onClick={playPauseHandler}>
    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
      <g clip-path="url(#clip0_2_287)">
        <path d="M36 66C19.431 66 6 52.569 6 36C6 19.431 19.431 6 36 6C52.569 6 66 19.431 66 36C66 52.569 52.569 66 36 66ZM27 27V45H33V27H27ZM39 27V45H45V27H39Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_2_287">
          <rect width="72" height="72" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
  <div onClick={skipForwardHandler}>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M22.716 24.0893C20.2966 26.1858 17.2014 27.3378 14 27.3333C6.63602 27.3333 0.666687 21.364 0.666687 14C0.666687 6.636 6.63602 0.666668 14 0.666668C21.364 0.666668 27.3334 6.636 27.3334 14C27.3334 16.848 26.44 19.488 24.92 21.6533L20.6667 14H24.6667C24.6665 11.5416 23.8171 9.15875 22.2623 7.25452C20.7074 5.35029 18.5425 4.04159 16.1338 3.54981C13.7251 3.05803 11.2205 3.41336 9.04359 4.55569C6.86672 5.69802 5.15125 7.55722 4.18739 9.81878C3.22352 12.0803 3.07043 14.6054 3.75401 16.9669C4.43759 19.3283 5.91588 21.3811 7.9388 22.7781C9.96171 24.175 12.4051 24.8304 14.8555 24.6332C17.306 24.436 19.6132 23.3984 21.3867 21.696L22.716 24.0893Z" fill="white" />
    </svg>
  </div>
  <div onClick={nextTrackHandler}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <g clip-path="url(#clip0_2_294)">
        <path d="M21.3334 16.8893L7.70269 25.976C7.60229 26.0428 7.48566 26.0811 7.36521 26.0869C7.24476 26.0927 7.125 26.0656 7.01869 26.0087C6.91237 25.9518 6.82349 25.8671 6.76151 25.7637C6.69952 25.6602 6.66675 25.5419 6.66669 25.4213V6.57867C6.66675 6.45808 6.69952 6.33976 6.76151 6.23632C6.82349 6.13288 6.91237 6.0482 7.01869 5.99128C7.125 5.93436 7.24476 5.90734 7.36521 5.9131C7.48566 5.91887 7.60229 5.95719 7.70269 6.024L21.3334 15.1107V6.66667C21.3334 6.31304 21.4738 5.97391 21.7239 5.72386C21.9739 5.47381 22.3131 5.33333 22.6667 5.33333C23.0203 5.33333 23.3594 5.47381 23.6095 5.72386C23.8595 5.97391 24 6.31304 24 6.66667V25.3333C24 25.687 23.8595 26.0261 23.6095 26.2761C23.3594 26.5262 23.0203 26.6667 22.6667 26.6667C22.3131 26.6667 21.9739 26.5262 21.7239 26.2761C21.4738 26.0261 21.3334 25.687 21.3334 25.3333V16.8893ZM9.33335 10.316V21.684L17.8587 16L9.33335 10.316Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_2_294">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
</div>

<div className='footer'>
    <div >
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <g opacity="0.6" clip-path="url(#clip0_2_305)">
    <path d="M1.83337 3.66025C1.83505 3.41951 1.93137 3.1891 2.10151 3.01878C2.27166 2.84847 2.50197 2.75192 2.74271 2.75H19.2574C19.7597 2.75 20.1667 3.15792 20.1667 3.66025V18.3398C20.165 18.5805 20.0687 18.8109 19.8986 18.9812C19.7284 19.1515 19.4981 19.2481 19.2574 19.25H2.74271C2.50145 19.2498 2.27016 19.1537 2.09966 18.9831C1.92915 18.8124 1.83337 18.581 1.83337 18.3398V3.66025ZM10.0834 4.58333H3.66671V17.4167H10.0834V4.58333ZM11.9167 4.58333V17.4167H18.3334V4.58333H11.9167ZM12.8334 6.41667H17.4167V8.25H12.8334V6.41667ZM12.8334 9.16667H17.4167V11H12.8334V9.16667Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_2_305">
      <rect width="22" height="22" fill="white"/>
    </clipPath>
  </defs>
</svg>
    </div>
    <div >
    Chapters
    </div>
</div>
        </div>
    )
}
