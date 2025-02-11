// Sign in with Google
const handleLogin = (setLoading, setIsLoggedIn, setError) => {
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
		// Optionally, you can re-check storage here in case the spreadsheet was already created.
		chrome.storage.sync.get('spreadsheetId', (result) => {
			if (result.spreadsheetId) {
				setSpreadsheetId(result.spreadsheetId)
			}
		})
	})
}

// Create a new spreadsheet (with an option to rename)
const handleCreateSpreadsheet = (
	spreadsheetName,
	setLoading,
	setError,
	setSpreadsheetId
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
		fetch('https://sheets.googleapis.com/v4/spreadsheets', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				properties: { title: spreadsheetName },
				sheets: [
					{
						properties: {
							title: 'Sheet1',
							gridProperties: { frozenRowCount: 1 },
						},
						data: [
							{
								startRow: 0,
								startColumn: 0,
								rowData: [
									{
										values: [
											{
												userEnteredValue: {
													stringValue: 'Company Name',
												},
												userEnteredFormat: {
													textFormat: { bold: true },
												},
											},
											{
												userEnteredValue: {
													stringValue: 'Job Title',
												},
												userEnteredFormat: {
													textFormat: { bold: true },
												},
											},
											{
												userEnteredValue: {
													stringValue: 'Apply Link',
												},
												userEnteredFormat: {
													textFormat: { bold: true },
												},
											},
										],
									},
								],
							},
						],
					},
				],
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.spreadsheetId) {
					// Store the spreadsheet ID and then apply banding to the header range.
					chrome.storage.sync.set(
						{ spreadsheetId: data.spreadsheetId },
						() => {
							setSpreadsheetId(data.spreadsheetId)
							// Now add banding (table formatting) using batchUpdate.
							fetch(
								`https://sheets.googleapis.com/v4/spreadsheets/${data.spreadsheetId}:batchUpdate`,
								{
									method: 'POST',
									headers: {
										Authorization: 'Bearer ' + token,
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										requests: [
											{
												addBanding: {
													bandedRange: {
														range: {
															sheetId: 0, // Typically the first sheet’s ID is 0.
															startRowIndex: 0, // Start at row 0 (the header row)
															endRowIndex: 10, // For example, pre-format rows 0-9. Adjust as needed.
															startColumnIndex: 0,
															endColumnIndex: 3, // For 3 columns
														},
														rowProperties: {
															// Format for the header row:
															headerColor: {
																red: 0.8,
																green: 0.8,
																blue: 0.8,
																alpha: 1,
															},
															// Colors for alternating rows:
															firstBandColor: {
																red: 1,
																green: 1,
																blue: 1,
																alpha: 1,
															},
															secondBandColor: {
																red: 0.95,
																green: 0.95,
																blue: 0.95,
																alpha: 1,
															},
														},
													},
												},
											},
										],
									}),
								}
							)
								.then((res) => res.json())
								.then((result) =>
									console.log('Banded range created:', result)
								)
								.catch((error) =>
									console.error(
										'Error applying banding:',
										error
									)
								)
							setLoading(false)
						}
					)
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

// Save job details (calls the background script to append job info)
const handleSaveJob = (setSavedJob, setError) => {
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
const handleLogout = (setIsLoggedIn, setSpreadsheetId, setError) => {
	chrome.identity.getAuthToken({ interactive: false }, (token) => {
		if (!token) return
		fetch('https://accounts.google.com/o/oauth2/revoke?token=' + token)
			.then(() => {
				chrome.identity.removeCachedAuthToken({ token: token }, () => {
					setIsLoggedIn(false)
					setSpreadsheetId(null)
					chrome.storage.sync.remove('spreadsheetId')
				})
			})
			.catch((err) => {
				setError('Failed to logout: ' + err.toString())
			})
	})
}

const handleCreateNewSheet = (setSpreadsheetId, setError, setShowSettings) => {
	try {
		setSpreadsheetId(null)
		chrome.storage.sync.remove('spreadsheetId')
		setShowSettings(false)
	} catch (error) {
		setError('Something went wrong!')
	}
}

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
