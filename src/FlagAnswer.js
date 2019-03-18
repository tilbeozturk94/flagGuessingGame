import React, {Component} from 'react';
import StyledButton from './StyledButton';
import "./FlagAnswer.css";

const FlagAnswer = ({correct, answer, onNext}) => (
    <div className="flag-answer">
    {
        correct ? 
        `Correct! ${answer}`
        :
        `Incorrect! The correct answer is ${answer}`
    }
    <StyledButton onClick={onNext} text="Next"/>
    </div>
    );
    
    
export default FlagAnswer;