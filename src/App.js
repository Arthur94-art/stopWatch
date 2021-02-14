import React, { useState } from 'react';
import './App.css';
import Component1 from './component1';
import Component2 from './component2';
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
restartTimer$.subscribe((value) => {
	console.log(value)
});

let pausedTime = 0;

function App() {
	
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

	return (<div className="display">
		<Component1 time={time} />
		<Component2 wait={wait} reset={reset} start={start} stop={stop} />
	</div>
	);
}

export default App;