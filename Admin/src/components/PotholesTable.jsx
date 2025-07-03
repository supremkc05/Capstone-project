import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function PotholesTable({ onShowLocation }) {
  const [data, setData] = useState([])

  const fetchDetections = () => {
    axios.get('http://localhost:3000/detections')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching detections:', err))
  }

  useEffect(() => {
    fetchDetections()
  }, [])

  const handleStatusChange = async (id, currentStatus) => {
    if (currentStatus === 'pending') {
      if (window.confirm('Do you want to change status to resolved?')) {
        try {
          await axios.patch(`http://localhost:3000/detections/${id}/status`, { status: 'resolved' })
          fetchDetections()
        } catch (err) {
          alert('Failed to update status')
        }
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this detection?')) {
      try {
        await axios.delete(`http://localhost:3000/detections/${id}`)
        fetchDetections()
      } catch (err) {
        alert('Failed to delete detection')
      }
    }
  }

  return (
    <div className="w-full">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item._id || idx} className="text-center">
              <td className="px-4 py-2">{item._id}</td>
              <td className="px-4 py-2">
                <button
                  className="p-2 rounded bg-blue-200 text-blue-800 hover:bg-blue-100"
                  onClick={() => onShowLocation([item.latitude, item.longitude])}
                >
                  Show
                </button>
              </td>
              <td className="px-4 py-2">{new Date(item.timestamp).toLocaleString()}</td>
              <td className={`px-4 py-2 font-bold`}>
                <button
                  className={`p-2 rounded-sm ${item.status === 'pending' ? 'text-darkRed bg-lightRed hover:bg-lightRed/50' : 'text-darkGreen bg-lightGreen hover:bg-lightGreen/50'}`}
                  onClick={() => handleStatusChange(item._id, item.status)}
                  disabled={item.status === 'resolved'}
                  style={{ cursor: item.status === 'pending' ? 'pointer' : 'not-allowed' }}
                >
                  {item.status}
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  className='p-2 rounded-sm text-darkRed bg-lightRed font-bold hover:bg-lightRed/50'
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}