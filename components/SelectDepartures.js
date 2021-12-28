import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DepartureTable from './DepartureTable';

function SelectDepartures() {
   const [routes, setRoutes] = useState([]);
   const [routeId, setRouteId] = useState("");
   const [directions, setDirections] = useState([]);
   const [directionId, setDirectionId] = useState("");
   const [stops, setStops] = useState([]);
   const [stopId, setStopId] = useState("");
   const [departures, setDepartures] = useState({});

   useEffect(() => {
      axios.get("https://svc.metrotransit.org/nextripv2/routes")
         .then(res => {
            setRoutes(res.data)
         })
         .catch(error => {
            console.log("routes err ", error)
         })
   }, [])

   useEffect(() => {
      if (routeId) {
         axios.get(`https://svc.metrotransit.org/nextripv2/directions/${routeId}`)
            .then(res => {
               setDirections(res.data)
            })
            .catch(error => {
               console.log("dir err ", error)
            })
      }
   }, [routeId])

   useEffect(() => {
      if (routeId && directionId) {
         axios.get(`https://svc.metrotransit.org/nextripv2/stops/${routeId}/${directionId}`)
            .then(res => {
               setStops(res.data)
            })
            .catch(error => {
               console.log("stops err ", error)
            })
      }
   }, [directionId])

   useEffect(() => {
      if (routeId && directionId && stopId) {
         axios.get(`https://svc.metrotransit.org/nextripv2/${routeId}/${directionId}/${stopId}`)
            .then(res => {
               setDepartures(res.data)
            })
            .catch(error => {
               console.log("stopinfo err ", error)
            })
      }
   }, [stopId])

   const handleRouteSelect = (e) => {
      setRouteId(e.target.selectedOptions[0].value)
   }

   const handleDirectionSelect = (e) => {
      setDirectionId(e.target.selectedOptions[0].value)
   }

   const handleStopSelect = (e) => {
      setStopId(e.target.selectedOptions[0].value)
   }

   return (
      <div>

         <div className='flex items-center justify-center'>
            <select className="select" onChange={handleRouteSelect}>
               <option value="">Select Route</option>
               {routes && routes.map(route => (
                  <option key={route.route_id} value={route.route_id}>{route.route_label}</option>
               ))}
            </select>
         </div>
         
         
         {routeId && directions &&
         <div className='flex items-center justify-center'>
            <select className='select' onChange={handleDirectionSelect}>
               <option value="">Select Direction</option>
               {directions.map(dir => (
                  <option key={dir.direction_id} value={dir.direction_id}>{dir.direction_name}</option>
               ))}
            </select>
         </div>
         }

         
         {routeId && directionId &&
         <div className='flex items-center justify-center'>
            <select className='select' onChange={handleStopSelect}>
               <option value="">Select Stop</option>
               {stops.map(stop => (
                  <option key={stop.place_code} value={stop.place_code}>{stop.description}</option>
               ))}
            </select>
         </div>
         }


         {departures?.departures &&
         <DepartureTable props={ departures } />
         }

      </div>
   )
}

export default SelectDepartures
