import React from 'react'
import styled, { keyframes } from 'styled-components'
import { handleLogin } from '../utils/popupUtils'
import { FaTimes } from 'react-icons/fa'

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
	border-radius: 12px;
	padding: 15px;
	font-family: 'Inter', sans-serif;
	text-align: center;
`

const PopupHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #333;
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

const CloseButton = styled.button`
	background: none;
	border: none;
	color: #bbb;
	cursor: pointer;
	font-size: 14px;

	&:hover {
		color: red;
	}
`

const PopupContent = styled.div`
	text-align: center;
	padding-top: 15px;
`

const WelcomeText = styled.h2`
	font-size: 18px;
	font-weight: bold;
	margin-top: 10px;
`

const Wave = styled.span`
	display: inline-block;
	animation: ${waveAnimation} 1s infinite alternate;
`

const Subtext = styled.p`
	font-size: 13px;
	color: #aaa;
	margin-bottom: 15px;
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
}) {
	return (
		<PopupContainer>
			{/* Header */}
			<PopupHeader>
				<Logo>
					<LogoImage
						src='/logo-large.png'
						alt='Job Seeker Logo'
					/>
					<span>Job Seeker</span>
				</Logo>
				<CloseButton>
					<FaTimes />
				</CloseButton>
			</PopupHeader>

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
		</PopupContainer>
	)
}
