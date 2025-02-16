import React from 'react'
import styled from 'styled-components'
import ErrorMessageComponent from './ErrorMessage'
import HeaderComponent from './HeaderComponent'

const PopupContainer = styled.div`
	width: 260px;
	background: #1e1e1e;
	color: white;
	padding: 24px;
	font-family: 'Inter', sans-serif;
	text-align: center;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`

const Heading = styled.h2`
	font-size: 18px;
	font-weight: bold;
`

const JobTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin: 16px 0px 24px 0px;
`

const JobRow = styled.tr``

const PropertyCell = styled.td`
	font-weight: 600;
	font-size: 12px;
	color: white;
	padding: 4px 8px;
	white-space: nowrap;
	text-align: start;
	vertical-align: top; /* Align content to the top */
`

const ValueCell = styled.td`
	font-size: 12px;
	color: white;
	padding: 4px 8px;
	word-break: break-all;
	text-align: start;
	vertical-align: top; /* Align content to the top */
	opacity: 0.8;
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

export default function JobSavedView({
	savedJob,
	spreadsheetId,
	error,
	setShowSettings,
}) {
	if (!savedJob) {
		return <p>No job details available.</p>
	}

	const { company, jobTitle, deadline, applyLink } = savedJob
	const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
	const truncatedApplyLink =
		applyLink.length > 30 ? `${applyLink.substring(0, 30)}...` : applyLink

	return (
		<PopupContainer>
			{/* Header */}
			<HeaderComponent
				settingOption={true}
				setShowSettings={setShowSettings}
			/>

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
						<PropertyCell>Deadline</PropertyCell>
						<PropertyCell>:</PropertyCell>
						<ValueCell>{deadline}</ValueCell>
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
			<ErrorMessageComponent error={error} />
		</PopupContainer>
	)
}
