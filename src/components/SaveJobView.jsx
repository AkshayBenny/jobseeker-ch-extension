import React from 'react'
import styled from 'styled-components'
import { handleSaveJob } from '../utils/popupUtils'
import ErrorMessageComponent from './ErrorMessage'
import HeaderComponent from './HeaderComponent'

const PopupContainer = styled.div`
	width: 260px;
	background: #1e1e1e;
	color: white;
	/* border-radius: 12px; */
	padding: 24px;
	font-family: 'Inter', sans-serif;
	text-align: center;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`

const Heading = styled.h2`
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 4px;
`

const Subtext = styled.p`
	font-size: 12px;
	color: #aaa;
	margin-bottom: 24px;
`

const SaveButton = styled.button`
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

export default function SaveJobView({
	setError,
	setSavedJob,
	setShowSettings,
	error,
	firstView,
	setFirstView,
	spreadsheetName,
}) {
	return (
		<PopupContainer>
			{/* Header */}
			<HeaderComponent
				settingOption={true}
				setShowSettings={setShowSettings}
			/>

			{/* Content */}
			{firstView ? (
				<>
					<Heading>
						Sheet Created <span>🎉</span>
					</Heading>
					<Subtext>
						Jobs will be saved to the Google Sheet
						{spreadsheetName ? ` “${spreadsheetName}”` : ''}.
					</Subtext>
				</>
			) : (
				<Subtext>
					Jobs will be saved to the Google Sheet
					{spreadsheetName ? ` “${spreadsheetName}”` : ''}.
				</Subtext>
			)}

			<SaveButton
				onClick={() =>
					handleSaveJob(setSavedJob, setError, setFirstView)
				}>
				Save Job
			</SaveButton>

			<ErrorMessageComponent error={error} />
		</PopupContainer>
	)
}
