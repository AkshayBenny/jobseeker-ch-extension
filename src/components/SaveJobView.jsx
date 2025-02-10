import { handleLogout, handleSaveJob } from '../utils/popupUtils'

export default function SaveJobView({
	setError,
	setIsLoggedIn,
	setSpreadsheetId,
	setSavedJob,
}) {
	return (
		<div>
			<p>Sheet Created</p>
			<p>Start saving jobs with a single click.</p>
			<button onClick={() => handleSaveJob(setSavedJob, setError)}>
				Save Job
			</button>
			<button
				onClick={() =>
					handleLogout(setIsLoggedIn, setSpreadsheetId, setError)
				}>
				Logout
			</button>
		</div>
	)
}
