import React, { useContext, useRef, useLayoutEffect, useEffect  } from 'react'
import globalContext from 'Contexts/global'
import './style.scss'
import SignaturePad from 'signature_pad'


const colors = [
	'#3094c3',
	'#42b549',
	'#ff5722',
	'#ea2626',
	'#ffffff',
	'#000000'
]

console.log(window.innerWidth)
let windowWidth = window.innerWidth > 400 ? 400 : window.innerWidth- 32

window.onresize = () => {
	let windowWidth = window.innerWidth > 400 ? 400 : window.innerWidth- 32
}

const Drawing = (props) => {
	const state = useContext(globalContext)


  	const canvas = useRef(null);
 	const signaturePad = useRef(null);



  useEffect(() => {
  	if (canvas.current){	
  		signaturePad.current = new SignaturePad(canvas.current, {
  			minWidth:5,
  			maxWidth:5,
  		});
  	}
  },[canvas])

  const onClick =() => {
  	const sig = signaturePad.current.toDataURL()
  	state.submitDrawing(sig)
    signaturePad.current.clear();
  }

  const onUndo = () => {
  		var sigData = signaturePad.current.toData();
	  if (sigData) {
	  	console.log(sigData.length)
	    sigData.pop(); // remove the last dot or line
	    console.log(sigData.length)
	    signaturePad.current.fromData(sigData);
	  }
  }

  const setColor = (color) => {
  	signaturePad.current.penColor =color
  }



 
  return (
  	<div>
  	<canvas ref={canvas}  width={windowWidth} height={windowWidth}/>
  	<div className="colorsContainer">
  		{colors && colors.map((item, i) => {
  			return(
  				<div key={i} className="outerColor" onClick={() => setColor(item)}>
  				<div className="color" style={{backgroundColor: item}}>
  				</div>
  				</div>
  			)
  		})}
  	</div>
	<div className="button" onClick={onClick}>
	Click
	</div>
	<div className="button" onClick={onUndo}>
	Undo
	</div>
  	</div>
  	)

}

export default Drawing