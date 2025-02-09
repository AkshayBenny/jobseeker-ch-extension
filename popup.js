// Event listener for saving job details (already exists)
document.getElementById('fetchJob').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{ action: 'getJobDetails' },
			(response) => {
				if (chrome.runtime.lastError || !response) {
					console.error(
						'Error extracting job details:',
						chrome.runtime.lastError
							? chrome.runtime.lastError.message
							: 'No response'
					)
					alert(
						'Unable to extract job details. Please ensure you are on a valid job listing page.'
					)
					return
				}
				// Forward the job details to the background script
				chrome.runtime.sendMessage(
					{ action: 'saveJob', data: response },
					(bgResponse) => {
						console.log('Response from background:', bgResponse)
					}
				)
			}
		)
	})
})

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
	logoutUser()
})

function logoutUser() {
	chrome.identity.getAuthToken({ interactive: false }, (token) => {
		if (chrome.runtime.lastError || !token) {
			console.error(
				'No token found or error occurred:',
				chrome.runtime.lastError ? chrome.runtime.lastError.message : ''
			)
			return
		}
		// Revoke the token via Google’s revocation endpoint
		fetch('https://accounts.google.com/o/oauth2/revoke?token=' + token)
			.then(() => {
				// Then remove it from the cache
				chrome.identity.removeCachedAuthToken({ token: token }, () => {
					console.log('User logged out. Token removed and revoked.')
					alert(
						'You have been logged out. The next action will require you to sign in again.'
					)
				})
			})
			.catch((err) => {
				console.error('Error revoking token:', err)
			})
	})
}
