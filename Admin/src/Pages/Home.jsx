import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import PotholesTable from '../components/PotholesTable';
import Map from '../components/Map';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [users, setUsers] = useState(0);
  const [detections, setDetections] = useState([]); 
  const [markerPosition, setMarkerPosition] = useState([27.7326197, 85.380883]);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch total users
    axios.get('http://localhost:3000/users')
      .then(res => setUsers(res.data.length || 0)) // ✅ Fix: count total users
      .catch(() => setUsers(0));

    // Fetch pothole detections
    axios.get('http://localhost:3000/detections')
      .then(res => setDetections(res.data))
      .catch(() => setDetections([]));
  }, []);

  // Calculate detected and repaired
  const detectedCount = detections.length;
  const repairedCount = detections.filter(d => d.status === 'resolved').length;

  return (
    <div className='grid grid-cols-3 gap-4 p-4 w-full h-full'>
      <button className="bg-white shadow-inner shadow-black/30 rounded p-6 text-center text-main font-bold h-full" onClick={()=> navigate('/users')}>
        <FontAwesomeIcon icon={faUsers} className='p-6 bg-secondary rounded-2xl text-main text-2xl' />
        <p className='text-xl'>{users} Total users</p>
      </button>
      <div className="bg-white shadow-inner shadow-black/30 rounded p-6 text-center text-main font-bold h-full">
        <FontAwesomeIcon icon={faCircleExclamation} className='p-6 bg-lightRed rounded-2xl text-darkRed text-2xl' />
        <p className='text-xl'>{detectedCount} potholes detected</p>
      </div>
      <div className="bg-white shadow-inner shadow-black/30 rounded p-6 text-center text-main font-bold h-full">
        <FontAwesomeIcon icon={faCircleCheck} className='p-6 bg-lightGreen rounded-2xl text-darkGreen text-2xl' />
        <p className='text-xl'>{repairedCount} potholes repaired</p>  
      </div>
      <div className='col-span-2 h-[250px] xl:h-[350px] overflow-y-auto'>
        <p className='text-right text-main font-bold '><button onClick={()=> navigate('/potholes')}>View Large</button></p>
        <PotholesTable onShowLocation={setMarkerPosition} />
      </div>
      <div className='col-span-1 bg-white shadow-inner shadow-black/30 rounded p-6 text-center text-main font-bold h-full'>
        <Map markerPosition={markerPosition} />
      </div>
    </div>
  )
}