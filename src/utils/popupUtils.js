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
	setLoading(true)
	chrome.identity.getAuthToken({ interactive: false }, (token) => {
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
													stringValue: 'Deadline',
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
											{
												userEnteredValue: {
													stringValue: 'Timestamp',
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
					chrome.storage.sync.set(
						{ spreadsheetId: data.spreadsheetId },
						() => {
							setSpreadsheetId(data.spreadsheetId)
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
							console.error(jobDetails)
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

export { handleLogin, handleCreateSpreadsheet, handleSaveJob, handleLogout }
