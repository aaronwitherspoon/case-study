import { BanIcon, WifiIcon } from "@heroicons/react/solid"

// displays table of departure data 

function DepartureTable({props}) {
   //console.log(props);

   return (
      <div className='flex items-cent justify-center my-10'>
         <table className='sm:min-w-[80%] lg:min-w-[70%] xl:min-w-[50%] text-gray-600 text-xl bg-gray-100'>
            <thead>
               <tr className="">
                  <th colSpan={2} className="px-4 py-4 text-left text-3xl tracking-wider" data-testid="table-head-description">{props?.stops?.[0]?.description}</th>
                  <th colSpan={1} className="text-right pr-4" data-testid="table-head-stopid">Stop #: {props?.stops?.[0]?.stop_id}</th>
               </tr>
               <tr className="bg-yellow-300">
                  <th className="text-left px-4 py-4">ROUTE</th>
                  <th className="text-left py-4">DESTINATION</th>
                  <th className="text-right pr-4 py-4">DEPARTS</th>
               </tr>
            </thead>
            <tbody className="">
            {/* display departures if they exist, else display no departures message */}
            {props?.departures?.length ? 
               props?.departures?.map((stop, idx) => (
               <tr key={stop.trip_id} className="border-b border-gray-400">
                  <td className="px-4 py-4 whitespace-nowrap font-semibold" data-testid={`table-route-${idx}`}>
                     {stop.route_short_name}
                  </td>
                  <td className="py-4" data-testid={`table-destination-${idx}`}>
                     {stop.description}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right font-semibold" data-testid={`table-departs-${idx}`}>
                     {stop.schedule_relationship === "Skipped" && <div className='text-red-500'><BanIcon className="h-5 w-5 mb-1 inline" />Canceled</div>  }
                     {stop.actual && <WifiIcon className="h-5 w-5 text-blue-500 inline -rotate-45 animate-pulse-full" />}
                     <div className={stop.schedule_relationship ==="Skipped" ? 'text-red-500' : 'inline'}>{stop.departure_text}</div>
                  </td>
               </tr>
            )) : 
               <tr>
                  <td colSpan={3} className="px-4 py-4" data-testid="table-no-departures">
                     There are no departures at this time
                  </td>
               </tr>
            }
            </tbody>
         </table>
      </div>
   )
}

export default DepartureTable
