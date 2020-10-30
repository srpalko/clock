/* This is the main clock component of the app. 
It includes both the session and break setting controls and the countdown timer itself. */

import React, { useState } from 'react';
import ReactFCCtest from 'react-fcctest';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementSession,
  decrementSession,
  incrementBreak,
  decrementBreak,
  reset,
  countdown,
  zeroAlarm,
  selectSessionLength,
  selectBreakLength,
  selectDisplay,
  selectRunning,
  selectStarted,
  selectCurrentInterval,
  selectAlarmPlaying,
  selectReset,
  stopTimer,
  restart,
  startTimer,
  setNextInterval,
} from './clockSlice';
import styles from './Counter.module.css';
import alarm from './short_alarm.mp3';



export function Clock() {
  const sessionL = useSelector(selectSessionLength);
  const breakL = useSelector(selectBreakLength);
  const timer = useSelector(selectDisplay);
  const running = useSelector(selectRunning);
  const started = useSelector(selectStarted);
  const currentInterval = useSelector(selectCurrentInterval);
  const alarmPlaying = useSelector(selectAlarmPlaying);
  const isReset = useSelector(selectReset);

  const dispatch = useDispatch();

  const currentIntervalDisplay = currentInterval === "session" ? "Session" : "Break";

  let audio = document.getElementById("beep");
  

  if (alarmPlaying === true) {
    dispatch(zeroAlarm());
    audio.play();
    //dispatch(setNextInterval());
  }

  if (isReset === true) {
    audio.pause();
    audio.currentTime = 0;
  }

  return (
    <div>
      <div id="session-controls" className={styles.row}>
        <h2 id="session-label">Session Length</h2>
        <button
          id="session-increment"
          className={styles.button}
          aria-label="Increment session"
          onClick={() => dispatch(incrementSession())}
        >
          +
        </button>
        <span className={styles.value} id="session-length">{sessionL}</span>
        <button
          id="session-decrement"
          className={styles.button}
          aria-label="Decrement session"
          onClick={() => dispatch(decrementSession())}
        >
          -
        </button>
      </div>
      <div id="break-controls" className={styles.row}>
        <h2 id="break-label">Break Length</h2>
        <button
          id="break-increment"
          className={styles.button}
          aria-label="Increment break"
          onClick={() => dispatch(incrementBreak())}
        >
          +
        </button>
        <span className={styles.value} id="break-length">{breakL}</span>
        <button
          id="break-decrement"
          className={styles.button}
          aria-label="Decrement break"
          onClick={() => dispatch(decrementBreak())}
        >
          -
        </button>
      </div>
        <button
          id="start_stop"
          className={styles.button}
          onClick={() => { if (!running && !started) { 
                            dispatch(countdown()) 
                          } else if (running) {
                            dispatch(stopTimer())
                          }
                          else { 
                            dispatch(restart()) 
                          } }}
        >
          Start/Stop
        </button>
        <button
          id="reset"
          className={styles.button}
          onClick={() => dispatch(reset())}
          >
          Reset
        </button>
       <h1 id="timer-label" className={styles.value}>{currentIntervalDisplay}</h1>
       <h1 className={styles.value} id="time-left" >{timer}</h1>
       <audio id="beep" src={alarm} controls/>
       <ReactFCCtest />
      </div>
    
  )}
