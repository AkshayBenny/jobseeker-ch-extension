chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'saveJob') {
		chrome.storage.sync.get('spreadsheetId', (result) => {
			const spreadsheetId = result.spreadsheetId
			if (!spreadsheetId) {
				console.error(
					'Spreadsheet ID not set. Please set up your sheet in Options.'
				)
				sendResponse({
					status: 'error',
					message: 'Spreadsheet ID not set.',
				})
				return
			}

			chrome.identity.getAuthToken(
				{ interactive: true },
				async (token) => {
					if (chrome.runtime.lastError || !token) {
						console.error(
							'Failed to get auth token:',
							chrome.runtime.lastError
						)
						sendResponse({
							status: 'error',
							message: 'Authentication failed.',
						})
						return
					}

					const jobData = message.data
					try {
						// We can still use the Sheets API to append data to the file we created.
						const response = await fetch(
							`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED`,
							{
								method: 'POST',
								headers: {
									Authorization: 'Bearer ' + token,
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									values: [
										[
											jobData.company,
											jobData.jobTitle,
											jobData.deadline,
											jobData.applyLink,
										],
									],
								}),
							}
						)
						const data = await response.json()
						console.log('Data appended:', data)
						sendResponse({ status: 'success', data: data })
					} catch (error) {
						console.error('Error appending data:', error)
						sendResponse({
							status: 'error',
							message: error.toString(),
						})
					}
				}
			)
		})
		return true // Asynchronous response
	}
})
