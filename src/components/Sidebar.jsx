import React from 'react';
import { Link } from 'react-router-dom';

//Fungsi CreatePlaylist
const Sidebar = ({ user, playlists, onCreatePlaylist }) => {
  return (
    <div className='bg-neutral-900 h-full w-1/4 rounded-lg px-4 pt-4 flex flex-col font-playG'>
      
      {/*Logo*/}
      <div className='flex items-center mb-6'>
        <img src="img\KRWi-V3_Wizard_Ring_29.svg" alt="" className='w-6 h-7 mr-2'/>
         <h1 className='font-bold text-lg text-white'><span className='text-green-600'>Toku</span>Play</h1>
      </div>

      {/*Side-Nav*/}
      <div className='flex flex-col space-y-2'>
        <Link to="/" className='flex items-center text-gray-300 hover:text-white hover:bg-neutral-800 p-2 rounded-md transition'>
          <img src="/img/home.png" className='w-6 h-6 mr-3' alt="Home" />
          <span className='font-semibold'>Home</span>
        </Link>
        
        {/*admin without createPlaylist-Bar*/}
        {user?.role !== 'admin' && (
          <button 
            onClick={onCreatePlaylist} 
            className='flex items-center text-gray-300 hover:text-white hover:bg-neutral-800 p-2 rounded-md transition w-full text-left'
          >
            <img src="/img/add.png" className='w-6 h-6 mr-3' alt="Add" />
            <span className='font-semibold'>Create Playlist</span>
          </button>
        )}
      </div>

      <div className='border-t border-neutral-700 my-4'></div>

      {/*Playlist-List*/}
      <div className='flex-1 overflow-y-auto scrollbar-box'>
        <h3 className='text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider'>Your Playlist</h3>
        
        {playlists.map((playlist) => (
          <Link 
            key={playlist.id} 
            to={`/playlist/${playlist.id}`} 
            className='block py-2 text-sm text-gray-300 hover:text-white truncate'
          >
            🎵 {playlist.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;