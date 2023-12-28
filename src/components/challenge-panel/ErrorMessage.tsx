'use client'
import * as React from 'react';
import { ErrorTypes } from './types';

interface IErrorMessageProps {
    errorState: ErrorTypes
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = ({errorState}) => {
  return (
    <div className='flex-1 text-red-700 h-1.5'>
              {errorState.hasError ? `Message: ${errorState.message}` : ''}

    </div>
  );
};

export default ErrorMessage;
 