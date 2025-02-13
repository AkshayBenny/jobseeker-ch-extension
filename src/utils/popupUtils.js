// Sign in with Google
const handleLogin = (setLoading, setIsLoggedIn, setError, setSpreadsheetId) => {
	setLoading(true)
	chrome.identity.getAuthToken({ interactive: true }, (token) => {
		if (chrome.runtime.lastError || !token) {
			console.error('Auth token error:', chrome.runtime.lastError)
			setError('Authentication failed.')
			setLoading(false)
			return
		}
		setIsLoggedIn(true)
		setLoading(false)
		// Optionally, re-check storage to get spreadsheetId if already created
		chrome.storage.sync.get('spreadsheetId', (result) => {
			if (result.spreadsheetId) {
				setSpreadsheetId(result.spreadsheetId)
			}
		})
	})
}

// Create a new spreadsheet using Drive API
const handleCreateSpreadsheet = (
	spreadsheetName,
	setLoading,
	setError,
	setSpreadsheetId,
	setFirstView,
	setSpreadsheetName
) => {
	if (!spreadsheetName) {
		setError('Please enter a spreadsheet name.')
		return
	}
	setLoading(true)
	chrome.identity.getAuthToken({ interactive: false }, (token) => {
		setError('')
		if (chrome.runtime.lastError || !token) {
			setError('Failed to retrieve auth token.')
			setLoading(false)
			return
		}
		// Use Drive API to create a new Google Sheet file
		fetch('https://www.googleapis.com/drive/v3/files', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: spreadsheetName,
				mimeType: 'application/vnd.google-apps.spreadsheet',
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.id) {
					// Store the file ID as spreadsheetId
					chrome.storage.sync.set({ spreadsheetId: data.id }, () => {
						setSpreadsheetId(data.id)
						setLoading(false)
						setFirstView(true)
						setSpreadsheetName('')
					})
				} else {
					setError('Error creating spreadsheet.')
					setLoading(false)
				}
			})
			.catch((err) => {
				setError(err.toString())
				setLoading(false)
			})
	})
}

// Save job details: This function sends a message to the background script
// which uses the Sheets API to append data.
const handleSaveJob = (setSavedJob, setError, setFirstView) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{ action: 'getJobDetails' },
			(jobDetails) => {
				if (chrome.runtime.lastError || !jobDetails) {
					setError('Failed to extract job details.')
					return
				}
				chrome.runtime.sendMessage(
					{ action: 'saveJob', data: jobDetails },
					(response) => {
						if (response && response.status === 'success') {
							setSavedJob(jobDetails)
							setFirstView(false)
						} else {
							setError('Failed to save job.')
						}
					}
				)
			}
		)
	})
}

// Logout and revoke the Google token
const handleLogout = (
	setIsLoggedIn,
	setSpreadsheetId,
	setShowSettings,
	setError
) => {
	chrome.identity.getAuthToken({ interactive: false }, (token) => {
		if (!token) return
		fetch('https://accounts.google.com/o/oauth2/revoke?token=' + token)
			.then(() => {
				chrome.identity.removeCachedAuthToken({ token: token }, () => {
					setIsLoggedIn(false)
					setShowSettings(false)
					setSpreadsheetId(null)
					chrome.storage.sync.remove('spreadsheetId')
				})
			})
			.catch((err) => {
				setError('Failed to logout: ' + err.toString())
			})
	})
}

// Handle creating a new sheet by removing the old one
const handleCreateNewSheet = (setSpreadsheetId, setError, setShowSettings) => {
	try {
		setSpreadsheetId(null)
		chrome.storage.sync.remove('spreadsheetId')
		setShowSettings(false)
	} catch (error) {
		setError('Something went wrong!')
	}
}

// Close the extension window
const handleCloseExtension = () => {
	window.close()
}

export {
	handleLogin,
	handleCreateSpreadsheet,
	handleSaveJob,
	handleLogout,
	handleCreateNewSheet,
	handleCloseExtension,
}
