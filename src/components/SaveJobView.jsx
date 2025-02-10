import { handleLogout, handleSaveJob } from '../utils/popupUtils'

export default function SaveJobView({
	setError,
	setIsLoggedIn,
	setSpreadsheetId,
}) {
	return (
		<div>
			<button onClick={() => handleSaveJob(setError)}>Save Job</button>
			<button
				onClick={() =>
					handleLogout(setIsLoggedIn, setSpreadsheetId, setError)
				}>
				Logout
			</button>
		</div>
	)
}
