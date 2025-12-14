// src/components/Home.jsx
import React from 'react';

const Home = ({ songs, onPlay, playlists, onAddToPlaylist }) => {

  // Fungsi Helper saat tombol (+) diklik
  const handleAddClick = (e, song) => {
    e.stopPropagation(); // Biar gak nge-trigger onPlay (klik kartu)
    
    // Tampilkan daftar playlist sederhana di prompt
    const playlistList = playlists.map(p => `${p.id}: ${p.name}`).join('\n');
    const inputId = prompt(`Masukkan ID Playlist tujuan:\n${playlistList}`);
    
    if (inputId) {
      // Panggil fungsi di App.jsx
      onAddToPlaylist(parseInt(inputId), song);
    }
  };

  return (
    <div className='bg-neutral-900 h-full w-full p-6 overflow-y-auto'>
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-2xl font-bold text-white'>Internal Songs</h1>
        <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
             <img src="/img/Axcel-berpikir-keras.jpeg" alt="Profile" className="object-cover w-full h-full"/>
        </div>
      </div>
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {songs.map((song) => (
          <div 
            key={song.id} 
            className='bg-neutral-800 p-4 rounded-lg cursor-pointer hover:bg-neutral-700 transition group relative'
            onClick={() => onPlay(song, songs)}
          >
            <div className='relative aspect-square mb-4'>
               <img src={song.imageSrc} alt={song.title} className='w-full h-full object-cover rounded-md shadow-lg'/>
               
               {/* Tombol Play Hover */}
               <div className='absolute right-2 bottom-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0'>
                 ▶
               </div>
            </div>

            
            <button 
              onClick={(e) => handleAddClick(e, song)}
              className='absolute top-4 right-4 bg-neutral-900/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 hover:scale-110 transition opacity-0 group-hover:opacity-100'
              title="Add to Playlist"
            >
              +
            </button>

            <h3 className='text-white font-bold truncate'>{song.title}</h3>
            <p className='text-gray-400 text-sm truncate'>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;