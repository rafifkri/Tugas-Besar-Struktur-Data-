// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { songData } from './data/songs'; 

import Sidebar from './components/Sidebar';
import PlayerBar from './components/Playerbar';
import Home from './components/Home';
import Library from './components/Library';
import PlaylistDetail from './components/PlaylistDetail'; 

function App() {
  // --- STATE AUDIO ---
  const [currentSong, setCurrentSong] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(-1);

  // --- STATE PLAYLIST (Updated) ---
  const [playlists, setPlaylists] = useState([
    // Tambahkan array 'items' kosong untuk menampung lagu
    { id: 1, name: "Ultraman", description: "MC Mode😈", items: [] },
    { id: 2, name: "Kamen Rider", description: "KASIH PAHAM ADVENT🥶", items: [] }
  ]);

  // --- FUNGSI AUDIO (Play, Next, Prev) ---
  const handlePlaySong = (clickedSong, allSongs) => {
    setCurrentSong(clickedSong);
    const sameGenreSongs = allSongs.filter(s => s.genre === clickedSong.genre);
    const otherSongs = allSongs.filter(s => s.genre !== clickedSong.genre);
    sameGenreSongs.sort((a, b) => a.id - b.id);
    otherSongs.sort((a, b) => a.id - b.id);
    const newQueue = [...sameGenreSongs, ...otherSongs];
    setQueue(newQueue); 
    const newIndex = allSongs.findIndex((s) => s.id === clickedSong.id);
    setCurrentIndex(newIndex);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentSong(queue[nextIndex]);
    } else {
      setCurrentIndex(0);
      setCurrentSong(queue[0]);
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(queue[prevIndex]);
    } else {
      const lastIndex = queue.length - 1;
      setCurrentIndex(lastIndex);
      setCurrentSong(queue[lastIndex]);
    }
      setIsPlaying(true);
  };

  // --- FUNGSI PLAYLIST (Create & Add Song) ---
  const createPlaylist = () => {
    const name = prompt("Nama Playlist Baru:");
    if (name) {
      const newId = playlists.length > 0 ? playlists[playlists.length - 1].id + 1 : 1;
      setPlaylists([...playlists, { id: newId, name, description: "User Playlist", items: [] }]);
    }
  };

  const addToPlaylist = (playlistId, song) => {
    setPlaylists(prevPlaylists => 
      prevPlaylists.map(pl => {
        if (pl.id === playlistId) {
          // Cek apakah lagu sudah ada di playlist (opsional, biar gak dobel)
          const isExist = pl.items.find(item => item.id === song.id);
          if (isExist) {
            alert("Lagu sudah ada di playlist ini!");
            return pl;
          }
          
          // LOGIKA STACK: [Lagu Baru, ...Lagu Lama]
          // Lagu baru ditaruh DI DEPAN (Index 0), lagu lama kegeser ke bawah.
          return { ...pl, items: [song, ...pl.items] }; 
        }
        return pl;
      })
    );
    alert(`Berhasil menambahkan ke playlist!`);
  };

  return (
    <BrowserRouter>
      <section className='bg-green-800 h-screen py-2 overflow-hidden'>
        <div className='h-full w-full bg-amber-50 flex flex-wrap justify-start font-playG'>
          <div className='bg-green-800 h-9/10 flex w-full flex-nowrap justify-start items-stretch px-2 gap-2'>
            
            <Sidebar playlists={playlists} onCreatePlaylist={createPlaylist} />
            
            <div className="flex-1 overflow-hidden h-full bg-neutral-900 rounded-lg">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Home 
                      songs={songData} 
                      onPlay={handlePlaySong} 
                      playlists={playlists}         // Kirim info playlist
                      onAddToPlaylist={addToPlaylist} // Kirim fungsi tambah
                    />
                  } 
                />
                
                <Route path="/library" element={<Library />} /> 
                
                <Route 
                  path="/playlist/:id" 
                  element={
                    <PlaylistDetail 
                      playlists={playlists} 
                      onPlaySong={handlePlaySong} // Kirim fungsi play agar bisa putar dari playlist
                    />
                  } 
                />
                
                <Route path="*" element={<h1 className="p-10 text-white">404</h1>} />
              </Routes>
            </div>
          </div>
          
          <PlayerBar 
            currentSong={currentSong} 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            onNext={handleNext}
            onPrev={handlePrev}
          />
          
        </div>
      </section>
    </BrowserRouter>
  );
}

export default App;