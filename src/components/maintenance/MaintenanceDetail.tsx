import { ChevronRightIcon } from "lucide-react";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
	background-color: #2b2b2b;
	border-radius: 8px;
	overflow: hidden;
`;

const Title = styled.div`
	background-color: rgba(255, 255, 255, 0.1);
	font-size: 18px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 20px;
`;

const Content = styled.div`
	padding: 20px;
`;

const DateText = styled.p`
	font-size: 14px;
	color: #999;
	margin: 0 0 10px 0;
`;

const DetailText = styled.p`
	font-size: 16px;
	margin: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const DetailButton = styled.button`
	background-color: transparent;
	color: #ffffff;
	border: none;
	font-size: 20px;
	cursor: pointer;
	padding: 5px 10px;
	transition: background-color 0.3s;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

interface MaintenanceDetailProps {
	maintType: string;
	title: string;
	lastMaintenanceDate: string;
	detail: string;
	onDetailClick: () => void;
}

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
				<DetailButton onClick={onDetailClick}>
					<ChevronRightIcon />
				</DetailButton>
			</Title>
			<Content>
				{maintType === "その他" && <DetailText>{title}</DetailText>}
				<DateText>前回メンテナンス日: {lastMaintenanceDate}</DateText>
				<DetailText>{detail}</DetailText>
			</Content>
		</Container>
	);
};

export default MaintenanceDetail;