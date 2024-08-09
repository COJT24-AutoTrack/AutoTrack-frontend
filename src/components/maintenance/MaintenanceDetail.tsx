import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface MaintenanceDetailProps {
	maintType: string;
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
	padding: 0 20px;
`;

const Explanation = styled.div`
	background-color: ${theme.colors.background};
	margin: 0;
	padding: 20px 30px 20px 20px;
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
	font-size: ${theme.fontSizes.subContent};
`;

const MaintenanceDetail: React.FC<MaintenanceDetailProps> = ({
	maintType,
	title,
	lastMaintenanceDate,
	detail,
	onDetailClick,
}) => {
	return (
		<Container>
			<Title>
				{maintType}
				<DetailButton onClick={onDetailClick}>&gt;</DetailButton>
			</Title>

			<Explanation>
				{maintType === "その他" && <DetailText>{title}</DetailText>}
				<DateText>前回メンテナンス日: {lastMaintenanceDate}</DateText>
				<DetailText>{detail}</DetailText>
			</Explanation>
		</Container>
	);
};

export default MaintenanceDetail;
