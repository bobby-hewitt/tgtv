import React from 'react';
import './style.scss'

const angles =[0,0,0,0,0,0,0,0,0]
const Instructions = (props) => {
	return (     
		<div className="backgroundContainer" style={{backgroundColor:props.backgroundColor}}>
			<div className="anglesContainer">
			{angles.map((angle, i) => {
				return(
					<div key={i} className="testTriangle" style={{transform: 'rotate(' + (40 * i)+ 'deg) translate(-100%, -0%)'}}/>
				)
			})}
			</div>
		</div>
	);
}

export default Instructions;

