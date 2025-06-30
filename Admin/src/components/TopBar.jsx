import React,{useState} from 'react'
import Logo from '../assets/Logo/Logo.svg'
import { useNavigate } from 'react-router-dom';
export default function TopBar() {
    const [userName, setUserName] = useState("Admin");
    const navigate  = useNavigate();
  return (
    <div className='bg-secondary w-full h-[75px] flex items-center justify-between px-4 fixed top-0 z-50 text-main font-bold'>
      <button onClick={()=> navigate('/')} className='flex items-center gap-2 sm:gap-5 cursor-pointer'>
      <img src={Logo} alt=""  className='h-[40px] sm:h-[60px]'/>
        <h1 className='text-main font-bold text-[15px] sm:text-xl md:text-2xl'>Pothole Admin</h1>
      </button>
      <h1 className='text-[10px] sm:text-xl md:text-2xl'>Welcome {userName}</h1>
    </div>
  )
}
