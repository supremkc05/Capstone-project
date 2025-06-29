import React,{useState} from 'react'
import Logo from '../assets/Logo/Logo.svg'
export default function TopBar() {
    const [userName, setUserName] = useState("Admin");
  return (
    <div className='bg-secondary w-full h-[75px] flex items-center justify-between px-4 fixed top-0 z-50 text-main font-bold'>
      <div className='flex items-center gap-2 sm:gap-5'>
      <img src={Logo} alt=""  className='h-[40px] sm:h-[60px]'/>
        <h1 className='text-main font-bold text-[15px] sm:text-xl md:text-2xl'>Pothole Admin</h1>
      </div>
      <h1 className='text-[10px] sm:text-xl md:text-2xl'>Welcome {userName}</h1>
    </div>
  )
}
