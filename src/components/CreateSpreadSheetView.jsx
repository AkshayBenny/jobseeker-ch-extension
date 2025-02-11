import React from 'react'
import styled from 'styled-components'
import {
	handleCloseExtension,
	handleCreateSpreadsheet,
} from '../utils/popupUtils'
import { FaTimes } from 'react-icons/fa'

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

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Heading = styled.h2`
	font-size: 16px;
	font-weight: bold;
	margin-top: 10px;
`

const Subtext = styled.p`
	font-size: 13px;
	color: #aaa;
	margin-bottom: 15px;
`

const InputField = styled.input`
	width: 100%;
	padding: 10px;
	border-radius: 6px;
	border: 1px solid #555;
	background: #2a2a2a;
	color: white;
	font-size: 12px;
	margin-bottom: 12px;
	outline: none;

	&::placeholder {
		color: #888;
	}
`

const CreateButton = styled.button`
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

export default function CreateSpreadSheetView({
	spreadsheetName,
	setSpreadsheetName,
	setLoading,
	setError,
	setSpreadsheetId,
}) {
	return (
		<PopupContainer>
			{/* Header */}
			<PopupHeader>
				<Logo>
					<LogoImage
						src='/logo.png'
						alt='Job Seeker Logo'
					/>
					<span>Job Seeker</span>
				</Logo>
				<CloseButton onClick={handleCloseExtension}>
					<FaTimes />
				</CloseButton>
			</PopupHeader>

			{/* Content */}
			<ContentContainer>
				<Heading>Create a Google Sheet</Heading>
				<Subtext>
					Set up a sheet to save and track your jobs in a single
					click.
				</Subtext>

				<InputField
					type='text'
					value={spreadsheetName}
					onChange={(e) => setSpreadsheetName(e.target.value)}
					placeholder='Enter Sheet Name*'
				/>

				<CreateButton
					onClick={() =>
						handleCreateSpreadsheet(
							spreadsheetName,
							setLoading,
							setError,
							setSpreadsheetId
						)
					}>
					Create Sheet
				</CreateButton>
			</ContentContainer>
		</PopupContainer>
	)
}
