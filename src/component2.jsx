import React from 'react';


const Component2 = (props) => {
	return (
		<div>
			<button onClick={props.start}>Start</button>
			<button onClick={props.stop}>Stop</button>
			<button onClick={props.wait}>Wait</button>
			<button onClick={props.reset}>Reset</button>
		</div>
	)
}
export default Component2;

// let time = 0;
	// let ss = 0;
	// let mm = 0;
	// let hh = 0;
	// const start = () => {
	// 	timer(1000, 1000)
	// 		.pipe(
	// 			takeWhile(() => ss < 60),
	// 			tap(() => ss++)
	// 		)
	// 		.subscribe(() => {
	// 			console.log(ss);
	// 		});
	// }
	// const stop = () => {

	// }
	// return (
	// 	<div className="App">
	// 		<button className={start$}>start</button>
	// 		<button className={stop$}>stop</button>
	// 		<button className={reset$}>reset</button>
	// 	</div>
	// );