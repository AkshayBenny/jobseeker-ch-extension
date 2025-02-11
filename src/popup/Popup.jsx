import React, { useEffect, useState } from 'react'
import './popup.css'
import NotLoggedInView from '../components/NotLoggedInView'
import SaveJobView from '../components/SaveJobView'
import CreateSpreadSheetView from '../components/CreateSpreadSheetView'
import JobSavedView from '../components/JobSavedView'

export default function Popup() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [spreadsheetId, setSpreadsheetId] = useState(null)
	const [spreadsheetName, setSpreadsheetName] = useState(
		'My Job Applications'
	)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [savedJob, setSavedJob] = useState(null)

	// When the component mounts, check if we already have a spreadsheetId stored.
	useEffect(() => {
		chrome.storage.sync.get('spreadsheetId', (result) => {
			if (result.spreadsheetId) {
				setSpreadsheetId(result.spreadsheetId)
			}
		})
	}, [])

	useEffect(() => {
		chrome.identity.getAuthToken({ interactive: false }, (token) => {
			if (token) {
				setIsLoggedIn(true)
			}
		})
	}, [])

	return (
		<div>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{loading && <p>Loading...</p>}

			{/* Not logged in: show Sign in button */}
			{!isLoggedIn && !loading && (
				<NotLoggedInView
					setLoading={setLoading}
					setIsLoggedIn={setIsLoggedIn}
					setError={setError}
				/>
			)}

			{/* Logged in but no spreadsheet created: show create spreadsheet UI */}
			{isLoggedIn && !spreadsheetId && !loading && (
				<CreateSpreadSheetView
					spreadsheetName={spreadsheetName}
					setSpreadsheetName={setSpreadsheetName}
					setLoading={setLoading}
					setError={setError}
					setSpreadsheetId={setSpreadsheetId}
				/>
			)}

			{/* Logged in and spreadsheet exists: show Save Job and Logout buttons */}
			{isLoggedIn && spreadsheetId && !savedJob && !loading && (
				<SaveJobView
					setError={setError}
					setIsLoggedIn={setIsLoggedIn}
					setSpreadsheetId={setSpreadsheetId}
					setSavedJob={setSavedJob}
				/>
			)}

			{isLoggedIn && spreadsheetId && savedJob && !loading && (
				<JobSavedView
					savedJob={savedJob}
					spreadsheetId={spreadsheetId}
				/>
			)}
		</div>
	)
}
