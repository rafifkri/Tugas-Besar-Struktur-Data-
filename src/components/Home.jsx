import React, { useState, useEffect, useRef } from 'react';
import AdminModal from './AdminModal.jsx'; 

const Home = ({ 
  user, 
  onLogout, 
  songs, 
  onPlay, 
  playlists, 
  onAddToPlaylist, 
  onDeleteSong, 
  onEditSong, 
  onAddSong 
}) => {
  //1. STATE MANAGEMENT
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isolatedSong, setIsolatedSong] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const categories = ["All", "Ultraman", "Kamen Rider", "Super Sentai"];

  //2. LOGIKA FILTERING & SEARCH
  const searchResults = songs.filter((song) => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSongsToDisplay = () => {
    if (isolatedSong) return [isolatedSong];
    if (selectedCategory === "All") return songs;
    return songs.filter(song => song.genre === selectedCategory);
  };

  const songsToDisplay = getSongsToDisplay();

  //3. HANDLER FUNCTIONS
  const openModal = () => setIsAdminModalOpen(true);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowTooltip(true);
    setIsolatedSong(null);
  };

  const handleAddClick = (e, song) => {
    e.stopPropagation(); 
    const playlistList = playlists.map(p => `${p.id}: ${p.name}`).join('\n');
    const inputId = prompt(`Masukkan ID Playlist tujuan:\n${playlistList}`);
    if (inputId) {
      onAddToPlaylist(parseInt(inputId), song);
    }
  };

  //4. USE EFFECT (KLIK LUAR)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setShowTooltip(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='bg-neutral-900 h-full w-full p-6 overflow-y-auto scrollbar-box' onClick={() => setShowTooltip(false)}>
      
      <AdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
        onAddSong={onAddSong}
      />

      {/* --- HEADER: SEARCH & PROFILE --- */}
      <div className="flex justify-between items-center mb-6 relative">
        <div className="w-md mr-auto relative" ref={searchRef}> 
          <form onSubmit={(e) => e.preventDefault()}> 
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                <img className="w-5 h-5 opacity-50" src="/img/search.png" alt="Search Icon" />
              </div>
              <input 
                type="search" 
                autoComplete="off"
                className="font-playG w-full p-2 ps-9 bg-neutral-800 border border-neutral-700 text-white text-sm rounded-full focus:ring-1 focus:ring-green-500 outline-none transition" 
                placeholder="Cari Kisah apa kink?" 
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowTooltip(true)}
              />
            </div>
          </form>

          {showTooltip && searchQuery && (
            <div className="absolute top-12 left-0 w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto scrollbar-box">
              {searchResults.length > 0 ? (
                searchResults.map((song) => (
                  <div 
                    key={song.id}
                    onClick={() => { setIsolatedSong(song); setSearchQuery(song.title); setShowTooltip(false); }}
                    className="px-4 py-2 hover:bg-neutral-700 cursor-pointer flex items-center gap-3 border-b border-neutral-700/30 last:border-0 border-l-4 border-transparent hover:border-green-500"
                  >
                    <img src={song.imageSrc} className="w-8 h-8 rounded object-cover" alt="" />
                    <div className='flex flex-col'>
                        <span className="text-white text-xs font-bold">{song.title}</span>
                        <span className="text-gray-400 text-[10px]">{song.artist}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-xs">Kisah tidak ditemukan</div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
            <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 hover:bg-neutral-800 p-1 pr-3 rounded-full transition group"
            >
                <div className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-green-500 overflow-hidden bg-neutral-800 transition shadow-lg">
                    <img src="/img/Axcel-berpikir-keras.jpeg" alt="Profile" className="object-cover w-full h-full"/>
                </div>
                <div className="text-left hidden md:block">
                    <p className="text-white text-xs font-bold leading-none">{user.name}</p>
                    <p className="text-green-500 text-[10px] uppercase mt-1 tracking-tighter">{user.role}</p>
                </div>
            </button>

            {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl z-[60] overflow-hidden animate-fade-in">
                    <div className="p-2">
                        <button 
                            onClick={onLogout}
                            className="w-full flex justify-center items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm font-medium"
                        >
                          Logout Akun
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* --- CATEGORIES & ADMIN BUTTON --- */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setIsolatedSong(null); setSearchQuery(""); }}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${selectedCategory === cat ? 'bg-green-600 text-white shadow-lg shadow-green-900/20 scale-105' : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'}`}
          >
            {cat}
          </button>
        ))}

        {user.role === 'admin' && (
          <button 
            onClick={openModal}
            className="px-6 py-2 rounded-full text-xs font-bold bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/20 transition-all hover:scale-105"
          >
            😜 AKUH MAWU KISAH BARU VANG
          </button>
        )}
      </div>

      <h1 className='text-xl font-bold text-white mb-6 uppercase tracking-widest border-l-4 border-green-600 pl-3'>
        {isolatedSong ? "Hasil Pencarian" : `${selectedCategory} Library`}
      </h1>
      
      {/* --- GRID UTAMA --- */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {songsToDisplay.map((song) => (
          <div 
            key={song.id} 
            className='bg-neutral-800/50 p-4 rounded-xl cursor-pointer hover:bg-neutral-800 transition group relative border border-transparent hover:border-neutral-700 shadow-md'
            onClick={() => onPlay(song, songs)}
          >
            {/* ADMIN ACTIONS */}
            {user.role === 'admin' && (
              <div className="absolute top-2 left-2 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newTitle = prompt("Ubah Judul:", song.title);
                    if(newTitle) onEditSong(song.id, { title: newTitle });
                  }}
                  className="p-2 bg-yellow-600 rounded-lg hover:bg-yellow-500 shadow-md text-xs"
                ><img src="img\edit.png" alt="" className='w-4 h-4'/></button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteSong(song.id); }}
                  className="p-2 bg-red-600 rounded-lg hover:bg-red-500 shadow-md text-xs"
                ><img src="img\delete.png" alt="" className='w-4 h-4'/></button>
              </div>
            )}

            <div className='relative aspect-square mb-4'>
               <img src={song.imageSrc} alt={song.title} className='w-full h-full object-cover rounded-lg shadow-lg'/>
               <div className='absolute right-2 bottom-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0'>
                 ▶
               </div>
               
               {/*state = "+" else - Admin*/}
               {user.role !== 'admin' && (
                 <button 
                  onClick={(e) => handleAddClick(e, song)}
                  className='absolute top-2 right-2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 hover:scale-110 transition opacity-0 group-hover:opacity-100'
                  title="Add to Playlist"
                 > + </button>
               )}
            </div>

            <h3 className='text-white font-bold text-sm truncate'>{song.title}</h3>
            <p className='text-gray-500 text-xs truncate'>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;