'use client'
import * as React from 'react';
import styled from 'styled-components';
import { ErrorTypes } from './types';


const Container = styled.div`
  display:flex;
  color: red;
  height: 25px;
`;
interface IErrorMessageProps {
    errorState: ErrorTypes
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = ({errorState}) => {
  return (
    <Container>
              {errorState.hasError ? `Message: ${errorState.message}` : ''}

    </Container>
  );
};

export default ErrorMessage;
 