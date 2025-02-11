// Helper function: Waits for an element to appear in the DOM
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

// parse datetime for deadline column so user can sort it
async function extractJobDetails() {
	let jobTitle = 'Not Found'
	let company = 'Not Found'
	let deadline = 'Not Found'
	let applyLink = window.location.href // Default URL

	switch (true) {
		case window.location.hostname.includes('indeed.com'):
			{
				// Indeed extraction
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
			}
			break

		case window.location.hostname.includes('cv-library.co.uk'):
			{
				// CV-Library extraction
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
				let jobElement = document.querySelector('h1, .job-title')
				if (jobElement) {
					jobTitle = jobElement.innerText.trim()
				}
				let applyElement = document.querySelector('.apply-button a')
				if (applyElement) {
					applyLink = applyElement.href
				}
			}
			break

		case window.location.hostname.includes('linkedin.com'):
			{
				// LinkedIn extraction
				const companyElement = document.querySelector(
					'.job-details-jobs-unified-top-card__company-name a'
				)
				if (companyElement) {
					company = companyElement.innerText.trim()
				}
				const jobTitleElement = document.querySelector(
					'.job-details-jobs-unified-top-card__job-title h1'
				)
				if (jobTitleElement) {
					jobTitle = jobTitleElement.innerText.trim()
				}

				// Determine if the job posting uses "Easy Apply" or an external application link
				const applyButton = document.querySelector(
					'.jobs-apply-button--top-card button'
				)
				if (applyButton) {
					const ariaLabel = applyButton.getAttribute('aria-label')
					if (ariaLabel && ariaLabel.includes('on company website')) {
						// External application link: try to get the URL from a parent anchor
						const applyButtonParent = applyButton.closest('a')
						if (applyButtonParent && applyButtonParent.href) {
							applyLink = applyButtonParent.href
						} else {
							console.log('External application URL not found.')
						}
					} else {
						// Easy Apply: use the current page URL
						applyLink = window.location.href
					}
				}
			}
			break

		case window.location.hostname.includes('reed.co.uk'):
			{
				// Reed.co.uk extraction
				const jobTitleElement = document.querySelector(
					'div[data-qa="job-title"]'
				)
				if (jobTitleElement) {
					jobTitle = jobTitleElement.innerText.trim()
				}
				const companyElement = document.querySelector(
					'div[data-qa="job-posted-by"]'
				)
				if (companyElement) {
					const companyText = companyElement.innerText.trim()
					const byIndex = companyText.lastIndexOf(' by ')
					if (byIndex !== -1) {
						company = companyText.substring(byIndex + 4)
					}
				}
			}
			break

		case window.location.hostname.includes('totaljobs.com'):
			{
				// Totaljobs extraction
				let jobElement = document.querySelector(
					'h1[data-genesis-element="TEXT"][data-at="header-job-title"]'
				)
				if (jobElement) {
					jobTitle = jobElement.innerText.trim()
				}
				let companyElement = document.querySelector(
					'li[data-genesis-element="TEXT"][data-at="metadata-company-name"] a span[data-genesis-element="TEXT"] span'
				)
				if (companyElement) {
					company = companyElement.innerText.trim()
				}
				applyLink = window.location.href
			}
			break

		default: {
			// Fallback extraction for other sites
			let companyElement = document.querySelector(
				'.company-name, .employer'
			)
			if (companyElement) {
				company = companyElement.innerText.trim()
			}
			// let deadlineElement = document.querySelector('.apply-by, .deadline')
			// if (deadlineElement) {
			// 	deadline = deadlineElement.innerText.trim()
			// }
			let jobElement = document.querySelector('h1, .job-title')
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
	}

	return { jobTitle, company, applyLink }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'getJobDetails') {
		extractJobDetails().then((result) => {
			sendResponse(result)
		})
		return true // Asynchronous response indicator
	}
})
