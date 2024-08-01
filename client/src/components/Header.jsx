import React, { useState } from 'react'
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { GiChessKing } from "react-icons/gi";
import { Link } from 'react-router-dom';


const Header = () => {
  const [ismenuOpen,setIsmenuOpen] = useState(false);
  function handletoggle(){
    setIsmenuOpen(!ismenuOpen)
  }
  return (
    <nav className='flex justify-between items-center px-6 py-[10px] w-full h-16 bg-slate-950 text-white'>
        <div className='flex gap-1 items-center text-[16px] md:text-2xl font-medium text-center cursor-pointer'>
          <GiChessKing className='text-[28px] text-green-300'/>
          <p className='text-2xl font-semibold'>Chess</p>
        </div>
        <ul className={`fixed z-10 md:relative top-16 md:top-0 right-0 md:border-none border-t-[2px] border-gray-800 bg-slate-950 w-full h-[calc(100vh-4rem)] md:h-auto flex flex-col items-center justify-center space-y-8 text-[1rem] transition-transform duration-300 ease-in-out transform ${ismenuOpen ? 'translate-x-0' : 'translate-x-full'} md:flex md:flex-row md:items-center md:justify-end md:gap-9 md:translate-x-0 md:space-y-0`}>
          <Link to={'/'}><li className='cursor-pointer'>Home</li></Link>
          <Link to={'/about'}><li className='cursor-pointer'>About</li></Link>
          <Link to={'game'}><li className='bg-green-300 px-2 py-[4px] rounded font-semibold text-black cursor-pointer'>Sign Up</li></Link>
          <li className='bg-green-300 px-[14px] py-[5px] rounded font-semibold text-black cursor-pointer'>Log in</li>
        </ul>
        <button onClick={handletoggle} className='lg:hidden text-2xl cursor-pointer text-green-300'>
          {
            ismenuOpen ? <MdOutlineClose className='text-3xl'/> : <RiMenu3Line/>
          }
        </button>
    </nav>
  )
}

export default Header