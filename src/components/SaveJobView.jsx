import React from 'react'
import styled from 'styled-components'
import { handleCloseExtension, handleSaveJob } from '../utils/popupUtils'
import { FaTimes, FaCog } from 'react-icons/fa'
import ErrorMessageComponent from './ErrorMessage'
import HeaderComponent from './HeaderComponent'

const PopupContainer = styled.div`
	width: 260px;
	background: #1e1e1e;
	color: white;
	/* border-radius: 12px; */
	padding: 15px;
	font-family: 'Inter', sans-serif;
	text-align: center;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`

const PopupHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 16px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const Logo = styled.div`
	display: flex;
	align-items: center;
	font-weight: bold;
	font-size: 14px;
`

const LogoImage = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 6px;
`

const Actions = styled.div`
	display: flex;
	gap: 10px;
`

const IconButton = styled.button`
	background: none;
	border: none;
	color: #bbb;
	cursor: pointer;
	font-size: 14px;

	&:hover {
		color: red;
	}
`

const Heading = styled.h2`
	font-size: 16px;
	font-weight: bold;
`

const Subtext = styled.p`
	font-size: 13px;
	color: #aaa;
	margin-bottom: 15px;
`

const SaveButton = styled.button`
	width: 100%;
	background: #ffffff;
	color: #000;
	font-weight: bold;
	border: none;
	padding: 10px;
	border-radius: 8px;
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
}) {
	return (
		<PopupContainer>
			{/* Header */}
			<HeaderComponent
				settingOption={true}
				setShowSettings={setShowSettings}
			/>

			{/* Content */}
			<Heading>
				Sheet Created <span>🎉</span>
			</Heading>
			<Subtext>Start saving jobs with a single click.</Subtext>

			<SaveButton onClick={() => handleSaveJob(setSavedJob, setError)}>
				Save Job
			</SaveButton>

			<ErrorMessageComponent error={error} />
		</PopupContainer>
	)
}
{
	/* <button
				onClick={() =>
					handleLogout(setIsLoggedIn, setSpreadsheetId, setError)
				}>
				Logout
			</button> */
}
