import Head from 'next/head'
import SelectDepartures from '../components/SelectDepartures'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Departures Case Study</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className='block'>
          <div className="flex items-center justify-center my-10">
            <h1 className="text-3xl font-bold">
              Real-time Departures
            </h1>
          </div>
        </div>

        <SelectDepartures />


      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">

      </footer>
    </div>
  )
}
