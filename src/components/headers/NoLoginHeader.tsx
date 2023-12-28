'use client'
import Link from 'next/link';
import * as React from 'react';



interface INoLoginHeaderProps {
}

const NoLoginHeader: React.FunctionComponent<INoLoginHeaderProps> = () => {
  return (
    <div className='flex-1 text-5xl'>
        This is the header



        <Link 
            href={'/practice'}
        >
            Practice
        </Link>
        <Link 
            href={'/challenge'}
        >
            Challenge
        </Link>
        <Link 
            href={'/'}
        >
            Home
        </Link>
    </div>
  );
};

export default NoLoginHeader;
