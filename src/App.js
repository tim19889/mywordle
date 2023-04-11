import logo from './logo.svg';
import './App.css';

import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import useStateInCustomProperties from "https://cdn.skypack.dev/use-state-in-custom-properties";
import $ from "jquery"

let runStatus = 0;
let interval;
const letterArr = [];
let row1Arr = [];
let row2Arr = [];
let row3Arr = [];
let row4Arr = [];
 let winLoseDiv = document.getElementById("winLoseDiv");

class MyWordle extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      timerMinutes: "01",
      timerSeconds: "00",
      wordle: "",
      row1Letters: [],
      row2Letters: [],
      row3Letters: [],
      row4Letters: [],
      currentRow: 1,
      winLoseMessage: "",
      score: 10
    }
    
    this.restart = this.restart.bind(this);
    this.setWordle = this.setWordle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitWord = this.submitWord.bind(this);
    this.deleteLetter = this.deleteLetter.bind(this);
    this.helps = this.helps.bind(this);
  }
  
  restart = () => {
    window.location.reload(true);
  }
  
  setWordle = () => {
    const wordInput = document.getElementById("wordInput");
    const error = document.getElementById("error");
    const keyPad = document.getElementById("keyPad");
    const lettersOnly = /^[a-zA-Z]+$/;
   
	
    const runTimer = () => {
     if (this.state.timerMinutes === "01" && this.state.timerSeconds === "00") {
    this.setState({timerMinutes: "00"});
  }
  
  if (this.state.timerSeconds === "00") {
    this.setState({timerSeconds: 59});
  } else if (parseInt(this.state.timerSeconds) <= 10) {
    this.setState({timerSeconds: "0" + (parseInt(this.state.timerSeconds) - 1)});
  } else {
    this.setState({timerSeconds: this.state.timerSeconds - 1});
  }
      
      if (this.state.timerMinutes === "00" && this.state.timerSeconds === "00") {
        clearInterval(interval);
        interval = undefined;
        document.getElementById("winLoseDiv").classList.add("show");
    this.setState({
      winLoseMessage: `Time's up! Sorry, better luck next time. Wordle = ${this.state.wordle}`,
      score: 0
    })
   
      }
    
  }
    
    if (error.innerHTML.length > 0) {error.innerHTML = ""}
    
    if (wordInput.value.length !== 5) {
      error.innerHTML = "Enter a word exactly 5 characters long."
    }
    else if (lettersOnly.test(wordInput.value) === false) {
      error.innerHTML = "Only letters are allowed. Please try again."
    }
    else {
    this.setState({
      wordle: wordInput.value.toUpperCase()
    })
      error.style.color = "blue";
      error.innerHTML = "Success. Wordle has been set."
      wordInput.value = "";
      keyPad.style.zIndex = "0";
      runStatus = 1;
      $('#playBtn').prop('disabled', true);
      
    }
    
    if (interval === undefined && runStatus === 1) {
    interval = setInterval(function() {
      runTimer()
    }, 300)
    }
    
  }
  
  handleChange = (event) => {
    if (this.state.wordle !== "") {
    switch (this.state.currentRow) {
      case 1:    
    letterArr.push(event.target.innerHTML);
    this.setState({
      row1Letters: letterArr
    });
        if (letterArr.length > 5) {letterArr.pop()}
     break;
      case 2:
        letterArr.push(event.target.innerHTML);
    this.setState({
      row2Letters: letterArr
    });
        if (letterArr.length > 5) {letterArr.pop()}
        break;
      case 3:
        letterArr.push(event.target.innerHTML);
    this.setState({
      row3Letters: letterArr
    });
        if (letterArr.length > 5) {letterArr.pop()}
        break;
      case 4:
        letterArr.push(event.target.innerHTML);
    this.setState({
      row4Letters: letterArr
    });
        if (letterArr.length > 5) {letterArr.pop()}
        break;
          
    }
    }
  
  }
  
  deleteLetter() {
  letterArr.pop();
    switch (this.state.currentRow) {
      case 1:    
    this.setState({
      row1Letters: letterArr
    });
     break;
      case 2:
    this.setState({
      row2Letters: letterArr
    });
        break;
      case 3:
    this.setState({
      row3Letters: letterArr
    });
        break;
      case 4:
    this.setState({
      row4Letters: letterArr
    });
        break;     
    }
  }
  
  submitWord = () => {
    const winLoseDiv = document.getElementById("winLoseDiv");
    const winLoseMessage = document.getElementById("winLoseMessage");
    
    //This function gets called every time the Enter key is pressed, assuming 5 letters have been entered. It either marks the letters as green, yellow, or gray. 
    if (this.state.wordle !== "") {
    function setLetterBackground(currentLetterArr, wordle, currentRow) {
      for (let i = 0; i < currentLetterArr.length; i++) {
       
       if (currentLetterArr[i] === wordle[i]) {  document.getElementById(`r${currentRow}l${i+1}`).style.backgroundColor = "green";
        }
        else if (wordle.split("").includes(currentLetterArr[i])) {
         document.getElementById(`r${currentRow}l${i+1}`).style.backgroundColor = "yellow"; 
        }
        else {
         document.getElementById(`r${currentRow}l${i+1}`).style.backgroundColor = "gray";  
        }
      }
    }
    
    
  if (letterArr.length === 5 && this.state.currentRow === 1) {
    row1Arr.push(...letterArr);
   setLetterBackground(row1Arr, this.state.wordle, this.state.currentRow);
    this.setState({
      currentRow: 2,
      row1Letters: row1Arr
    });
   letterArr.splice(0)
  }
    else if (letterArr.length === 5 && this.state.currentRow === 2) {
    row2Arr.push(...letterArr);
      setLetterBackground(row2Arr, this.state.wordle, this.state.currentRow);
    this.setState({
      currentRow: 3,
      row2Letters: row2Arr,
      score: this.state.score -1
    });
   letterArr.splice(0) 
  }
  else if (letterArr.length === 5 && this.state.currentRow === 3) {
    row3Arr.push(...letterArr);
    setLetterBackground(row3Arr, this.state.wordle, this.state.currentRow);
    this.setState({
      currentRow: 4,
      row3Letters: row3Arr,
      score: this.state.score -1
    });
   letterArr.splice(0) 
  }
    else if (letterArr.length === 5 && this.state.currentRow === 4) {
    row4Arr.push(...letterArr);
      setLetterBackground(row4Arr, this.state.wordle, this.state.currentRow);
    this.setState({
      currentRow: 5,
      row4Letters: row4Arr,
      score: this.state.score -1
    });
   letterArr.splice(0) 
  }
  
  if (row1Arr.join("") === this.state.wordle || row2Arr.join("") === this.state.wordle || row3Arr.join("") === this.state.wordle || row4Arr.join("") === this.state.wordle) {
   winLoseDiv.classList.add("show");
    this.setState({
      winLoseMessage: `Congratulations, you won! Wordle = ${this.state.wordle}`
    })
    winLoseDiv.style.backgroundColor = "lightgreen";
    clearInterval(interval)
    interval = undefined;
  }
  else if (this.state.currentRow === 4 && row4Arr.join("") !== this.state.wordle) {
    winLoseDiv.classList.add("show");
    this.setState({
      winLoseMessage: `Sorry, better luck next time. Wordle = ${this.state.wordle}`,
      score: 0
    })
    winLoseDiv.style.backgroundColor = "#e32d2d";
    clearInterval(interval);
    interval = undefined;
  }
    }
  }
  
 helps = (event) => {
   const allPlayedLettersArr = row1Arr.concat(row2Arr).concat(row3Arr).concat(row4Arr);
   console.log(allPlayedLettersArr)
   const vowels = ["A", "E", "I", "O", "U"];
   const vowelsinword = this.state.wordle.split("").filter((letter) => {return vowels.includes(letter) && !allPlayedLettersArr.includes(letter)});
   const randomVowel = Math.floor(Math.random() * vowelsinword.length)
   const consonantsinword = this.state.wordle.split("").filter((letter) => {return !vowels.includes(letter) && !allPlayedLettersArr.includes(letter)});
   const randomConsonant = Math.floor(Math.random() * consonantsinword.length);
   
   const vowelHelpContainer = document.getElementById("vowelHelpContainer");
   const consonantHelpContainer = document.getElementById("consonantHelpContainer");
   const timeHelpContainer = document.getElementById("timeHelpContainer");
   
   if (this.state.wordle !== "") {
 switch (event.target.id) {
   case "vowelHelpContainer":
     vowelsinword[randomVowel] === undefined ? vowelHelpContainer.innerHTML = "No unplayed vowels" : vowelHelpContainer.innerHTML = vowelsinword[randomVowel];
      $("#vowelHelpContainer").prop("disabled",true);
     this.setState({
      score: this.state.score - 0.5
    });
     break;   
     case "consonantHelpContainer":
     consonantsinword[randomConsonant] === undefined ? consonantHelpContainer.innerHTML = "No unplayed consonants" : consonantHelpContainer.innerHTML = consonantsinword[randomConsonant];
     $("#consonantHelpContainer").prop("disabled",true);
     this.setState({
      score: this.state.score - 0.5
    });
     break; 
     case "timeHelpContainer":
     if (this.state.timerSeconds < 10) {this.setState({timerSeconds: parseInt(this.state.timerSeconds[1]) + 30})}
    if (this.state.timerSeconds < 30 && this.state.timerSeconds > 9) {this.setState({timerSeconds: this.state.timerSeconds + 30})}
     if (this.state.timerSeconds >= 31) {this.setState({timerMinutes: "01", timerSeconds: this.state.timerSeconds + 30 - 60})}
     if (this.state.timerSeconds === 30) {this.setState({timerMinutes: "00", timerSeconds: this.state.timerSeconds + 30 - 60})}
     $("#timeHelpContainer").prop("disabled",true);
     this.setState({
      score: this.state.score - 0.5
    });
     break; 
 }
   }
 }
  
  
  
