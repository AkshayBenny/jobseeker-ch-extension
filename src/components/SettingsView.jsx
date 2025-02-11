import styled from 'styled-components'
import { handleCreateNewSheet, handleLogout } from '../utils/popupUtils'
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
	text-align: start;
	margin-bottom: 4px;
`

const Subtext = styled.p`
	font-size: 12px;
	color: white;
	margin-bottom: 16px;
	text-align: start;
	opacity: 0.8;
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
	border-radius: 6px;
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
