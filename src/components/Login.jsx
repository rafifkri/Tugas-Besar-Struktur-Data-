import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

//1.SFX trigger Clicker
  const playTypeSfx = () => {
    const sfx = new Audio('/sounds/key-click.mp3'); 
    sfx.volume = 0.5;
    sfx.currentTime = 0; 
    sfx.play().catch(() => {});
  };

//2.SFX TRIGGER HENSHIN
  const playHenshinSfx = () => {
    const sfx = new Audio('/sounds/henshin.mp3'); // Path ke public/sounds/henshin.mp3
    sfx.volume = 0.9;
    sfx.play().catch(() => {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Panggil suara Henshin saat proses login dimulai
    playHenshinSfx();

    //Login Logic
    if (email === 'admin@tokuplay.com' && password === 'admin123') {
      //DELAYED THE SOUND
      setTimeout(() => {
        onLogin({ name: 'Administrator', role: 'admin' });
      }, 500);
    } else if (email === 'user@tokuplay.com' && password === 'user123') {
      setTimeout(() => {
        onLogin({ name: 'User Toku', role: 'user' });
      }, 500);
    } else {
      setError('ACCESS DENIED: INVALID CREDENTIALS');
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[100] font-playG bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img/login-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-green-600 absolute animate-scanline"></div>
      </div>

      <div className="relative bg-neutral-900/80 p-8 rounded-2xl border-2 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] w-full max-w-md backdrop-blur-md animate-fade-in border-t-[10px]">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-neutral-800 rounded-full border-2 border-red-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(37,219,59,0.84)]">
            <img src="/img/KRWi-V3_Wizard_Ring_29.svg" className="w-12 h-12 object-contain" alt="Logo" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">Toku Login</h2>
          <div className="h-1 w-20 bg-red-600 mt-2"></div>
          <p className="text-green-400 text-[10px] mt-2 tracking-widest animate-pulse font-mono uppercase italic">Authentication Required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-[10px] mb-2 uppercase tracking-[3px] font-bold">Authentication ID</label>
            <input 
              type="email" 
              className="w-full bg-black/50 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-all font-mono"
              placeholder="Input ID..."
              value={email}
              onChange={(e) => { setEmail(e.target.value); playTypeSfx(); }}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-[10px] mb-2 uppercase tracking-[3px] font-bold">Access Code</label>
            <input 
              type="password" 
              className="w-full bg-black/50 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-all font-mono"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); playTypeSfx(); }}
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-600 p-2 rounded animate-shake">
              <p className="text-red-500 text-[10px] text-center font-bold tracking-tighter uppercase">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-800 text-white font-black py-4 rounded-lg shadow-[0_0_20px_rgba(37,219,59,0.84)] transition-all active:scale-95 uppercase tracking-[0.3em] text-sm"
          >
            Henshin!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;