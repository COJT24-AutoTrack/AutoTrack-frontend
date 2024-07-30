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
import { media } from "@/styles/breakpoints";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const Container = styled.div`
	display: flex;
	${media.SP} {
		padding: 0px 15px;
	}
	${media.PC} {
		padding: 0px 30px;
	}
	align-items: center;
	align-self: stretch;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #2b2b2b;
	position: relative;
`;

const MileageText = styled(TitleText)`
	color: #fff;
	text-align: center;
	${media.SP} {
		font-size: 40px;
	}
	${media.PC} {
		font-size: 64px;
	}
	font-weight: 400;
	line-height: normal;
	display: flex;
	flex: 1;
	justify-content: center;
	flex-direction: row;
	align-items: baseline;
`;

const MileageSpan = styled(SubContentText)`
	color: #fff;
	font-size: 20px;
	line-height: 1;
	margin-left: 8px;
`;

const TextContainer = styled(SubSubContentText)`
	color: #fff;
	text-align: right;
	font-size: 15px;
	overflow: hidden;
	white-space: nowrap;
`;

const ContentContainer = styled.div`
	display: flex;
	padding: 10px 5px;
	gap: 5px;
	flex: 1;
	${media.SP} {
		flex-direction: column;
		align-items: flex-end;
	}	
	${media.PC} {
		flex-direction: row;
		align-items: center;
		gap: 20px;
	}	
`;

const ButtonContainer = styled.div`
	right: 10px;
	top: 50%;
	display: flex;
	width: 30px;
	align-items: end;
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
		width: 20px;
		height: 20px;
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

	const formatDate = (dateString: string) => {
		return dateString.split("T")[0];
	};

	const formatNumber = (number: number) => {
		return number.toFixed(2).padStart(5, "0");
	};

	const calculateFuelEfficiency = () => {
		if (!fuelEfficiency || fuelEfficiency.fe_amount === 0) return "00.00";
		return formatNumber(fuelEfficiency.fe_mileage / fuelEfficiency.fe_amount);
	};

	const calculateTotalCost = () => {
		if (!fuelEfficiency) return "0";
		return (fuelEfficiency.fe_amount * fuelEfficiency.fe_unitprice).toFixed(0);
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
				<TextContainer>
					{fuelEfficiency ? formatDate(fuelEfficiency.fe_date) : ""}
				</TextContainer>
				<TextContainer>
					{fuelEfficiency ? calculateTotalCost() : 0} 円
				</TextContainer>
				<TextContainer>{fuelEfficiency?.fe_mileage} km</TextContainer>
			</ContentContainer>
			<ButtonContainer>
				<NextPageSVG onClick={handleDetailClick}>
					<BackIcon style={{ fill: "white" }} />
				</NextPageSVG>
			</ButtonContainer>
		</Container>
	);
};

export default RefuelingCard;
