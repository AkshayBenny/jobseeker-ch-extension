import React, { useEffect, useState } from 'react'
import './popup.css'
import NotLoggedInView from '../components/NotLoggedInView'
import SaveJobView from '../components/SaveJobView'
import CreateSpreadSheetView from '../components/CreateSpreadSheetView'
import JobSavedView from '../components/JobSavedView'
import SettingsView from '../components/SettingsView'
import Loader from '../components/Loader'

export default function Popup() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [spreadsheetId, setSpreadsheetId] = useState(null)
	const [spreadsheetName, setSpreadsheetName] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [savedJob, setSavedJob] = useState(null)
	const [showSettings, setShowSettings] = useState(false)
	const [firstView, setFirstView] = useState(false)

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
			{loading && <Loader setShowSettings={setShowSettings} />}

			{/* Not logged in: show Sign in button */}
			{!isLoggedIn && !loading && (
				<NotLoggedInView
					setLoading={setLoading}
					setIsLoggedIn={setIsLoggedIn}
					setError={setError}
					error={error}
					setShowSettings={setShowSettings}
				/>
			)}

			{/* Logged in but no spreadsheet created: show create spreadsheet UI */}
			{isLoggedIn && !spreadsheetId && !loading && !showSettings && (
				<CreateSpreadSheetView
					spreadsheetName={spreadsheetName}
					setSpreadsheetName={setSpreadsheetName}
					setLoading={setLoading}
					setError={setError}
					setSpreadsheetId={setSpreadsheetId}
					setShowSettings={setShowSettings}
					error={error}
					setFirstView={setFirstView}
				/>
			)}

			{/* Logged in and spreadsheet exists: show Save Job and Logout buttons */}
			{isLoggedIn &&
				spreadsheetId &&
				!savedJob &&
				!loading &&
				!showSettings && (
					<SaveJobView
						setError={setError}
						setIsLoggedIn={setIsLoggedIn}
						setSpreadsheetId={setSpreadsheetId}
						setSavedJob={setSavedJob}
						setShowSettings={setShowSettings}
						error={error}
						firstView={firstView}
						setFirstView={setFirstView}
						spreadsheetName={spreadsheetName}
					/>
				)}

			{isLoggedIn &&
				spreadsheetId &&
				savedJob &&
				!loading &&
				!showSettings && (
					<JobSavedView
						savedJob={savedJob}
						spreadsheetId={spreadsheetId}
						setShowSettings={setShowSettings}
					/>
				)}

			{showSettings && !loading && (
				<SettingsView
					setIsLoggedIn={setIsLoggedIn}
					setSpreadsheetId={setSpreadsheetId}
					setError={setError}
					setShowSettings={setShowSettings}
					error={error}
				/>
			)}
		</div>
	)
}
