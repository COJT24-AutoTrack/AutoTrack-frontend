import React from "react";
import styled from "styled-components";
import { Anton } from "@next/font/google";
import { carInfo } from "@/api/models/models";
import { media } from "@/styles/breakpoints";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

interface FuelEfficiencyComponentProps {
	userCar: carInfo | null;
	isSelected: boolean;
	onClick: () => void;
}

const Card = styled.div<{ isSelected: boolean }>`
	display: flex;
	${media.SP} {
		height: 18dvh;
	}
	${media.PC} {
		height: 12dvh;
		width: 32dvw;
	}
	padding: 0px 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-self: stretch;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #2b2b2b;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	cursor: pointer;
`;

const Text = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
`;

const Value = styled.span`
	font-size: 96px;
`;

const Unit = styled.span`
	font-size: 36px;
`;

const FuelEfficiencyComponent: React.FC<FuelEfficiencyComponentProps> = ({
	userCar,
	isSelected,
	onClick,
}) => {
	return (
		<Card isSelected={isSelected} onClick={onClick}>
			{userCar && (
				<Text>
					<Value className={Anton400.className}>
						{userCar.monthly_fuel_efficiency}
					</Value>
					<Unit className={Anton400.className}>km/L</Unit>
				</Text>
			)}
		</Card>
	);
};

export default FuelEfficiencyComponent;
