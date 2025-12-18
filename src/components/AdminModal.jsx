import React, { useState } from 'react';

const AdminModal = ({ isOpen, onClose, onAddSong }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: 'Ultraman',
    audioFile: null,
    imageFile: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.audioFile || !formData.imageFile) return alert("Mohon pilih file audio dan cover!");

    const audioSrc = URL.createObjectURL(formData.audioFile);
    const imageSrc = URL.createObjectURL(formData.imageFile);

    onAddSong({
      title: formData.title,
      artist: formData.artist,
      genre: formData.genre,
      audioSrc: audioSrc,
      imageSrc: imageSrc
    });

    onClose(); 
    setFormData({ title: '', artist: '', genre: 'Ultraman', audioFile: null, imageFile: null });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-white font-bold text-xl">Tambah Kisah Baru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Input Text */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">Judul Lagu</label>
              <input 
                type="text" required placeholder=""
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white outline-none focus:border-green-500"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">Artis/Series</label>
              <input 
                type="text" required placeholder=""
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white outline-none focus:border-green-500"
                onChange={(e) => setFormData({...formData, artist: e.target.value})}
              />
            </div>
          </div>

          {/* Input Genre */}
          <div>
            <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">Genre</label>
            <select 
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white outline-none"
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
            >
              <option value="Ultraman">Ultraman</option>
              <option value="Kamen Rider">Kamen Rider</option>
              <option value="Super Sentai">Super Sentai</option>
            </select>
          </div>

          {/* File Pickers */}
          <div className="space-y-4">
            <div className="bg-neutral-800 p-4 rounded-xl border border-dashed border-neutral-600 hover:border-green-500 transition">
              <label className="text-white text-sm font-bold block mb-1 ml-5">Pilih File </label>
              <input 
                type="file" accept="audio/*" required
                className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-500"
                onChange={(e) => setFormData({...formData, audioFile: e.target.files[0]})}
              />
            </div>

            <div className="bg-neutral-800 p-4 rounded-xl border border-dashed border-neutral-600 hover:border-green-500 transition">
              <label className="text-white text-sm font-bold block mb-1">Pilih Cover Image</label>
              <input 
                type="file" accept="image/*" required
                className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-500"
                onChange={(e) => setFormData({...formData, imageFile: e.target.files[0]})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-900/20 transition active:scale-95 mt-4"
          >
            Upload ke Library
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;