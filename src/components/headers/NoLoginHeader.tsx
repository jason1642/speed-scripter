'use client'
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  font-size: 3em;
`;

interface INoLoginHeaderProps {
}

const NoLoginHeader: React.FunctionComponent<INoLoginHeaderProps> = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default NoLoginHeader;
