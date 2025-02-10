import React, { useState } from 'react'
import './options.css'
import { createSheet } from '../utils/optionsUtils'

export default function Options() {
	const [spreadsheetName, setSpreadsheetName] = useState(
		'My Job Applications'
	)
	const [status, setStatus] = useState('')

	return (
		<div className='options-container'>
			<h2>Job Seeker Setup</h2>
			<p>
				This will create a new Google Sheet to store your job
				applications.
			</p>
			<label htmlFor='spreadsheetName'>Spreadsheet Name:</label>
			<input
				type='text'
				id='spreadsheetName'
				value={spreadsheetName}
				onChange={(e) => setSpreadsheetName(e.target.value)}
			/>
			<br />
			<button onClick={() => createSheet(setStatus)}>
				Create New Sheet
			</button>
			<p id='status'>{status}</p>
		</div>
	)
}
