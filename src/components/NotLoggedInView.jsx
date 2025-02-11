import React from 'react'
import styled, { keyframes } from 'styled-components'
import { handleLogin } from '../utils/popupUtils'
import ErrorMessageComponent from './ErrorMessage'
import HeaderComponent from './HeaderComponent'

// Keyframe animation for wave emoji
const waveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(10deg); }
`

// Styled Components
const PopupContainer = styled.div`
	width: 260px;
	background: #1e1e1e;
	color: white;
	/* border-radius: 12px; */
	padding: 24px;
	font-family: 'Inter', sans-serif;
	text-align: center;
`

const PopupContent = styled.div`
	text-align: center;
`

const WelcomeText = styled.h2`
	font-size: 18px;
	font-weight: bold;
`

const Wave = styled.span`
	display: inline-block;
	animation: ${waveAnimation} 1s infinite alternate;
`

const Subtext = styled.p`
	font-size: 12px;
	color: #aaa;
	margin-bottom: 24px;
	opacity: 0.8;
`

const GoogleButton = styled.button`
	width: 100%;
	background: #ffffff;
	color: #000;
	font-weight: bold;
	border: none;
	padding: 10px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	gap: 10px;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: #f1f1f1;
	}
`

const GoogleIcon = styled.img`
	width: 18px;
`

// Main Component
export default function NotLoggedInView({
	setLoading,
	setIsLoggedIn,
	setError,
	error,
	setShowSettings,
}) {
	return (
		<PopupContainer>
			{/* Header */}
			<HeaderComponent
				settingOption={false}
				setShowSettings={setShowSettings}
			/>

			{/* Content */}
			<PopupContent>
				<WelcomeText>
					Welcome <Wave>👋</Wave>
				</WelcomeText>
				<Subtext>
					Sign up with your Google account to get started!
				</Subtext>

				<GoogleButton
					onClick={() =>
						handleLogin(setLoading, setIsLoggedIn, setError)
					}>
					<GoogleIcon
						src='/google.png'
						alt='Google Icon'
					/>
					Signup with Google
				</GoogleButton>
			</PopupContent>
			<ErrorMessageComponent error={error} />
		</PopupContainer>
	)
}
