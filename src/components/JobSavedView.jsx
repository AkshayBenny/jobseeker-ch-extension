import React from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { handleCloseExtension } from '../utils/popupUtils'

const PopupContainer = styled.div`
	width: 260px;
	background: #1e1e1e;
	color: white;
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

const Heading = styled.h2`
	font-size: 16px;
	font-weight: bold;
	margin-top: 10px;
`

const JobTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin: 10px 0;
`

const JobRow = styled.tr``

const PropertyCell = styled.td`
	font-weight: bold;
	color: white;
	padding: 4px 8px;
	white-space: nowrap;
	text-align: start;
	vertical-align: top; /* Align content to the top */
`

const ValueCell = styled.td`
	font-size: 13px;
	color: #ddd;
	padding: 4px 8px;
	word-break: break-all;
	text-align: start;
	vertical-align: top; /* Align content to the top */
`
const TruncatedLink = styled.a`
	color: #4c9aff;
	text-decoration: none;
	display: -webkit-box;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2; /* Limit to 2 lines */
	-webkit-box-orient: vertical; /* Specify vertical orientation */
	word-break: break-word; /* Allow long words to break */

	&:hover {
		text-decoration: underline;
	}
`

const ViewSheetButton = styled.button`
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

export default function JobSavedView({ savedJob, spreadsheetId }) {
	if (!savedJob) {
		return <p>No job details available.</p>
	}

	const { company, jobTitle, applyLink } = savedJob
	const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
	const truncatedApplyLink =
		applyLink.length > 30 ? `${applyLink.substring(0, 30)}...` : applyLink

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
			<Heading>
				Job Saved <span>🔥</span>
			</Heading>

			<JobTable>
				<tbody>
					<JobRow>
						<PropertyCell>Company</PropertyCell>
						<PropertyCell>:</PropertyCell>
						<ValueCell>{company}</ValueCell>
					</JobRow>
					<JobRow>
						<PropertyCell>Job Title</PropertyCell>
						<PropertyCell>:</PropertyCell>
						<ValueCell>{jobTitle}</ValueCell>
					</JobRow>
					<JobRow>
						<PropertyCell>Apply Link</PropertyCell>
						<PropertyCell>:</PropertyCell>
						<ValueCell>
							<TruncatedLink
								href={applyLink}
								target='_blank'
								rel='noopener noreferrer'>
								{truncatedApplyLink}
							</TruncatedLink>
						</ValueCell>
					</JobRow>
				</tbody>
			</JobTable>

			<ViewSheetButton onClick={() => window.open(sheetUrl, '_blank')}>
				View in Sheet
			</ViewSheetButton>
		</PopupContainer>
	)
}
