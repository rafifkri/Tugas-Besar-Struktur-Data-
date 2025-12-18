// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { songData as initialSongs } from './data/songs'; 

import Sidebar from './components/Sidebar';
import PlayerBar from './components/Playerbar';
import Home from './components/Home';
import Library from './components/Library';
import PlaylistDetail from './components/PlaylistDetail'; 
import Login from './components/Login'; // Pastikan kamu sudah membuat file ini

function App() {
  //STATE AUTHENTICATION
  const [user, setUser] = useState(null);

  //STATE LIBRARY(Admin CRUD)
  const [songs, setSongs] = useState(initialSongs);

  //STATE AUDIO
  const [currentSong, setCurrentSong] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(-1);

  //STATE PLAYLIST
  const [playlists, setPlaylists] = useState([]);

  //LOGIKA LOGIN/LOGOUT
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('tokuUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tokuUser');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('tokuUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  //FUNGSI ADMIN (CRUD Library)
  const addSong = (newSong) => {
    const songWithId = { ...newSong, id: Date.now() };
    setSongs([...songs, songWithId]);
    alert("Kisah berhasil ditambahkan ke library!");
  };

  const editSong = (id, updatedData) => {
    setSongs(songs.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteSong = (id) => {
    if (window.confirm("Yakin ingin menghapus kisah ini dari library?")) {
      setSongs(songs.filter(s => s.id !== id));
      if (currentSong?.id === id) {
        setCurrentSong(null);
        setIsPlaying(false);
      }
    }
  };

  //FUNGSI AUDIO
  const handlePlaySong = (clickedSong, allSongs) => {
    setCurrentSong(clickedSong);
    const sameGenreSongs = allSongs.filter(s => s.genre === clickedSong.genre);
    const otherSongs = allSongs.filter(s => s.genre !== clickedSong.genre);
    sameGenreSongs.sort((a, b) => a.id - b.id);
    otherSongs.sort((a, b) => a.id - b.id);
    const newQueue = [...sameGenreSongs, ...otherSongs];
    setQueue(newQueue); 
    const newIndex = newQueue.findIndex((s) => s.id === clickedSong.id);
    setCurrentIndex(newIndex);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (queue.length === 0) return;
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(queue[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (queue.length === 0) return;
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentIndex(prevIndex);
    setCurrentSong(queue[prevIndex]);
    setIsPlaying(true);
  };

  //FUNGSI PLAYLIST
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
          if (pl.items.find(item => item.id === song.id)) {
            alert("Lagu sudah ada di playlist!");
            return pl;
          }
          return { ...pl, items: [song, ...pl.items] }; 
        }
        return pl;
      })
    );
  };

  const removeFromPlaylist = (playlistId, songId) => {
    if (window.confirm("Hapus dari playlist?")) {
      setPlaylists(prevPlaylists => 
        prevPlaylists.map(pl => {
          if (pl.id === playlistId) {
            return { ...pl, items: pl.items.filter(item => item.id !== songId) };
          }
          return pl;
        })
      );
    }
  };

  //PROTEKSI HALAMAN
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <section className='bg-green-800 h-screen py-2 overflow-hidden'>
        <div className='h-full w-full bg-amber-50 flex flex-wrap justify-start font-playG'>
          <div className='bg-green-800 h-9/10 flex w-full flex-nowrap justify-start items-stretch px-2 gap-2'>
            
            <Sidebar 
                user={user} 
                onLogout={handleLogout} 
                playlists={playlists} 
                onCreatePlaylist={createPlaylist} 
            />
            
            <div className="flex-1 overflow-hidden h-full bg-neutral-900 rounded-lg">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Home 
                      user={user}
                      onLogout={handleLogout}
                      songs={songs} 
                      onPlay={handlePlaySong} 
                      playlists={playlists}
                      onAddToPlaylist={addToPlaylist}
                      onDeleteSong={deleteSong} // Fungsi Admin
                      onEditSong={editSong}     // Fungsi Admin
                      onAddSong={addSong}       // Fungsi Admin
                    />
                  } 
                />
                
                <Route path="/library" element={<Library />} /> 
                
                <Route 
                  path="/playlist/:id" 
                  element={
                    <PlaylistDetail 
                      playlists={playlists} 
                      onPlaySong={handlePlaySong} 
                      onRemoveFromPlaylist={removeFromPlaylist}
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