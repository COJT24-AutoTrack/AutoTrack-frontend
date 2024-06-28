import React from "react";
import styled from "styled-components";
import { Car } from "../types/car";

interface CarCardComponentProps {
	car: Car;
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
	width: 280px;
	height: auto;
`;

const CarImage = styled.img`
	height: 192px;
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
	car,
	isSelected,
	onClick,
}) => (
	<Card isSelected={isSelected} onClick={onClick}>
		<CarImage src={car.image} alt={car.car_name} />
		<CarName>
			{car.car_name} - {car.carmodelnum}
		</CarName>
	</Card>
);

export default CarCardComponent;
