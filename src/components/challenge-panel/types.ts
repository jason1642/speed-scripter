'use client'

export interface IChallengeDisplayProps {
    stringGoal: string;
    userInput: string;
    clearUserInput(): any;
    handleChangeErrorState(err: ErrorTypes): void;
}2

export interface ITimerProps { 
    totalSeconds: number;
    status: 'active' | 'stop' | 'end' | 'pause';
    timeElapsed: number;
}

export interface IProgressStateProps {
    // Divide typed characters by 5
    wordsPerMinute: number;
    currentWord: number;
    currentWordLetterIndex: number;
    charactersCorrect: number;
    resultString: string;
}

export type WordElementMapTypes = Array< {
    id: number;
    // character: string;
    content: string;
    // parentWord: string;
    elementArray: React.ReactElement[];
}>



export type ErrorTypes = {
    hasError: boolean;
    message?: string;
    errorFirstIndex?: number;
}

export type WordsTypes = Array<{
    content: string;
    index: number;

    
}>
