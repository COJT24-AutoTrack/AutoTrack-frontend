import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface MaintenanceDetailProps {
	title: string;
	lastMaintenanceDate: string;
	detail: string;
	onDetailClick: () => void;
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
	padding: 20px 0;
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

const MaintenanceDetail: React.FC<MaintenanceDetailProps> = ({
	title,
	lastMaintenanceDate,
	detail,
	onDetailClick,
}) => {
	return (
		<Container>
			<Title>
				{title}
				<DetailButton onClick={onDetailClick}>詳細</DetailButton>
			</Title>
			<Explanation>
				<DateText>前回メンテナンス日: {lastMaintenanceDate}</DateText>
				<DetailText>{detail}</DetailText>
			</Explanation>
		</Container>
	);
};

export default MaintenanceDetail;
