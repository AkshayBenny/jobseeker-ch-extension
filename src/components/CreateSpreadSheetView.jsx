import React from 'react'
import styled from 'styled-components'
import { handleCreateSpreadsheet } from '../utils/popupUtils'
import ErrorMessageComponent from './ErrorMessage'
import HeaderComponent from './HeaderComponent'

const PopupContainer = styled.div`
	width: 260px;
	background: #1e1e1e;
	color: white;
	padding: 24px;
	font-family: 'Inter', sans-serif;
	text-align: center;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
`

const Heading = styled.h2`
	font-size: 18px;
	font-weight: bold;
`

const Subtext = styled.p`
	font-size: 12px;
	color: #aaa;
	margin-bottom: 15px;
	opacity: 0.8;
`

const InputField = styled.input`
	width: 100%;
	padding: 10px;
	border-radius: 6px;
	border: 1px solid #555;
	background: #2a2a2a;
	color: white;
	font-size: 12px;
	margin-bottom: 12px;
	outline: none;

	&::placeholder {
		color: #888;
	}
`

const CreateButton = styled.button`
	width: 100%;
	background: #ffffff;
	color: #000;
	font-weight: 600;
	font-size: 12px;
	border: none;
	padding: 10px;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: #f1f1f1;
	}
`

export default function CreateSpreadSheetView({
	spreadsheetName,
	setSpreadsheetName,
	setLoading,
	setError,
	setSpreadsheetId,
	error,
	setShowSettings,
	setFirstView
}) {
	return (
		<PopupContainer>
			{/* Header */}
			<HeaderComponent
				settingOption={false}
				setShowSettings={setShowSettings}
			/>

			{/* Content */}
			<ContentContainer>
				<Heading>Create a Google Sheet</Heading>
				<Subtext>
					Set up a sheet to save and track your jobs in a single
					click.
				</Subtext>

				<InputField
					type='text'
					value={spreadsheetName}
					onChange={(e) => setSpreadsheetName(e.target.value)}
					placeholder='Enter Sheet Name*'
				/>

				<CreateButton
					onClick={() =>
						handleCreateSpreadsheet(
							spreadsheetName,
							setLoading,
							setError,
							setSpreadsheetId,
							setFirstView

						)
					}>
					Create Sheet
				</CreateButton>
			</ContentContainer>
			<ErrorMessageComponent error={error} />
		</PopupContainer>
	)
}
