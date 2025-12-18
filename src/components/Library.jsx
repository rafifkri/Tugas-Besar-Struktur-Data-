import React from "react";

const Library = () => {
    return(
        <div className='bg-neutral-900 h-138 w-full ml-1 rounded-lg flex flex-wrap justify-between'>
            {/* nav-main start*/}
        <form className="pl-2 max-w-md mx-auto mt-3"> 
          <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only text-neutral-100 ">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
              <img className="w-5 h-5" src="img\search.png" alt="Search Icon" />
            </div>
            <input type="search" id="search" className="font-playG w-full p-2 ps-9 bg-neutral-700 border-default-medium text-heading text-neutral-50 text-sm rounded-full focus:ring-brand focus:border-brand shadow-xs placeholder:text-body hover:bg-neutral-800 transition delay-150 duration-200 ease-in-out" placeholder="Cari Playlist Kink?" required />
          </div>
        </form>
        {/*Tooltip*/}
        <div className="relative group inline-block mr-4 mt-3.5">
          <button>
            <img className="w-10 h-10 rounded-full" src="img\Axcel-berpikir-keras.jpeg" alt="Medium avatar"/>
          </button>
        </div>
      {/* nav-main end */}
      {/* hero-main start */}
      <div className='w-full h-9/10 rounded-md px-5 pt-5 font-bold flex flex-wrap'>
        <div className='w-full h-1/8 flex items-center pl-1'>
          <h1 className='text-2xl text-white'>Your Playlist</h1>
        </div>
        <div className='w-full h-7/8 grid grid-cols-4 overflow-auto'>
          <div className='w-50 h-55 bg-amber-100 rounded-lg mb-5 hover:drop-shadow-lg'></div>
          <div className='w-50 h-55 bg-amber-100 rounded-lg mb-5 hover:drop-shadow-lg'></div>
          <div className='w-50 h-55 bg-amber-100 rounded-lg mb-5 hover:drop-shadow-lg'></div>
          <div className='w-50 h-55 bg-amber-100 rounded-lg mb-5 hover:drop-shadow-lg'></div>
        </div>
      </div>
      {/* hero-main end */}
        </div>
    );
;}

export default Library;