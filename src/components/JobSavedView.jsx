import React from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { handleCloseExtension } from '../utils/popupUtils'

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

const Heading = styled.h2`
	font-size: 16px;
	font-weight: bold;
	margin-top: 10px;
`

const JobDetails = styled.div`
	text-align: left;
	font-size: 13px;
	color: #ddd;
	margin: 10px 0;
`

const DetailRow = styled.p`
	margin: 5px 0;
	font-size: 13px;
	display: flex;
	align-items: center;
	justify-content: start;

	strong {
		font-weight: bold;
		color: white;
	}
`

const TruncatedLink = styled.a`
	color: #4c9aff;
	text-decoration: none;
	word-break: break-all;
	display: inline-block;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

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

	const { company, jobTitle, applyLink, deadline } = savedJob
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

			<JobDetails>
				<DetailRow>
					<strong>Company :</strong> {company}
				</DetailRow>
				<DetailRow>
					<strong>Job Title :</strong> {jobTitle}
				</DetailRow>
				{/* <DetailRow>
					<strong>Deadline :</strong> {deadline}
				</DetailRow> */}
				<DetailRow>
					<strong>Apply Link :</strong>{' '}
					<TruncatedLink
						href={applyLink}
						target='_blank'
						rel='noopener noreferrer'>
						{truncatedApplyLink}
					</TruncatedLink>
				</DetailRow>
			</JobDetails>

			<ViewSheetButton onClick={() => window.open(sheetUrl, '_blank')}>
				View in Sheet
			</ViewSheetButton>
		</PopupContainer>
	)
}
