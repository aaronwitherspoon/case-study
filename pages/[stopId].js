import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DepartureTable from '../components/DepartureTable'

export async function getServerSideProps(context) {
   
   const response = await fetch(`https://svc.metrotransit.org/nextripv2/${context.params.stopId}`)
   const data = await response.json().catch(error => {})

   if (!data) {
      return {
         notFound: true
      }
   }

   return {
      props: {
         departureInfo: data
      }
   }
}

function StopId(props) {
   const {departureInfo} = props;
   const [stopId, setStopId] = useState("");
   const [departures, setDepartures] = useState({});
   const router = useRouter();

   useEffect(() => {
      setStopId(router.query.stopId)
   }, [stopId])

   useEffect(() => {
      setDepartures(departureInfo)
   }, [departureInfo])

   const getDepartures = async () => {
      await axios.get(`https://svc.metrotransit.org/nextripv2/${stopId}`)
       .then(res => {
         setDepartures(res.data)
       }).catch(error => {
         if (error.response.data.detail === "Invalid Stop ID" || error.response.data.status === 400) {
            setDepartures({ "stops": [{"description": `Invalid Stop #`, "stop_id": `${stopId}`}], "departures": []})
         } else {
            setDepartures({ "stops": [{"description": "Something went wrong. Try again later"}], "departures": []})
         }
         console.log("dir error: ", error.response.data)
       })
   }
 
   useEffect(() => {
      if (stopId) {
         getDepartures()

         const interval = setInterval(() => {
            getDepartures()
         }, 30000)

         return () => clearInterval(interval)
      }
   }, [stopId])

   return (
      <div>
         <h1 className='flex items-center justify-center text-3xl font-bold mt-10'>Real-time Departures</h1>

         <DepartureTable props={departures} />

         <div className='flex text-center justify-center mb-10'>
            <Link href={'/'}><a>Home</a></Link>
         </div>

      </div>
   )
}

export default StopId
