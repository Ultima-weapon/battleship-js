/* -----------------------------------------------------------------------------
 *
 * File Name: audio.js
 * Author: Team 7
 * Assignment: EECS 448 - Project 2
 * Description: Sound Functionality
 * Date: 14 Mar 2020
 *
 ---------------------------------------------------------------------------- */
 
/**
* @pre None
* @post FUNCTION [sound(src)]: Creates an audio playback event
* @param src, string representing the audio source file path.
* @return None
**/
function sound(src){
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload","auto");
	this.sound.setAttribute("controls","none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){ this.sound.play(); console.log("Sound Triggered: " + src) };
	this.stop = function(){ this.sound.pause(); console.log("Sound Paused: " + src) };
}

// Create playback events for each audio file.
let soundHit = new sound("audio/hit.mp3");
let soundSunk = new sound("audio/sunk.mp3");
let soundMiss = new sound("audio/miss.mp3");
let soundPlayer1Turn = new sound("audio/player1turn.mp3");
let soundPlayer2Turn = new sound("audio/player2turn.mp3");
let soundPlayer1Win = new sound("audio/player1win.mp3");
let soundPlayer2Win = new sound("audio/player2win.mp3");