import { Car, carInfo } from "@/api/models/models";
import React from "react";
import styled from "styled-components";
import { Car } from "../types/car";
import { media } from "../../styles/breakpoints";

interface CarCardComponentProps {
	userCar: carInfo;
	isSelected: boolean;
	onClick: () => void;
}

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
	};
	${media.PC} {
		width: 800px;
	};
	height: auto;
`;

const CarImage = styled.img`
	height: auto;
	align-self: stretch;
	border-radius: 8px;
`;

const CarName = styled.div`
	color: #fff;
	text-align: center;
	font-family: Inter;
	font-size: 16px;
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
		<CarName>
			{userCar.car_name} - {userCar.carmodelnum}
		</CarName>
	</Card>
);

export default CarCardComponent;
