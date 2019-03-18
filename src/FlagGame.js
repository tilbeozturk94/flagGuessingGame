import React, {Component} from 'react';
import Navbar from "./Navbar";
import "./FlagGame.css";
import CountryGame from "./CountryGame";

export default class FlagGame extends Component {
    
        render(){
        return(
            <div className="flag-app">
            <Navbar/>
            <CountryGame />    
            </div>
        );
    }
}