render() 
  
  {
    
  return (
 
  <div id="mainContainer">
      <div id="winLoseDiv">
        <h1 id="winLoseMessage">{this.state.winLoseMessage}</h1>
        <h2 id="scoreMessage">{`Your final score is ${this.state.score} out of 10.`}</h2>
        <button id="playAgain" onClick={this.restart}>Play Again</button>
 </div>
	<div id="flexContainer">
      <div id="wordleBox">
        
        <h2 id="title">Wordle 2.0</h2>
        <p id="instructions">Enter a 5 characeter word and click "Play".</p>
        <p id="error"></p>
        <input id="wordInput" type="text" placeholder="Enter a 5 character word" autoComplete="off"></input>
        <button id="playBtn" onClick={this.setWordle}>Play</button>
        
   <h1 id="timer">{`${this.state.timerMinutes}:${this.state.timerSeconds}`}</h1>
        <h3 id="hints">Helps</h3>
        <div id="helpsContainer">
          <button id="vowelHelpContainer" className="helpsContainers" onClick={this.helps}>Vowel</button>
          <button id="consonantHelpContainer" className="helpsContainers" onClick={this.helps}>Consonant</button>
          <button id="timeHelpContainer" className="helpsContainers" onClick={this.helps}>30 Seconds</button>
          </div>
        <div id="lettersContainer">
          <div id="r1l1" className="letters">{this.state.row1Letters[0]}</div>
          <div id="r1l2" className="letters">{this.state.row1Letters[1]}</div>
          <div id="r1l3" className="letters">{this.state.row1Letters[2]}</div>
          <div id="r1l4" className="letters">{this.state.row1Letters[3]}</div>
          <div id="r1l5" className="letters">{this.state.row1Letters[4]}</div>
          <div id="r2l1" className="letters">{this.state.row2Letters[0]}</div>
          <div id="r2l2" className="letters">{this.state.row2Letters[1]}</div>
          <div id="r2l3" className="letters">{this.state.row2Letters[2]}</div>
          <div id="r2l4" className="letters">{this.state.row2Letters[3]}</div>
          <div id="r2l5" className="letters">{this.state.row2Letters[4]}</div>
          <div id="r3l1" className="letters">{this.state.row3Letters[0]}</div>
          <div id="r3l2" className="letters">{this.state.row3Letters[1]}</div>
          <div id="r3l3" className="letters">{this.state.row3Letters[2]}</div>
          <div id="r3l4" className="letters">{this.state.row3Letters[3]}</div>
          <div id="r3l5" className="letters">{this.state.row3Letters[4]}</div>
          <div id="r4l1" className="letters">{this.state.row4Letters[0]}</div>
          <div id="r4l2" className="letters">{this.state.row4Letters[1]}</div>
          <div id="r4l3" className="letters">{this.state.row4Letters[2]}</div>
          <div id="r4l4" className="letters">{this.state.row4Letters[3]}</div>
          <div id="r4l5" className="letters">{this.state.row4Letters[4]}</div>
        </div>
        
        <div id="keyPad">
         
          <div id="q" className="keys" onClick={this.handleChange}>Q</div>
          <div id="w" className="keys" onClick={this.handleChange}>W</div>
          <div id="e" className="keys" onClick={this.handleChange}>E</div>
          <div id="r" className="keys" onClick={this.handleChange}>R</div>
          <div id="t" className="keys" onClick={this.handleChange}>T</div>
          <div id="y" className="keys" onClick={this.handleChange}>Y</div>
          <div id="u" className="keys" onClick={this.handleChange}>U</div>
          <div id="i" className="keys" onClick={this.handleChange}>I</div>
          <div id="o" className="keys" onClick={this.handleChange}>O</div>
          <div id="p" className="keys" onClick={this.handleChange}>P</div>
          
          <div id="a" className="keys" onClick={this.handleChange}>A</div>
          <div id="s" className="keys" onClick={this.handleChange}>S</div>
          <div id="d" className="keys" onClick={this.handleChange}>D</div>
          <div id="f" className="keys" onClick={this.handleChange}>F</div>
          <div id="g" className="keys" onClick={this.handleChange}>G</div>
          <div id="h" className="keys" onClick={this.handleChange}>H</div>
          <div id="j" className="keys" onClick={this.handleChange}>J</div>
          <div id="k" className="keys" onClick={this.handleChange}>K</div>
          <div id="l" className="keys" onClick={this.handleChange}>L</div>
          
          <div id="enter" className="keys" onClick={this.submitWord}>Enter</div>
          <div id="z" className="keys" onClick={this.handleChange}>Z</div>
          <div id="x" className="keys" onClick={this.handleChange}>X</div>
          <div id="c" className="keys" onClick={this.handleChange}>C</div>
          <div id="v" className="keys" onClick={this.handleChange}>V</div>
          <div id="b" className="keys" onClick={this.handleChange}>B</div>
          <div id="n" className="keys" onClick={this.handleChange}>N</div>
          <div id="m" className="keys" onClick={this.handleChange}>M</div>
          <div id="delete" className="keys" onClick={this.deleteLetter}>[<span id="redX">x</span>]</div>
        </div>
      </div>
	  </div>
  </div>
      
  
  );

  }

};

ReactDOM.render(<MyWordle/>, document.getElementById('root'));

export default MyWordle;


