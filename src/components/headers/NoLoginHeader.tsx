'use client'
import Link from 'next/link';
import * as React from 'react';


const linkStyles = 'px-4'

interface INoLoginHeaderProps {
}

const NoLoginHeader: React.FunctionComponent<INoLoginHeaderProps> = () => {
  return (
    <div className='flex width-full justify-between text-gray-100 text-3xl p-3 bg-blue-600'>
    <h1 className='inline-block'>      
            Speed Scripter
        </h1>


        <div className='inline-block'>

     <Link 
     className={`${linkStyles}`}
            href={'/practice'}
        >
            Practice
        </Link>
        <Link className={`${linkStyles}`}
            href={'/challenge'}
        >
            Challenge
        </Link>
        <Link 
        className={`${linkStyles}`}
            href={'/'}
        >
            Home
        </Link>
        </div>
    
    </div>
  );
};

export default NoLoginHeader;
