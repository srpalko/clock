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
  selectTimer,
  stop,
} from './clockSlice';
import styles from './Counter.module.css';

export function Clock() {
  const sessionL = useSelector(selectSessionLegnth);
  const breakL = useSelector(selectBreakLegnth);
  const timer = useSelector(selectTimer);
  const dispatch = useDispatch();

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
          className={styles.asyncButton}
          onClick={() => dispatch(countdown() || 0)}
        >
          Start
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(reset())}
          >
          Reset
        </button>
        <button className={styles.button} onClick={() => stop()}>
          Stop
        </button>
       <h1>{timer}</h1>
      </div>
    
  )}
