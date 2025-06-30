import React, { useEffect, useState } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import PotholesTable from '../components/PotholesTable'

export default function Potholes() {
  const [allCoords, setAllCoords] = useState([])
  const [markerPosition, setMarkerPosition] = useState([27.7326197, 85.380883])
  const [viewAll, setViewAll] = useState(true)
  const [detections, setDetections] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')

  // Fetch all detections
  useEffect(() => {
    axios.get('http://localhost:3000/detections')
      .then(res => {
        setDetections(res.data)
        setAllCoords(res.data.map(d => [d.latitude, d.longitude]))
      })
      .catch(() => {
        setDetections([])
        setAllCoords([])
      })
  }, [])

  // Filtered detections for table
  const filteredDetections = statusFilter === 'all'
    ? detections
    : detections.filter(d => d.status === statusFilter)

  // For map markers (all or filtered)
  const filteredCoords = statusFilter === 'all'
    ? allCoords
    : detections.filter(d => d.status === statusFilter).map(d => [d.latitude, d.longitude])

  // Handle "Show" from table
  const handleShowLocation = (pos) => {
    setMarkerPosition(pos)
    setViewAll(false)
  }

  // Handle "View All" on map
  const handleViewAll = () => {
    setViewAll(true)
  }

  return (
    <div className="w-full h-screen flex flex-col gap-15">
      {/* Map on top, full width, half height */}
      <div className="w-full p-5" style={{ height: '50vh' }}>
        <div className="flex justify-end p-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={handleViewAll}
          >
            View All
          </button>
          <select
            className="px-2 py-1 border rounded"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <Map
          markerPosition={markerPosition}
          allCoords={filteredCoords}
          viewAll={viewAll}
        />
      </div>
      {/* Table on bottom, half height */}
      <div className="w-full overflow-y-auto" style={{ height: '50vh' }}>
        <PotholesTable
          onShowLocation={handleShowLocation}
          data={filteredDetections}
          fetchDetections={() => {
            axios.get('http://localhost:3000/detections')
              .then(res => {
                setDetections(res.data)
                setAllCoords(res.data.map(d => [d.latitude, d.longitude]))
              })
          }}
        />
      </div>
    </div>
  )
}