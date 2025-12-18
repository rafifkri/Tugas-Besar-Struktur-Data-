import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditSongPage = ({ songs, onEditSong }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const song = songs.find(s => s.id === parseInt(id));
    if (song) setFormData({ ...song });
    else navigate('/');
  }, [id, songs, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditSong(parseInt(id), formData);
    navigate('/');
  };

  if (!formData) return null;

  return (
    <div className="h-full w-full bg-neutral-900 p-8 flex flex-col items-center overflow-y-auto scrollbar-box">
      <div className="w-full max-w-2xl bg-neutral-800 p-8 rounded-2xl shadow-2xl border border-neutral-700">
        <div className="flex justify-between items-center mb-8 border-b border-neutral-700 pb-4">
          <h1 className="text-2xl font-bold text-white uppercase">Edit Kisah ✏️</h1>
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white text-sm">Batal</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Judul</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white outline-none focus:border-green-500"/>
            </div>
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Artis</label>
              <input type="text" value={formData.artist} onChange={(e) => setFormData({...formData, artist: e.target.value})} className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white outline-none focus:border-green-500"/>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Genre</label>
            <select value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white outline-none">
              <option value="Ultraman">Ultraman</option><option value="Kamen Rider">Kamen Rider</option><option value="Super Sentai">Super Sentai</option>
            </select>
          </div>
          <div className="flex items-center gap-6 p-4 bg-neutral-900 rounded-xl">
             <img src={formData.imageSrc} className="w-24 h-24 rounded-lg object-cover border border-neutral-700" alt="Cover"/>
             <div>
                <p className="text-white text-sm font-bold mb-2">Ganti Cover</p>
                <input type="file" accept="image/*" onChange={(e) => setFormData({...formData, imageSrc: URL.createObjectURL(e.target.files[0])})} className="text-xs text-gray-400"/>
             </div>
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  );
};

export default EditSongPage;