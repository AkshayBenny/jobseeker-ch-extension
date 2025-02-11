import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './Popup'
import './popup.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
)


// padding issue for the header
// after create sheet, upon closing the extension, the default view should be save job view
// save sheetname to localstorage
