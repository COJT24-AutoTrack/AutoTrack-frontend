"use client";

import styled from "styled-components";
import {
	SubContentText,
	SubSubContentText,
	TitleText,
} from "../text/TextComponents";
import BackIcon from "../../public/icons/BackIcon.svg";
import { Anton } from "next/font/google";
import { FuelEfficiency } from "@/api/models/models";
import { useRouter } from "next/navigation";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const Container = styled.div`
	display: flex;
	padding: 0px 15px;
	align-items: center;
	gap: 10px;
	align-self: stretch;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #2b2b2b;
`;

const MileageText = styled(TitleText)`
	color: #fff;
	text-align: center;
	font-size: 64px;
	font-weight: 400;
	line-height: normal;
	display: flex;
	flex-direction: row;
	align-items: baseline;
`;

const MileageSpan = styled(SubContentText)`
	color: #fff;
	font-size: 20px;
`;

const ContainerText = styled(SubSubContentText)`
	color: #fff;
	text-align: center;
	font-size: 15px;
`;

const ContentContainer = styled.div`
	display: flex;
	padding: 10px 5px;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 5px;
	flex: 1 0 0;
	align-self: stretch;
`;

const ButtonConainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 5px;
	align-self: stretch;
`;

const NextPageSVG = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	color: white;
	cursor: pointer;

	svg {
		fill: white;
		width: 12px;
		height: 12px;
		margin-right: 8px;
	}
`;

const CsvButton = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: 2px solid #f12424;
	border-radius: 10px;
	color: #f12424;
	cursor: pointer;
	padding: 5px 10px;
	transition:
		background-color 0.3s,
		color 0.3s;

	&:hover {
		background-color: #f12424;
		color: white;
	}
`;

interface RefuelingCardProps {
	fuelEfficiency?: FuelEfficiency;
}

const RefuelingCard: React.FC<RefuelingCardProps> = ({ fuelEfficiency }) => {
	const router = useRouter();

	const handleDetailClick = () => {
		if (fuelEfficiency) {
			router.push(`/updateFueling?id=${fuelEfficiency.fe_id}`);
		}
	};

	return (
		<Container>
			{fuelEfficiency && (
				<MileageText className={Anton400.className}>
					{fuelEfficiency.fe_mileage}
					<MileageSpan className={Anton400.className}>km/l</MileageSpan>
				</MileageText>
			)}
			<ContentContainer>
				<ContainerText>日付：{fuelEfficiency?.fe_date}</ContainerText>
				<ContainerText>金額：{fuelEfficiency?.fe_amount}円</ContainerText>
				<ContainerText>走行距離：{fuelEfficiency?.fe_mileage}km</ContainerText>
				<ButtonConainer onClick={handleDetailClick}>
					<SubSubContentText>詳細</SubSubContentText>
					<NextPageSVG>
						<BackIcon style={{ fill: "white" }} />
					</NextPageSVG>
				</ButtonConainer>
			</ContentContainer>
		</Container>
	);
};

export default RefuelingCard;
