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
  selectSessionLegnth,
  selectBreakLegnth,
  selectDisplay,
  selectRunning,
  selectStarted,
  selectCurrentInterval,
  stopTimer,
  restart,
  startTimer,
} from './clockSlice';
import styles from './Counter.module.css';



export function Clock() {
  const sessionL = useSelector(selectSessionLegnth);
  const breakL = useSelector(selectBreakLegnth);
  const timer = useSelector(selectDisplay);
  const running = useSelector(selectRunning);
  const started = useSelector(selectStarted);
  const currentInterval = useSelector(selectCurrentInterval);
  const dispatch = useDispatch();

  // The timer needs to be set to whatever the session legnth ends up at before it starts its countdown

  const currentIntervalDisplay = currentInterval === "session" ? "Session" : "Break";
  

  return (
    <div>
      <div id="session-controls" className={styles.row}>
        <h2 id="session-label">Session Legnth</h2>
        <button
          id="session-increment"
          className={styles.button}
          aria-label="Increment session"
          onClick={() => dispatch(incrementSession())}
        >
          +
        </button>
        <span className={styles.value} id="session-legnth">{sessionL}</span>
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
        <h2 id="break-label">Break Legnth</h2>
        <button
          id="break-increment"
          className={styles.button}
          aria-label="Increment break"
          onClick={() => dispatch(incrementBreak())}
        >
          +
        </button>
        <span className={styles.value} id="break-legnth">{breakL}</span>
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
        {/*<button className={styles.button} onClick={ () => dispatch(stopTimer()) }>
          Stop
          </button> */}
       <h1 id="timer-label" className={styles.value}>{currentIntervalDisplay}</h1>
       <h1 className={styles.value} id="time-left" >{timer}</h1>
       <ReactFCCtest />
      </div>
    
  )}
