export default function JobSavedView({ savedJob, spreadsheetId }) {
	if (!savedJob) {
		return <p>No job details available.</p>
	}

	const { company, jobTitle, applyLink } = savedJob
	const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`

	return (
		<div>
			<h3>Job Saved</h3>
			<p>
				<strong>Company Name:</strong> {company}
			</p>
			<p>
				<strong>Job Title:</strong> {jobTitle}
			</p>
			<p>
				<strong>Job URL:</strong>{' '}
				<a
					href={applyLink}
					target='_blank'
					rel='noopener noreferrer'>
					{applyLink}
				</a>
			</p>
			<button onClick={() => window.open(sheetUrl, '_blank')}>
				View in sheet
			</button>
		</div>
	)
}
