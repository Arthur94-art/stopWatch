import React, { useState } from 'react';
import './App.css';
import { timer, Subject } from 'rxjs';
import { takeUntil, repeatWhen } from 'rxjs/operators'

const restartTimer$ = new Subject();
const stopTimer$ = new Subject();
const timer$ = timer(0, 1000).pipe(
	takeUntil(stopTimer$),
	repeatWhen(() => {
		return restartTimer$;
	})
);

let isTimerRunning = false;

let pausedTime = 0;


const Timer = () => {

	const [lastTimeWaitClicked, waitClicked] = useState();
	const [time, setTime] = useState({ ss: 0, mm: 0, hh: 0 });

	const start = () => {
		if (!isTimerRunning) {
			isTimerRunning = true;
			timer$.subscribe((ss) => {
				ss += pausedTime;
				setTime({ ss: ss % 60, mm: Math.floor(ss / 60), hh: Math.floor(ss / 3600) })
			})
		}
	};

	const wait = () => {
		let currTime = performance.now();
		if (currTime - lastTimeWaitClicked < 300) {
			pausedTime = time.ss + time.mm * 60 + time.hh * 3600;
			stopTimer$.next();
			isTimerRunning = false;

		} else {
			waitClicked(currTime);
		}
	};

	const reset = () => {
		stopTimer$.next();
		restartTimer$.next();
		pausedTime = 0;
	};
	const stop = () => {
		stopTimer$.next();
		isTimerRunning = false;
		setTime({ ss: 0, mm: 0, hh: 0 });
		pausedTime = 0;
	};
	return (
		<div className='display'>
			<div>
			<span>{(time.hh >= 10) ? time.hh : '0' + time.hh}</span>&nbsp;:&nbsp;
			<span>{(time.mm >= 10) ? time.mm : '0' + time.mm}</span>&nbsp;:&nbsp;
			<span>{(time.ss >= 10) ? time.ss : '0' + time.ss}</span>&nbsp;&nbsp;
		</div>
			<div>
				<button onClick={start}>Start</button>
				<button onClick={stop}>Stop</button>
				<button onClick={wait}>Wait</button>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	)
}

export default Timer;