document.getElementById('fetchJob').addEventListener('click', async () => {
	chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
		// Execute the script in the current tab
		const [{ result: jobData }] = await chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			// Wrap the async function so that its result can be returned
			function: async () => {
				// Include the waitForElement helper within the page context
				async function waitForElement(selector, timeout = 3000) {
					return new Promise((resolve) => {
						const intervalTime = 100
						let elapsed = 0
						const interval = setInterval(() => {
							const element = document.querySelector(selector)
							if (element) {
								clearInterval(interval)
								resolve(element)
							}
							elapsed += intervalTime
							if (elapsed >= timeout) {
								clearInterval(interval)
								resolve(null)
							}
						}, intervalTime)
					})
				}

				// Use the same extraction function as defined above
				async function extractJobDetails() {
					let jobTitle = 'Not Found'
					let company = 'Not Found'
					let deadline = 'Not Found'
					let applyLink = window.location.href

					if (window.location.hostname.includes('indeed.com')) {
						let jobElement = document.querySelector(
							'h1[data-testid="jobsearch-JobInfoHeader-title"] span'
						)
						if (jobElement) {
							jobTitle = jobElement.innerText.trim()
						}
						let companyElement = await waitForElement(
							'[data-testid="inlineHeader-companyName"] a',
							3000
						)
						if (companyElement) {
							company = companyElement.innerText.trim()
						}
						let applyElement = document.querySelector(
							'#applyButtonLinkContainer button[buttontype="primary"]'
						)
						if (applyElement) {
							applyLink = applyElement.getAttribute('href')
							if (!applyLink.startsWith('http')) {
								applyLink = `https://uk.indeed.com${applyLink}`
							}
						}
					} else if (
						window.location.hostname.includes('cv-library.co.uk')
					) {
						let companyElement = document.querySelector(
							'span[data-jd-company] a'
						)
						if (companyElement) {
							company = companyElement.innerText.trim()
						}
						let expiryElement = document.querySelector(
							'span.text--semibold.text--medium.sm-no'
						)
						if (expiryElement) {
							deadline = expiryElement.innerText.trim()
						}
						let jobElement =
							document.querySelector('h1, .job-title')
						if (jobElement) {
							jobTitle = jobElement.innerText.trim()
						}
						let applyElement =
							document.querySelector('.apply-button a')
						if (applyElement) {
							applyLink = applyElement.href
						}
					} else {
						let companyElement = document.querySelector(
							'.company-name, .employer'
						)
						if (companyElement) {
							company = companyElement.innerText.trim()
						}
						let deadlineElement = document.querySelector(
							'.apply-by, .deadline'
						)
						if (deadlineElement) {
							deadline = deadlineElement.innerText.trim()
						}
						let jobElement =
							document.querySelector('h1, .job-title')
						if (jobElement) {
							jobTitle = jobElement.innerText.trim()
						}
						let applyElement = document.querySelector(
							'.apply-button a, .apply-link'
						)
						if (applyElement) {
							applyLink = applyElement.href
						}
					}

					return { jobTitle, company, deadline, applyLink }
				}
				return await extractJobDetails()
			},
		})

		// Send the extracted job data to the background script
		chrome.runtime.sendMessage({ action: 'saveJob', data: jobData })
	})
})
