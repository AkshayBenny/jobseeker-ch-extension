chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'saveJob') {
		fetch(
			'https://script.google.com/macros/s/AKfycbwJpoxi6xZwwgZFCk0pCktN6BxKdy6MlDGXyDRXfSU3knQF7FBXdqSRZcOxGrYfVlM/exec',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(message.data),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log('Saved to Google Sheets', data)
				sendResponse({ status: 'success', data })
			})
			.catch((error) => {
				console.error('Error:', error)
				sendResponse({ status: 'error', message: error.toString() })
			})
		return false // Keeps the message channel open for async response
	}
})
