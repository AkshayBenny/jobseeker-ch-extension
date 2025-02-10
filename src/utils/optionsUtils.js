const createSheet = (setStatus) => {
	setStatus('Creating spreadsheet...')
	chrome.identity.getAuthToken({ interactive: true }, async (token) => {
		if (chrome.runtime.lastError || !token) {
			setStatus('Failed to get auth token.')
			return
		}
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
							title: spreadsheetName,
						},
						sheets: [
							{
								properties: {
									title: 'Sheet1',
									gridProperties: {
										frozenRowCount: 1,
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
				chrome.storage.sync.set(
					{ spreadsheetId: data.spreadsheetId },
					() => {
						setStatus('Spreadsheet created and saved.')
					}
				)
			} else {
				setStatus('Error creating spreadsheet.')
			}
		} catch (error) {
			setStatus('Error: ' + error.toString())
		}
	})
}

export { createSheet }
