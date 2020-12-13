/* A component for the clock feature */

import React, { useEffect } from 'react';
// add testing functionality for project
import ReactFCCtest from 'react-fcctest';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementSession,
  decrementSession,
  incrementBreak,
  decrementBreak,
  reset,
  countdown,
  setUpNextInterval,
  selectSessionLength,
  selectBreakLength,
  selectDisplay,
  selectRunning,
  selectStarted,
  selectCurrentInterval,
  selectAlarmPlaying,
  selectAlarmPosition,
  selectAlarmStatus,
  selectReset,
  stopTimer,
  restart,
  nextStart,
  setStart,
} from './clockSlice';
import styles from './Counter.module.css';
import alarm from './short_alarm.mp3';


// display the clock
export function Clock() {
  // simplify the syntax
  const sessionL = useSelector(selectSessionLength);
  const breakL = useSelector(selectBreakLength);
  const timerDisplay = useSelector(selectDisplay);
  const running = useSelector(selectRunning);
  const started = useSelector(selectStarted);
  const currentInterval = useSelector(selectCurrentInterval);
  const alarmPlaying = useSelector(selectAlarmPlaying);
  const isReset = useSelector(selectReset);
  const alarmPosition = useSelector(selectAlarmPosition);
  const alarmStatus = useSelector(selectAlarmStatus);
  //const timer = useSelector(selectTimer);
  const dispatch = useDispatch();

  // set the diplay to show session time or break time depending on current interval
  const currentIntervalDisplay = currentInterval === "session" ? "Session" : "Break";

  // create an audio variable to allow control
  let audio = document.getElementById("beep");

  // when the alarm is playing, pause the timer and set up the next interval on a delay.
  if (alarmPlaying) {
    dispatch(setUpNextInterval());
  }

  useEffect(() => {
    // when page loads, start the internal clock.
    if (!started) {
      dispatch(setStart());
      dispatch(countdown());
    }
  });

  useEffect(() => {
    // control the audio element based on current state. 
    if (alarmStatus === 'play') {
      audio.play();
    } else if (alarmStatus === 'stop') {
      audio.pause();
      audio.currentTime = alarmPosition;
    } else if (alarmStatus === 'reset') {
      audio.currentTime = alarmPosition;
    }
  })

  return (
    <div className={styles.clock}>
      {/* Page Title */}
      <h1 className={styles.heading} >Productivity Clock</h1>
      {/* Display for current interval and time remaining */}
      <div id="timer-label" className={styles.value}>Current Interval: {currentIntervalDisplay}</div>
      <div className={styles.display} id="time-left" >{timerDisplay}</div>
      {/* controls for adjusting interval times */}
      <div id="session-controls" className={styles.row.textbox}>
        <h2 id="session-label">Session Length</h2>
        <div className={styles.controls}>
          <button
            id="session-decrement"
            className={styles.button}
            aria-label="Decrement session"
            onClick={() => dispatch(decrementSession())}
          >
            -
          </button>
          <span className={styles.value} id="session-length">{sessionL}</span>
          <button
            id="session-increment"
            className={styles.button}
            aria-label="Increment session"
            onClick={() => dispatch(incrementSession())}
          >
            +
          </button>
        </div>
      </div>
      <div id="break-controls" className={styles.row.textbox}>
        <h2 id="break-label">Break Length</h2>
        <div className={styles.controls}>
          <button
            id="break-decrement"
            className={styles.button}
            aria-label="Decrement break"
            onClick={() => dispatch(decrementBreak())}
          >
            -
          </button>
          <span className={styles.value} id="break-length">{breakL}</span>
          <button
            id="break-increment"
            className={styles.button}
            aria-label="Increment break"
            onClick={() => dispatch(incrementBreak())}
          >
            +
          </button>
        </div>
      </div>
      {/* Start/Stop Button.*/}
      <button
        id="start_stop"
        className={styles.button}
        onClick={() => {
          if (isReset && !running) {
            dispatch(nextStart());
          }
          else if (running) {
            dispatch(stopTimer())
          }
          else if (!running && !alarmPlaying) {
            dispatch(restart())
          }
        }}
      >
        Start/Stop
        </button>
      {/* Reset Button */}
      <button
        id="reset"
        className={styles.button}
        onClick={() => {
          audio.pause();
          audio.currentTime = 0;
          dispatch(reset());
        }}
      >
        Reset
        </button>


      {/* provide and audio element for the alarm. */}
      <audio id="beep" src={alarm} type='audio/mpeg; codecs="mp3"' />

      {/* FCC Test Suite */}
      <ReactFCCtest />
    </div>
  )
}
