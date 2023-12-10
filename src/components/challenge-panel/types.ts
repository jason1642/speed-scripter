export interface IChallengeDisplayProps {
    stringGoal: string;
    userInput: string;
}

export interface IProgressStateProps {
    // Divide typed characters by 5
    wordsPerMinute: number;
    currentWord: number;
    resultString: string;
}

export type WordElementMapTypes = Array< {
    id: number;
    // character: string;
    content: string;
    // parentWord: string;
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

export type WordsTypes = Array<{
    content: string;
    index: number;

    
}>