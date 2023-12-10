export interface IChallengeDisplayProps {
    stringGoal: string;
    userInput: string;
}

export interface IProgressStateProps {
    currentIndex: number;
    // Divide typed characters by 5
    wordsPerMinute: number;
}

export type challengeTypes = Array< {
    id: number;
    character: string;
    element: React.ReactElement;
}>

export interface ITimerProps {
    timeElapsed: number;
    state: 'active' | 'paused' | 'stop';
}

export type ErrorTypes = {
    hasError: boolean;
    message?: string;
    errorFirstIndex?: number;
}

export type WordsTypes = {
    content: string;
    
}