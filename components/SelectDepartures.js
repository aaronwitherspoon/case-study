import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DepartureTable from './DepartureTable';
import { SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';

function SelectDepartures() {
   const [selectedByRoute, setSelectedByRoute] = useState(true);
   const [routes, setRoutes] = useState([]);
   const [routeId, setRouteId] = useState("");
   const [directions, setDirections] = useState([]);
   const [directionId, setDirectionId] = useState("");
   const [stops, setStops] = useState([]);
   const [stopId, setStopId] = useState("");
   const [departures, setDepartures] = useState({});
   const [enteredStopId, setEnteredStopId] = useState("");
   const [isError, setIsError] = useState(false);
   const router = useRouter();

   useEffect(() => {
      axios.get("https://svc.metrotransit.org/nextripv2/routes")
         .then(res => {
            setRoutes(res.data)
         })
         .catch(error => {
            setIsError(true)
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
               setIsError(true)
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
               setIsError(true)
               console.log("stops err ", error)
            })
      }
   }, [directionId])

   const getDepartures = async () => {
      await axios.get(`https://svc.metrotransit.org/nextripv2/${routeId}/${directionId}/${stopId}`)
       .then(res => {
         setDepartures(res.data)
       }).catch(error => {
          setIsError(true)
         console.log("dep error: ", error)
       })
   }
 
    useEffect(() => {
      if (!stopId) {
         setDepartures({})
      }
      if (routeId && directionId && stopId) {
        getDepartures()
 
        const interval = setInterval(() => {
          getDepartures()
        }, 30000)
 
        return () => clearInterval(interval)
      }
    }, [stopId])

   const handleRouteSelect = (e) => {
      setRouteId(e.target.selectedOptions[0].value)
      setDirections([])
      setDirectionId("")
      setStops([])
      setStopId("")
      setDepartures({})
   }

   const handleDirectionSelect = (e) => {
      setDirectionId(e.target.selectedOptions[0].value)
      setStops([])
      setStopId("")
      setDepartures({})
   }

   const handleStopSelect = (e) => {
      setStopId(e.target.selectedOptions[0].value)
   }

   const handleInputChange = (e) => {
      setEnteredStopId(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      if (enteredStopId) {
         router.push(`/${enteredStopId}`)
      }
   }

   return (
      <div>

         <h1 className="text-3xl font-bold flex items-center justify-center mt-10 mb-10">
            Real-time Departures
         </h1>


         {isError ? (

         <div className='bg-red-200 text-red-700 border border-red-700 rounded-md w-[28rem] mx-auto'>
            <div className='flex flex-col items-center justify-center'>
               <p className='mt-4 font-semibold'>Something went wrong.</p>
               <p className='my-4 font-semibold'>Please try again later.</p>
            </div>
         </div>

         ) : (
         
         <div>

            <div>
               <ul className="flex items-center justify-center mb-10">
                     <li onClick={() => setSelectedByRoute(true)} className="mr-3">
                     <button type="button" className={`inline-block border text-xl font-bold rounded py-2 px-3 ${selectedByRoute ? "border-blue-500 bg-blue-500 text-white" : "border-blue-100 bg-blue-100 text-blue-600"}`}>By Route</button>
                     </li>
                     <li onClick={() => setSelectedByRoute(false)} className="">
                     <button type="button" className={`inline-block border text-xl font-bold rounded py-2 px-3 ${selectedByRoute ? "border-blue-100 bg-blue-100 text-blue-600" : "border-blue-500 bg-blue-500 text-white"}`}>By Stop #</button>
                     </li>
               </ul>
            </div>


            {selectedByRoute && 
            <div>
               <div className='flex items-center justify-center'>
                  <select className="select" onChange={handleRouteSelect} value={routeId}>
                     <option value="">Select Route</option>
                     {routes && routes.map(route => (
                        <option key={route.route_id} value={route.route_id}>{route.route_label}</option>
                     ))}
                  </select>
               </div>
               
               
               {routeId && directions &&
               <div className='flex items-center justify-center'>
                  <select className='select' onChange={handleDirectionSelect} value={directionId}>
                     <option value="">Select Direction</option>
                     {directions.map(dir => (
                        <option key={dir.direction_id} value={dir.direction_id}>{dir.direction_name}</option>
                     ))}
                  </select>
               </div>
               }
      
               
               {routeId && directionId &&
               <div className='flex items-center justify-center'>
                  <select className='select' onChange={handleStopSelect} value={stopId}>
                     <option value="">Select Stop</option>
                     {stops.map(stop => (
                        <option key={stop.place_code} value={stop.place_code}>{stop.description}</option>
                     ))}
                  </select>
               </div>
               }
            </div>
            }


            {!selectedByRoute && 
            <div className='flex items-center justify-center'>
               <form onSubmit={handleSubmit} className='relative'>
                  <input type="text" onChange={handleInputChange} value={enteredStopId} className='select w-[20rem]' placeholder='Enter stop #' />
                  <button type="submit" className='absolute top-2 right-2'>
                     <SearchIcon className='text-gray-400 h-8 w-8' />
                  </button>
               </form>
            </div>
            }


            {stopId && departures?.departures &&
            <DepartureTable props={ departures } />
            }

         </div>

         )}

      </div>
   )
}

export default SelectDepartures
