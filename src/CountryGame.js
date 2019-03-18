import React, {Component} from 'react';
import shuffle from "shuffle-array";
import FlagQuestion, {QuestionStates} from './FlagQuestion.js';

class CountryGame extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            options: [],
            correctOption: undefined,
            questionState: undefined,
        };
        this.onGuess = this.onGuess.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    
    componentDidMount(){
      fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then((countries) => {
        const correctOption = Math.floor(Math.random() * countries.length);
        const options = this._getOptions(correctOption, countries);
        this.setState({
          countries,
          options,
          correctOption,
          questionState: QuestionStates.QUESTION
        });
      })
      .catch(console.warn);
    }
    
    _getOptions(correctOption, countries){
      let options = [correctOption];
      var i = 0;
      
      while(options.length < 4 && i < 20){
        let rnd = Math.floor(Math.random() * countries.length);
        
        if(rnd !== correctOption) {
          options.push(rnd);
        }
        else {
          i++;
        }
      }
      return shuffle(options);
    }
    
    onGuess(answer){
      const {correctOption} = this.state;
      let questionState = answer === correctOption ? QuestionStates.ANSWER_CORRECT : QuestionStates.ANSWER_WRONG;
      this.setState({questionState});
    }
    
    nextQuestion(){
      const {countries} = this.state;
      const correctOption = Math.floor(Math.random() * countries.length);
      const options = this._getOptions(correctOption, countries);
      this.setState({
        countries,
        options,
        correctOption,
        questionState: QuestionStates.QUESTION
      });
    }
    
    render(){
      let { countries,
            options,
            correctOption,
            questionState} = this.state;
            let output = <div>Loading...</div>;
            if(correctOption !== undefined) {
              const{name, flag} = countries[correctOption];
              let opts = options.map((opt) => {
                return {
                  id: opt,
                  name: countries[opt].name
                };
              });
              output = (
                <FlagQuestion
                  flag = {flag}
                  questionState = {questionState}
                  options = {opts}
                  answerText= {name}
                  onNext = {this.nextQuestion}
                  onGuess = {this.onGuess}
                />
                );
            }
            
        return(<div style={{marginTop: "15px"}}>
                {output}
                </div>
        );
    }
    
    
    
}




export default CountryGame;