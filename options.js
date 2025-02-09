document.getElementById('createSheet').addEventListener('click', async () => {
	document.getElementById('status').innerText = 'Creating spreadsheet...'

	// Get the custom spreadsheet name from the input field.
	// If the field is empty, default to "My Job Applications".
	const nameInput = document.getElementById('spreadsheetName')
	const spreadsheetTitle =
		nameInput && nameInput.value.trim() !== ''
			? nameInput.value.trim()
			: 'My Job Applications'

	// Get OAuth token (interactive if necessary)
	chrome.identity.getAuthToken({ interactive: true }, async (token) => {
		if (chrome.runtime.lastError || !token) {
			document.getElementById('status').innerText =
				'Failed to get auth token.'
			return
		}

		// Call the Google Sheets API to create a new spreadsheet with the custom title.
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
							title: spreadsheetTitle, // Use the user-specified title here.
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
