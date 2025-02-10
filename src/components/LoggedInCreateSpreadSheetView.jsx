import { handleCreateSpreadsheet } from "../utils/popupUtils";

export default function LoggedInCreateSpreadSheetView({
	spreadsheetName,
	setSpreadsheetName,
	setLoading,
	setError,
	setSpreadsheetId,
}) {
	return (
		<div>
			<p>Create a new spreadsheet to store your job applications.</p>
			<label>
				Spreadsheet Name:{' '}
				<input
					type='text'
					value={spreadsheetName}
					onChange={(e) => setSpreadsheetName(e.target.value)}
				/>
			</label>
			<button
				onClick={() =>
					handleCreateSpreadsheet(
						spreadsheetName,
						setLoading,
						setError,
						setSpreadsheetId
					)
				}>
				Create Spreadsheet
			</button>
		</div>
	)
}
