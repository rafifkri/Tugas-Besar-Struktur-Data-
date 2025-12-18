import React, { useState, useRef, useEffect } from 'react';

const PlayerBar = ({ currentSong, isPlaying, setIsPlaying, onNext, onPrev }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

//Play/Pause Audio(before update to 100 opacity)
  useEffect(() => {
    if (currentSong && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Menunggu interaksi user...")); // before update
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  //Play/Pause onClick SFX
  const playTokuSfx = (action) => {
    const sfxPath = action === 'play' ? '/sounds/clock-over.mp3' : '/sounds/clock-up.mp3';
    const sfx = new Audio(sfxPath);
    sfx.volume = 0.9; 
    sfx.play();
  };

  const handleTogglePlay = () => {
    if (currentSong) {
      playTokuSfx(!isPlaying ? 'play' : 'pause');
      setIsPlaying(!isPlaying);
    }
  };

  //Time & Volume Slider Handler
  const handleTimeUpdate = () => { if (audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const handleLoadedMetadata = () => { if (audioRef.current) setDuration(audioRef.current.duration); };
  
  const handleSeek = (e) => {
    if (audioRef.current) {
      const time = e.target.value;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const [volume, setVolume] = useState(1); 
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return "img/mute-vol.png";
    if (volume < 0.9) return "img/mid-vol.png";
    return "img/max-vol.png";
  };

  const getIconGlowClass = () => {
    if (volume === 0) return ""; 
    if (volume < 0.9) return "drop-shadow-[0_0_8px_rgba(130,0,211,0.8)]"; 
    return "drop-shadow-[0_0_15px_rgba(196,33,33,1)] scale-110 transition-transform"; 
  };

  const getThumbGlowStyle = () => {
    if (volume === 0) return "none";
    if (volume < 0.9) return "0 0 10px rgba(34, 197, 94, 0.6)"; 
    return "0 0 20px rgba(251, 191, 36, 1), 0 0 40px rgba(251, 191, 36, 0.4)"; 
  };

  //Play/Pause condition
  const getPlayButtonImage = () => {
    return isPlaying ? "/img/kabuto-pause.png" : "/img/kabuto-play.png";
  };

  const getPlayButtonClass = () => {
    if (!currentSong) return "opacity-50 grayscale cursor-not-allowed";
    
    //Play image as PlayCondition
    if (isPlaying) {
      return "drop-shadow-[0_0_15px_rgba(0,191,255,0.9)] scale-110"; 
    }
    
    //Pause image as PauseCondtion
    return "drop-shadow-[0_0_5px_rgba(255,69,0,0.6)] hover:scale-105";
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-4 px-8 flex justify-between items-center z-50 h-24'>
      
      <audio ref={audioRef} src={currentSong ? currentSong.audioSrc : undefined} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={onNext} />

      {/*Music-info as Label*/}
      <div className='flex items-center w-1/3 min-w-[200px]'>
        {currentSong ? (
          <>
            <img src={currentSong.imageSrc} alt={currentSong.title} className='w-14 h-14 rounded-md object-cover mr-4 shadow-lg animate-fade-in' />
            <div className="overflow-hidden">
              <h4 className='text-white font-bold truncate'>{currentSong.title}</h4>
              <p className='text-gray-400 text-sm truncate'>{currentSong.artist}</p>
            </div>
          </>
        ) : <div className="w-14 h-14 mr-4 bg-transparent"></div>}
      </div>

      {/*Player-Control (center)*/}
      <div className='flex flex-col items-center w-1/3'>
        <div className='flex items-center space-x-8 mb-2'>
          
          <button onClick={onPrev} disabled={!currentSong} className={`text-xl transition ${!currentSong ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}>⏮</button>
          
          {/*callback button Play/Pause*/}
          <button 
            onClick={handleTogglePlay} 
            disabled={!currentSong} 
            className={`transition-all duration-300 active:scale-90 focus:outline-none ${!currentSong ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className={`relative w-14 h-14 flex items-center justify-center transition-all duration-500 ${getPlayButtonClass()}`}>
               <img 
                 src={getPlayButtonImage()} 
                 alt={isPlaying ? "Pause" : "Play"} 
                 className="w-full h-full object-contain"
               />
            </div>
          </button>
          
          <button onClick={onNext} disabled={!currentSong} className={`text-xl transition ${!currentSong ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}>⏭</button>
        </div>

        <div className='w-full flex items-center space-x-3 text-xs text-gray-400 font-mono'>
          <span>{formatTime(currentTime)}</span>
          <input 
            type="range" min={0} max={duration || 0} value={currentTime} onChange={handleSeek} disabled={!currentSong}
            className={`w-full h-1 rounded-lg appearance-none transition-all ${!currentSong ? 'bg-gray-800' : 'bg-gray-600 cursor-pointer accent-green-500 hover:h-2'}`}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/*Volume-Slider*/}
      <div className='w-1/3 flex justify-end items-center space-x-3'>
         <button onClick={() => { const v = volume > 0 ? 0 : 1; setVolume(v); if(audioRef.current) audioRef.current.volume = v; }} disabled={!currentSong}>
            <img 
              src={getVolumeIcon()} 
              alt="Volume" 
              className={`w-11 h-11 object-contain transition-all duration-300 ${getIconGlowClass()}`} 
            />
         </button>

         <input 
            type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} disabled={!currentSong}
            className={`w-24 h-1 rounded-lg appearance-none transition-all ${!currentSong ? 'opacity-50 cursor-not-allowed' : 'bg-gray-800 cursor-pointer hover:h-2 accent-amber-300'}`}
         />
      </div>

      <style>{`
            input[type="range"]::-webkit-slider-thumb {
               -webkit-appearance: none;
               appearance: none;
               width: 14px;
               height: 14px;
               border-radius: 50%;
               background: white;
               cursor: pointer;
               box-shadow: ${getThumbGlowStyle()}; 
               border: 2px solid #171717;
            }
            input[type="range"]::-moz-range-thumb {
               width: 14px;
               height: 14px;
               border-radius: 50%;
               background: white;
               cursor: pointer;
               box-shadow: ${getThumbGlowStyle()};
               border: 2px solid #171717;
            }
      `}</style>
    </div>
  );
};

export default PlayerBar;