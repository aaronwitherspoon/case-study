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
        <div className=''>
          <SelectDepartures />
        </div>
      </main>

    </div>
  )
}
