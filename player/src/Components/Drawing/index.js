import React, { useContext, useRef, useState, useLayoutEffect, useEffect  } from 'react'
import globalContext from 'Contexts/global'
import './style.scss'
import Button from '../Button'
import SignaturePad from 'signature_pad'
import AnimateIn from '../AnimateIn'

const colors = [
  '#000000','#ffffff','#ea2626','#42b549','#3094c3',

	
	
	
	
]

console.log(window.innerWidth)
let windowWidth = window.innerWidth > 400 ? 400-16 : window.innerWidth- 32

window.onresize = () => {
	let windowWidth = window.innerWidth > 400 ? 400-16 : window.innerWidth- 32
}

const Drawing = (props) => {
	const [ colorIndex, setColorIndex] = useState(0)


  	const canvas = useRef(null);
 	const signaturePad = useRef(null);



  useEffect(() => {
  	if (canvas.current){	
  		signaturePad.current = new SignaturePad(canvas.current, {
  			minWidth:3,
  			maxWidth:3,
  		});
  	}
  },[canvas])

  const onSubmit =() => {
  	const sig = signaturePad.current.toDataURL()
  	props.onSubmit(sig)
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

  const setColor = (color, i) => {
    setColorIndex(i)
  	signaturePad.current.penColor =color
  }



 
  return (
    <AnimateIn>
  	<div>
  	<canvas ref={canvas}  width={windowWidth} height={windowWidth}/>
  	<div className="colorsContainer">
    
            
          
  		{colors && colors.map((item, i) => {
  			return(
  				<div key={i} className="outerColor" onClick={() => setColor(item, i)}>
            <div className="color" style={{backgroundColor: item}} />
    				
  				</div>
  			)
  		})}
      <div className="outerColor" onClick={onUndo}>
        <div className="color iconButton">
        <img src={require('assets/icons/undo.svg')} />
      </div>
  	</div>
    </div>
    <Button label="Submit" noMargin onClick={onSubmit} />
	
  	</div>
    </AnimateIn>
  	)

}

export default Drawing