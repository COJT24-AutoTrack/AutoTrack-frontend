import { Car, carInfo } from "@/api/models/models";
import React from "react";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import { ContentText } from "../text/TextComponents";

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
	}
	${media.PC} {
		width: 800px;
	}
	height: auto;
`;

const CarImage = styled.img`
	height: auto;
	align-self: stretch;
	border-radius: 8px;
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
