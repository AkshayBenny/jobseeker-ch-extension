import styled, { keyframes } from 'styled-components'
import HeaderComponent from './HeaderComponent'

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
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SpinningImage = styled.img`
	opacity: 0.8;
	width: 16px;
	height: 16px;
	animation: ${spin} 2s linear infinite;
`

const LoadingText = styled.p`
	color: #ffffff;
	font-size: 12px;
	opacity: 0.8;
`

export default function Loader({ setShowSettings }) {
	return (
		<PopupContainer>
			<HeaderComponent
				settingOption={false}
				setShowSettings={setShowSettings}
			/>
			<PopupContent>
				<SpinningImage
					src='/icons/loading.svg'
					alt='Spinning Icon'
				/>
				<LoadingText>Loading...</LoadingText>
			</PopupContent>
		</PopupContainer>
	)
}
