import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import theme from '@/styles/theme';
import BackIcon from '../../../public/icons/BackIcon.svg';

interface DetailCardProps {
	title: string;
	lastMaintenanceDate: string;
	detail: string;
}

const Container = styled.div`
	margin: 0 0 5px 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 25px;
	height: 50px;
	background-color: ${theme.colors.cardBackground};
`;

const DateText = styled.p`
	font-size: ${theme.fontSizes.subsubContent};
	margin: 0;
`;

const DetailText = styled.p`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: ${theme.fontSizes.subsubContent};
	margin: 0;
`;

const DetailButton = styled.button`
	background-color: ${theme.colors.cardBackground};
	color: #696969;
	border: none;
	padding: 10px;
	cursor: pointer;
`;

const MaintenanceDetail: React.FC<DetailCardProps> = ({ title, lastMaintenanceDate, detail }) => {
	const [showDetail, setShowDetail] = useState(false);

	const toggleDetail = () => {
		setShowDetail(!showDetail);
	};

	return (
		<Container>
			<div>
				<DateText>日付: {lastMaintenanceDate}</DateText>
				<DetailText>{detail}</DetailText>
			</div>
			<Link href="/maintenance/detail" passHref>
				<DetailButton onClick={toggleDetail}>編集 
					<BackIcon fill="#696969" width="10px" height="10px" />
				</DetailButton>
			</Link>
		</Container>
	);
};

export default MaintenanceDetail;
