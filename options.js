// options.js
document.getElementById('createSheet').addEventListener('click', async () => {
	document.getElementById('status').innerText = 'Creating spreadsheet...'

	// Get OAuth token
	chrome.identity.getAuthToken({ interactive: true }, async (token) => {
		if (chrome.runtime.lastError || !token) {
			document.getElementById('status').innerText =
				'Failed to get auth token.'
			return
		}

		// Call Google Sheets API to create a new spreadsheet
		try {
			const response = await fetch(
				'https://sheets.googleapis.com/v4/spreadsheets',
				{
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						properties: {
							title: 'My Job Applications',
						},
						sheets: [
							{
								properties: {
									title: 'Sheet1',
									gridProperties: {
										frozenRowCount: 1, // Freeze the first row
									},
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
															stringValue:
																'Company Name',
														},
														userEnteredFormat: {
															textFormat: {
																bold: true,
															},
														},
													},
													{
														userEnteredValue: {
															stringValue:
																'Job Title',
														},
														userEnteredFormat: {
															textFormat: {
																bold: true,
															},
														},
													},
													{
														userEnteredValue: {
															stringValue:
																'Deadline',
														},
														userEnteredFormat: {
															textFormat: {
																bold: true,
															},
														},
													},
													{
														userEnteredValue: {
															stringValue:
																'Apply Link',
														},
														userEnteredFormat: {
															textFormat: {
																bold: true,
															},
														},
													},
													{
														userEnteredValue: {
															stringValue:
																'Timestamp',
														},
														userEnteredFormat: {
															textFormat: {
																bold: true,
															},
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
				}
			)
			const data = await response.json()
			if (data.spreadsheetId) {
				// Save the spreadsheet ID in chrome.storage
				chrome.storage.sync.set(
					{ spreadsheetId: data.spreadsheetId },
					() => {
						document.getElementById('status').innerText =
							'Spreadsheet created and saved.'
					}
				)
			} else {
				document.getElementById('status').innerText =
					'Error creating spreadsheet.'
			}
		} catch (error) {
			document.getElementById('status').innerText =
				'Error: ' + error.toString()
		}
	})
})
