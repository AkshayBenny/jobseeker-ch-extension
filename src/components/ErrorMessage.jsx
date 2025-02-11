import styled from 'styled-components'

const ErrorContainer = styled.div`
	width: 100%;
	background: rgba(255, 124, 124, 0.1);
	border: 1px solid rgba(255, 124, 124, 0.4);
	border-radius: 6px;
	margin-top: 24px;
	padding: 8px;
`

const ErrorMessage = styled.p`
	font-size: 12px;
	color: rgba(255, 124, 124, 0.8);
`

export default function ErrorMessageComponent({ error }) {
	if (!error || error === '') return <></>
	return (
		<ErrorContainer>
			<ErrorMessage>{error}</ErrorMessage>
		</ErrorContainer>
	)
}

// spacing issue under create google sheet heading view