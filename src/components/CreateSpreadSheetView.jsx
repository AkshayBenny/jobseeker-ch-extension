import { handleCreateSpreadsheet } from '../utils/popupUtils'

export default function CreateSpreadSheetView({
	spreadsheetName,
	setSpreadsheetName,
	setLoading,
	setError,
	setSpreadsheetId,
}) {
	return (
		<div>
			<p>Create a Google Sheet</p>
			<p>Set up a sheet to save and track your jobs in a single click.</p>

			<input
				type='text'
				value={spreadsheetName}
				onChange={(e) => setSpreadsheetName(e.target.value)}
				placeholder='Enter Sheet Name'
			/>

			<button
				onClick={() =>
					handleCreateSpreadsheet(
						spreadsheetName,
						setLoading,
						setError,
						setSpreadsheetId
					)
				}>
				Create Sheet
			</button>
		</div>
	)
}
