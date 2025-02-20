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

	// First, remove any cached token to force a reauthorization with the new scope.
	chrome.identity.getAuthToken({ interactive: false }, (oldToken) => {
		if (oldToken) {
			chrome.identity.removeCachedAuthToken({ token: oldToken }, () => {
				getNewToken()
			})
		} else {
			getNewToken()
		}
	})

	function getNewToken() {
		chrome.identity.getAuthToken({ interactive: true }, (token) => {
			if (chrome.runtime.lastError || !token) {
				setError(
					'Failed to retrieve auth token: ' +
						(chrome.runtime.lastError
							? chrome.runtime.lastError.message
							: '')
				)
				setLoading(false)
				return
			}

			// Create a new Google Sheet using the Drive API.
			fetch('https://www.googleapis.com/drive/v3/files?fields=id', {
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
						const spreadsheetId = data.id
						// Set the header row values using the Sheets API.
						fetch(
							`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:D1?valueInputOption=USER_ENTERED`,
							{
								method: 'PUT',
								headers: {
									Authorization: 'Bearer ' + token,
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									values: [
										[
											'Company',
											'Job Title',
											'Deadline',
											'Apply Link',
										],
									],
								}),
							}
						)
							.then((res) => res.json())
							.then((updateResult) => {
								// Now update the sheet formatting: freeze the first row and make header texts bold.
								const requests = [
									{
										repeatCell: {
											range: {
												sheetId: 0, // assuming your first (and default) sheet has ID 0
												startRowIndex: 0,
												endRowIndex: 1,
											},
											cell: {
												userEnteredFormat: {
													textFormat: {
														bold: true,
													},
												},
											},
											fields: 'userEnteredFormat.textFormat.bold',
										},
									},
									{
										updateSheetProperties: {
											properties: {
												sheetId: 0,
												gridProperties: {
													frozenRowCount: 1,
												},
											},
											fields: 'gridProperties.frozenRowCount',
										},
									},
								]

								fetch(
									`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
									{
										method: 'POST',
										headers: {
											Authorization: 'Bearer ' + token,
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											requests: requests,
										}),
									}
								)
									.then((res) => res.json())
									.then((batchResult) => {
										chrome.storage.sync.set(
											{ spreadsheetId: spreadsheetId },
											() => {
												setSpreadsheetId(spreadsheetId)
												setLoading(false)
												setFirstView(true)
												setSpreadsheetName('')
											}
										)
									})
									.catch((err) => {
										setError(
											'Error formatting spreadsheet: ' +
												err.toString()
										)
										setLoading(false)
									})
							})
							.catch((err) => {
								setError(
									'Error setting header values: ' +
										err.toString()
								)
								setLoading(false)
							})
					} else {
						setError(
							'Error creating spreadsheet: ' +
								JSON.stringify(data)
						)
						setLoading(false)
					}
				})
				.catch((err) => {
					setError('Error creating spreadsheet: ' + err.toString())
					setLoading(false)
				})
		})
	}
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
