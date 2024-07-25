import { Car, carInfo } from "@/api/models/models";
import React from "react";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import theme from "../../styles/theme";
import { usePCQuery, useSPQuery } from "../../hooks/useBreakpoints";
import { Anton } from "next/font/google";
import { ContentText } from "../text/TextComponents";

interface CarCardComponentProps {
	userCar: carInfo;
	isSelected: boolean;
	onClick: () => void;
}

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const Card = styled.div<{ isSelected: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 8px;
	background: #1a1a1a;
	${media.SP} {
		width: 280px;
	}
	${media.PC} {
		width: 800px;
	}
	height: auto;
`;

const CarImage = styled.img`
	height: 190px;
	width: 280px;
	object-fit: cover;
	align-self: stretch;
	border-radius: 8px;
`;

const CarName = styled.div`
	color: #fff;
	${media.SP} {
		font-size: ${theme.fontSizes.subsubContent};
		text-align: center;
	}
	${media.PC} {
		font-size: ${theme.fontSizes.subContent};
		width: 100%;
		text-align: left;
	}
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CarCardComponent: React.FC<CarCardComponentProps> = ({
	userCar,
	isSelected,
	onClick,
}) => (
	<Card isSelected={isSelected} onClick={onClick}>
		<CarImage src={userCar.car_image_url} alt={userCar.car_name} />
		<ContentText>
			{userCar.car_name} - {userCar.carmodelnum}
		</ContentText>
	</Card>
);

export default CarCardComponent;
