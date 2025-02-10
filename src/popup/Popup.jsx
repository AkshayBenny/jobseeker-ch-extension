import React, { useEffect, useState } from 'react'
import './popup.css'
import { handleLogout, handleSaveJob } from '../utils/popupUtils'
import NotLoggedInView from '../components/NotLoggedIn'
import LoggedInCreateSpreadSheetView from '../components/LoggedInCreateSpreadSheetView'
import SaveJobView from '../components/SaveJobView'

export default function Popup() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [spreadsheetId, setSpreadsheetId] = useState(null)
	const [spreadsheetName, setSpreadsheetName] = useState(
		'My Job Applications'
	)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

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
		<div style={{ padding: '10px', fontFamily: 'Arial, sans-serif' }}>
			<h2>Job Seeker Extension</h2>
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
				<LoggedInCreateSpreadSheetView
					spreadsheetName={spreadsheetName}
					setSpreadsheetName={setSpreadsheetName}
					setLoading={setLoading}
					setError={setError}
					setSpreadsheetId={setSpreadsheetId}
				/>
			)}

			{/* Logged in and spreadsheet exists: show Save Job and Logout buttons */}
			{isLoggedIn && spreadsheetId && !loading && (
				<SaveJobView
					setError={setError}
					setIsLoggedIn={setIsLoggedIn}
					setSpreadsheetId={setSpreadsheetId}
				/>
			)}
		</div>
	)
}
