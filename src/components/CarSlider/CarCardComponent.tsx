import React, { use } from "react";
import styled from "styled-components";
import { Car } from "../types/car";
import { Anton } from "@next/font/google";
import { media } from "../../styles/breakpoints";
import theme from "../../styles/theme";
import { usePCQuery, useSPQuery } from "../../hooks/useBreakpoints";

interface CarCardComponentProps {
	car: Car;
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
	${media.SP} {
		font-size: ${theme.fontSizes.subsubContent};
		text-align: center;
	}
	${media.PC} {
		font-size: ${theme.fontSizes.subContent};
		width: 100%;
		text-align: left;
	};
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CarCardComponent: React.FC<CarCardComponentProps> = ({
	car,
	isSelected,
	onClick,
}) => {
	return (
		<Card isSelected={isSelected} onClick={onClick} >
			{usePCQuery() &&
				<CarName className={Anton400.className}>

					{car.car_name} - {car.carmodelnum}
				</CarName>
			}
			<CarImage src={car.image} alt={car.car_name} />
			{useSPQuery() && 
				<CarName className={Anton400.className}>
					{car.car_name} - {car.carmodelnum}
				</CarName>
			}
		</Card>
	)
}
	
;

export default CarCardComponent;
