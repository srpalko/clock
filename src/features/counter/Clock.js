/* This is the main clock component of the app. 
It includes both the session and break setting controls and the countdown timer itself. */

import React, { useState } from 'react';
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
  stopTimer,
  restart,
} from './clockSlice';
import styles from './Counter.module.css';

export function Clock() {
  const sessionL = useSelector(selectSessionLegnth);
  const breakL = useSelector(selectBreakLegnth);
  const timer = useSelector(selectDisplay);
  const running = useSelector(selectRunning);
  const started = useSelector(selectStarted);
  const dispatch = useDispatch();

  // The timer needs to be set to whatever the session legnth ends up at before it starts its countdown.
  //dispatch(setTimer(timer));

  return (
    <div>
      <div id="session-controls" className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment session"
          onClick={() => dispatch(incrementSession())}
        >
          +
        </button>
        <span className={styles.value}>{sessionL}</span>
        <button
          className={styles.button}
          aria-label="Decrement session"
          onClick={() => dispatch(decrementSession())}
        >
          -
        </button>
      </div>
      <div id="break-controls" className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment break"
          onClick={() => dispatch(incrementBreak())}
        >
          +
        </button>
        <span className={styles.value}>{breakL}</span>
        <button
          className={styles.button}
          aria-label="Decrement break"
          onClick={() => dispatch(decrementBreak())}
        >
          -
        </button>
      </div>
        <button
          className={styles.button}
          onClick={() => { if (!running && !started) { dispatch(countdown()) } else { dispatch(restart()) } }}
        >
          Start
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(reset())}
          >
          Reset
        </button>
        <button className={styles.button} onClick={ () => dispatch(stopTimer()) }>
          Stop
        </button>
       <h1 className={styles.value}>{timer}</h1>
      </div>
    
  )}
