'use client'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'


export default function Home() {



  return (
    <React.Fragment>
    <Head>
      <title>Speed Scripter</title> 
    </Head>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    <div>
        <p >
          ⚡ TypeRally ⚡ This is the home page, will have links to go to practice mode or page to select which race you want to do
          <br></br>
          {/* <Link href="/next">
            Go to next page
          </Link> */}
          <div className='flex border w-auto p-4'>

                <Link 
                className='w-auto p-4 bg-sky-500 rounded hover:bg-sky-400'
                 href="/practice">
            Practice Mode
          </Link>
          </div>
      
          {/* <Link href="/challenges">
            Challenge Mode
          </Link> */}
        </p>




    {/* <Timer seconds={5}/> */}
      
      </div>
    </main>
    </React.Fragment>

  )
}
