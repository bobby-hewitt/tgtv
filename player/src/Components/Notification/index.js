import React, { useEffect } from 'react'
import './style.scss'

const Notification = ({actions, backgroundColor, title, subtitle}) => {

	return(
	<div className={`notificationOuterContainer ${actions && 'show'}`}>
		<div className="notificationContainer">
			{title &&
				<p className="title">{title}</p>
			}
			{subtitle &&
				<p className="subtitle">{subtitle}</p>
			}
			<div className="notificationActionsContainer">
			{actions && actions.map((item, i) => {
				return(
					<div 
						className="notificationAction" 
						key={i} 
						onClick={() => item.action()}
						style={{backgroundColor}}>
						<p>{item.label}</p>
					</div>
				)
			})}
			</div>
		</div>
	</div>
	)
}



export default Notification