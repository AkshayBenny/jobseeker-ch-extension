import styled from 'styled-components'
import { handleCloseExtension } from '../utils/popupUtils'

const PopupHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 16px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const LogoLink = styled.a`
	text-decoration: none;
	color: inherit;
	cursor: pointer;
`

const Logo = styled.div`
	display: flex;
	align-items: center;
	font-weight: bold;
	font-size: 14px;
`

const HeaderText = styled.p`
	font-size: 14px;
	font-weight: 600;
	margin: 0;
`

const LogoImage = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 6px;
`

const Actions = styled.div`
	display: flex;
	gap: 8px;
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

const ActionIcon = styled.img`
	height: 14px;
	width: 14px;
`

export default function HeaderComponent({ settingOption, setShowSettings }) {
	return (
		<PopupHeader>
			{/* Wrap Logo in an anchor link */}
			<LogoLink
				href='https://akshaybenny.github.io/jobseeker-ch-extension/homepage.html'
				target='_blank'>
				<Logo>
					<LogoImage
						src='/logo.png'
						alt='Job Seeker Logo'
					/>
					<HeaderText>Job Seeker</HeaderText>
				</Logo>
			</LogoLink>
			<Actions>
				{settingOption && (
					<IconButton
						onClick={() => setShowSettings((prev) => !prev)}>
						<ActionIcon src='/icons/settings.svg' />
					</IconButton>
				)}
				<IconButton onClick={handleCloseExtension}>
					<ActionIcon src='/icons/x.svg' />
				</IconButton>
			</Actions>
		</PopupHeader>
	)
}
