import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCircleExclamation, faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import PotholesTable from '../components/PotholesTable';
import Map from '../components/Map';
export default function Home() {
    const [users, setUsers] = useState(300);
  return (
    <div className='grid grid-cols-3 gap-4 p-4 w-full h-full'>
      <div className="bg-white shadow-inner shadow-black/30 rounded p-6 text-center text-main font-bold h-full">
        <FontAwesomeIcon icon={faUsers} className='p-6 bg-secondary rounded-2xl text-main text-2xl' />
        <p className='text-xl'>{users} Total users</p>
      </div>
      <div className="bg-white shadow-inner shadow-black/30 rounded p-6 text-center text-main font-bold h-full">
        <FontAwesomeIcon icon={faCircleExclamation} className='p-6 bg-lightRed rounded-2xl text-darkRed text-2xl' />
        <p className='text-xl'>{users} potholes detected</p>
      </div>
      <div className="bg-white shadow-inner shadow-black/30 rounded p-6 text-center text-main font-bold h-full">
        <FontAwesomeIcon icon={faCircleCheck} className='p-6 bg-lightGreen rounded-2xl text-darkGreen text-2xl' />
        <p className='text-xl'>{users} potholes repaired</p>
      </div>
      <div className='col-span-2 h-[250px] xl:h-[350px] overflow-y-auto'>
        <p className='text-right text-main font-bold '><button>View Large</button></p>
        <PotholesTable/>
      </div>
      <div className='col-span-1 bg-white shadow-inner shadow-black/30 rounded p-6 text-center text-main font-bold h-full'>
        <Map/>
      </div>
      
    </div>
  )
}