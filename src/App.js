import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import useStateInCustomProperties from "https://cdn.skypack.dev/use-state-in-custom-properties";
import $ from "jquery"

const timerMinutes = 1;
const timerSeconds = "00";
const letterArr = [];
let row1Arr = [];
let row2Arr = [];
let row3Arr = [];
let row4Arr = [];




class MyWordle extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
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
    window.reload(true);
  }
  
  setWordle = () => {
    const wordInput = document.getElementById("wordInput");
    const error = document.getElementById("error");
    const keyPad = document.getElementById("keyPad");
    const lettersOnly = /^[a-zA-Z]+$/;
    error.style.color = "red";
    
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
      keyPad.style.display = "flex";
      $('#playBtn').prop('disabled', true);
    }
  }
  
  handleChange = (event) => {
    
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
    
    //This function gets called every time the Enter key is pressed, assuming 5 letters have been entered. It either marks the letters are green, yellow, or gray. 
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
      winLoseMessage: "Congratulations, you won!"
    })
  }
  else if (this.state.currentRow === 4 && row4Arr.join("") !== this.state.wordle) {
    winLoseDiv.classList.add("show");
    this.setState({
      winLoseMessage: "Sorry, better luck next time.",
      score: 0
    })
    winLoseDiv.style.backgroundColor = "#e32d2d";
  }
  }
  
 helps = (event) => {
   const vowels = ["A", "E", "I", "O", "U"];
   const vowelsinword = this.state.wordle.split("").filter((letter) => {return vowels.includes(letter)});
   const randomVowel = Math.floor(Math.random() * vowelsinword.length)
   const consonantsinword = this.state.wordle.split("").filter((letter) => {return !vowels.includes(letter)});
   const randomConsonant = Math.floor(Math.random() * consonantsinword.length);
   
   const vowelHelpContainer = document.getElementById("vowelHelpContainer");
   const consonantHelpContainer = document.getElementById("consonantHelpContainer");
   const timeHelpContainer = document.getElementById("timeHelpContainer");
   if (this.state.wordle !== "") {
 switch (event.target.id) {
   case "vowelHelpContainer":
     vowelHelpContainer.innerHTML = vowelsinword[randomVowel];
      $("#vowelHelpContainer").prop("disabled",true);
     this.setState({
      score: this.state.score - 0.5
    });
     break;   
     case "consonantHelpContainer":
     consonantHelpContainer.innerHTML = consonantsinword[randomConsonant];
     $("#consonantHelpContainer").prop("disabled",true);
     this.setState({
      score: this.state.score - 0.5
    });
     break; 
     case "timeHelpContainer":
     timeHelpContainer.innerHTML = "30";
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
      <div id="wordleBox">
        
        <h2>Wordle 2.0</h2>
        <p>Enter a 5 characeter word and click "Play".</p>
        <p id="error"></p>
        <input id="wordInput" type="text" placeholder="Enter a 5 character word"></input>
        <button id="playBtn" onClick={this.setWordle}>Play</button><h1 id="timer">{`${timerMinutes}:${timerSeconds}`}</h1>
        <h3 id="hints">Helps</h3>
        <div id="helpsContainer">
          <button id="vowelHelpContainer" class="helpsContainers" onClick={this.helps}>Vowel</button>
          <button id="consonantHelpContainer" class="helpsContainers" onClick={this.helps}>Consonant</button>
          <button id="timeHelpContainer" class="helpsContainers" onClick={this.helps}>30 Seconds</button>
          </div>
        <div id="lettersContainer">
          <div id="r1l1" class="letters">{this.state.row1Letters[0]}</div>
          <div id="r1l2" class="letters">{this.state.row1Letters[1]}</div>
          <div id="r1l3" class="letters">{this.state.row1Letters[2]}</div>
          <div id="r1l4" class="letters">{this.state.row1Letters[3]}</div>
          <div id="r1l5" class="letters">{this.state.row1Letters[4]}</div>
          <div id="r2l1" class="letters">{this.state.row2Letters[0]}</div>
          <div id="r2l2" class="letters">{this.state.row2Letters[1]}</div>
          <div id="r2l3" class="letters">{this.state.row2Letters[2]}</div>
          <div id="r2l4" class="letters">{this.state.row2Letters[3]}</div>
          <div id="r2l5" class="letters">{this.state.row2Letters[4]}</div>
          <div id="r3l1" class="letters">{this.state.row3Letters[0]}</div>
          <div id="r3l2" class="letters">{this.state.row3Letters[1]}</div>
          <div id="r3l3" class="letters">{this.state.row3Letters[2]}</div>
          <div id="r3l4" class="letters">{this.state.row3Letters[3]}</div>
          <div id="r3l5" class="letters">{this.state.row3Letters[4]}</div>
          <div id="r4l1" class="letters">{this.state.row4Letters[0]}</div>
          <div id="r4l2" class="letters">{this.state.row4Letters[1]}</div>
          <div id="r4l3" class="letters">{this.state.row4Letters[2]}</div>
          <div id="r4l4" class="letters">{this.state.row4Letters[3]}</div>
          <div id="r4l5" class="letters">{this.state.row4Letters[4]}</div>
        </div>
        <div id="keyPad">
          <div id="q" class="keys" onClick={this.handleChange}>Q</div>
          <div id="w" class="keys" onClick={this.handleChange}>W</div>
          <div id="e" class="keys" onClick={this.handleChange}>E</div>
          <div id="r" class="keys" onClick={this.handleChange}>R</div>
          <div id="t" class="keys" onClick={this.handleChange}>T</div>
          <div id="y" class="keys" onClick={this.handleChange}>Y</div>
          <div id="u" class="keys" onClick={this.handleChange}>U</div>
          <div id="i" class="keys" onClick={this.handleChange}>I</div>
          <div id="o" class="keys" onClick={this.handleChange}>O</div>
          <div id="p" class="keys" onClick={this.handleChange}>P</div>
          <div id="a" class="keys" onClick={this.handleChange}>A</div>
          <div id="s" class="keys" onClick={this.handleChange}>S</div>
          <div id="d" class="keys" onClick={this.handleChange}>D</div>
          <div id="f" class="keys" onClick={this.handleChange}>F</div>
          <div id="g" class="keys" onClick={this.handleChange}>G</div>
          <div id="h" class="keys" onClick={this.handleChange}>H</div>
          <div id="j" class="keys" onClick={this.handleChange}>J</div>
          <div id="k" class="keys" onClick={this.handleChange}>K</div>
          <div id="l" class="keys" onClick={this.handleChange}>L</div>
          <div id="enter" class="keys" onClick={this.submitWord}>Enter</div>
          <div id="z" class="keys" onClick={this.handleChange}>Z</div>
          <div id="x" class="keys" onClick={this.handleChange}>X</div>
          <div id="c" class="keys" onClick={this.handleChange}>C</div>
          <div id="v" class="keys" onClick={this.handleChange}>V</div>
          <div id="b" class="keys" onClick={this.handleChange}>B</div>
          <div id="n" class="keys" onClick={this.handleChange}>N</div>
          <div id="m" class="keys" onClick={this.handleChange}>M</div>
          <div id="delete" class="keys" onClick={this.deleteLetter}>[<span id="redX">x</span>]</div>
        </div>
      </div>
  </div>
      
  
  );

  }

};

ReactDOM.render(<MyWordle/>, document.getElementById('root'));