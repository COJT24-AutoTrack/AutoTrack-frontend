import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import theme from '@/styles/theme';
import BackIcon from '@/public/icons/BackIcon.svg';

interface MaintenanceDetailProps {
	title: string;
	lastMaintenanceDate: string;
	detail: string;
	detailUrl: string; // ここに detailUrl を追加
}

const Container = styled.div`
	margin: 0 0 10px 0;
`;

const Title = styled.div`
	background-color: ${theme.colors.cardBackground};
	font-size: ${theme.fontSizes.subContent};
	display: flex;
	justify-content: space-between;
	height: 50px;
	align-items: center;
	margin: 0;
	padding: 0 0 0 10px;
`;

const Explanation = styled.div`
	background-color: ${theme.colors.background};
	margin: 0;
	padding: 20px;
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

const MaintenanceDetail: React.FC<MaintenanceDetailProps> = ({ title, lastMaintenanceDate, detail, detailUrl }) => {
	return (
		<Container>
			<Title>
				{title}
				<Link href={detailUrl} passHref>
					<DetailButton>詳細 <BackIcon fill="#696969" width="10px" height="10px" /></DetailButton>
				</Link>
			</Title>
			<Explanation>
				<DateText>前回メンテナンス日: {lastMaintenanceDate}</DateText>
				<DetailText>内容: {detail}</DetailText>
			</Explanation>
		</Container>
	);
};

export default MaintenanceDetail;
