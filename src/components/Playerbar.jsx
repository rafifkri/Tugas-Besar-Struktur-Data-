// src/components/Playerbar.jsx
import React, { useEffect, useRef } from 'react';

// Terima props onNext dan onPrev
const PlayerBar = ({ currentSong, isPlaying, setIsPlaying, onNext, onPrev }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSong]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!currentSong) return (
    <div className='bg-neutral-900 w-full h-20 border-t border-neutral-700 flex items-center justify-center text-white'>
        Pilih lagu untuk memutar
    </div>
  );

  return (
    <div className='bg-neutral-900 w-full h-20 px-4 flex justify-between items-center border-t border-neutral-800 text-white z-50'>
      
      {/* LOGIC QUEUE DISINI: onEnded panggil onNext */}
      <audio 
        ref={audioRef} 
        src={currentSong.audioSrc} 
        onEnded={onNext} 
      />

      {/* Info Lagu */}
      <div className='flex items-center w-1/3'>
        <img src={currentSong.imageSrc} className='w-14 h-14 rounded shadow mr-4 object-cover' alt="Cover" />
        <div>
          <h4 className='text-sm font-bold hover:underline cursor-pointer truncate'>{currentSong.title}</h4>
          <p className='text-xs text-gray-400'>{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className='flex flex-col items-center w-1/3'>
        <div className='flex items-center space-x-6 mb-1'>
           {/* Tombol Previous */}
           <button onClick={onPrev} className='text-gray-400 hover:text-white hover:scale-110 transition'>
             ⏮
           </button>
           
           <button 
             onClick={togglePlay} 
             className='bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition'
           >
             {isPlaying ? '⏸' : '▶'}
           </button>

           {/* Tombol Next */}
           <button onClick={onNext} className='text-gray-400 hover:text-white hover:scale-110 transition'>
             ⏭
           </button>
        </div>
        
        {/* Progress Bar Visual */}
        <div className='w-full max-w-md h-1 bg-neutral-600 rounded-full mt-2'>
           <div className='w-full h-full bg-neutral-500 rounded-full animate-pulse'></div>
        </div>
      </div>

      {/* Volume */}
      <div className='w-1/3 flex justify-end'>
        <span className='text-xs'>Volume</span>
      </div>
    </div>
  );
};

export default PlayerBar;