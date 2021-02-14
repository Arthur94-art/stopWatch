import React from 'react';
import './App.css';

const Component1 = (props) => {
	return (
		
		<div>
			<span>{(props.time.hh >= 10) ? props.time.hh : '0' + props.time.hh}</span>&nbsp;:&nbsp;
			<span>{(props.time.mm >= 10) ? props.time.mm : '0' + props.time.mm}</span>&nbsp;:&nbsp;
			<span>{(props.time.ss >= 10) ? props.time.ss : '0' + props.time.ss}</span>&nbsp;&nbsp;
		</div>
	)
}

export default Component1;