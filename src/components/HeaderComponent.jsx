import styled from 'styled-components'
import { handleCloseExtension } from '../utils/popupUtils'
import { FaCog, FaTimes } from 'react-icons/fa'

const PopupHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 16px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 24px;
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

export default function HeaderComponent({ settingOption, setShowSettings }) {
	return (
		<PopupHeader>
			<Logo>
				<LogoImage
					src='/logo.png'
					alt='Job Seeker Logo'
				/>
				<HeaderText>Job Seeker</HeaderText>
			</Logo>
			<Actions>
				{settingOption && (
					<IconButton
						onClick={() => setShowSettings((prev) => !prev)}>
						<FaCog />
					</IconButton>
				)}
				<IconButton onClick={handleCloseExtension}>
					<FaTimes />
				</IconButton>
			</Actions>
		</PopupHeader>
	)
}
