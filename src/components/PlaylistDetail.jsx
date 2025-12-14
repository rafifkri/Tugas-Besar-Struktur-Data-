// src/components/PlaylistDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const PlaylistDetail = ({ playlists, onPlaySong }) => {
  const { id } = useParams();
  const playlist = playlists.find((p) => p.id === parseInt(id));

  if (!playlist) {
    return <div className="text-white p-10">Playlist tidak ditemukan!</div>;
  }

  // Handle play semua lagu di playlist ini
  const playThisPlaylist = (startSong) => {
    // Kirim lagu yang diklik DAN seluruh daftar lagu playlist ini sebagai queue
    onPlaySong(startSong, playlist.items); 
  };

  return (
    <div className=" from-green-900 to-neutral-900 h-full p-8 text-white overflow-y-auto">
      {/* Header Playlist */}
      <div className="flex items-end space-x-6 mb-8">
        <div className="w-48 h-48 bg-neutral-800 shadow-2xl flex items-center justify-center text-6xl shadow-black/50">
            🎵
        </div>
        <div>
            <p className="text-sm font-bold uppercase tracking-wider">Playlist • Stack Logic</p>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">{playlist.name}</h1>
            <p className="text-gray-300 text-sm opacity-80">{playlist.description}</p>
            <p className="text-gray-400 text-sm mt-2 font-bold">{playlist.items.length} Songs</p>
        </div>
      </div>
      
      {/* List Lagu Playlist */}
      <div className="mt-8">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-gray-400 border-b border-gray-700 text-sm uppercase tracking-widest sticky top-0 bg-neutral-900/50 backdrop-blur-sm">
            <span>#</span>
            <span>Title</span>
            <span>Duration</span>
          </div>
          
          <div className="mt-4 flex flex-col gap-2">
            {playlist.items.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Playlist ini masih kosong. Tambahkan lagu dari Home!</p>
            ) : (
              playlist.items.map((song, index) => (
                <div 
                  key={`${song.id}-${index}`} 
                  onClick={() => playThisPlaylist(song)}
                  className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 rounded-md hover:bg-white/10 cursor-pointer group transition items-center"
                >
                  <span className="text-gray-400 w-4 text-center group-hover:text-white">{index + 1}</span>
                  <div className="flex items-center">
                    <img src={song.imageSrc} className="w-10 h-10 mr-4 rounded shadow-sm" alt="" />
                    <div>
                      <h4 className="text-white font-semibold group-hover:text-green-400 transition">{song.title}</h4>
                      <p className="text-gray-400 text-xs">{song.artist}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{song.duration}</span>
                </div>
              ))
            )}
          </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;