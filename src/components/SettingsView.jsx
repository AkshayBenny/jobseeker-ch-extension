import React from 'react'
import styled from 'styled-components'
import { FaTimes, FaCog } from 'react-icons/fa'
import {
	handleCloseExtension,
	handleCreateNewSheet,
	handleLogout,
} from '../utils/popupUtils'
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
	padding-bottom: 10px;
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
	text-align: start;
`

const Subtext = styled.p`
	font-size: 13px;
	color: #aaa;
	margin-bottom: 15px;
	text-align: start;
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

const WarningText = styled.p`
	font-size: 13px;
	color: #aaa;
	margin-bottom: 16px;
	margin-top: 24px;
	text-align: start;
`
const LogoutButton = styled.button`
	width: 100%;
	background: transparent;
	color: #ff6363;
	font-weight: bold;
	border: 1.5px solid #ff6363;
	padding: 10px;
	border-radius: 8px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: #ff6363;
		color: #ffffff;
	}
`

export default function SettingsView({
	setIsLoggedIn,
	setSpreadsheetId,
	setError,
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
			<Heading>Set up a new sheet?</Heading>
			<Subtext>Your previous sheet won&apos;t be used anymore.</Subtext>
			<SaveButton
				onClick={() =>
					handleCreateNewSheet(
						setSpreadsheetId,
						setError,
						setShowSettings
					)
				}>
				Create New Sheet
			</SaveButton>

			<WarningText>
				Warning: Logging out will disable job saving. You can log in
				anytime to continue.
			</WarningText>
			<LogoutButton
				onClick={() =>
					handleLogout(
						setIsLoggedIn,
						setSpreadsheetId,
						setShowSettings,
						setError
					)
				}>
				Logout
			</LogoutButton>
			<ErrorMessageComponent error={error} />
		</PopupContainer>
	)
}
