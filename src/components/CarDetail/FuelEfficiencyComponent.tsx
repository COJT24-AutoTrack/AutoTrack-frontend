import React from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { carInfo } from "@/api/models/models";
import { media } from "@/styles/breakpoints";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

interface FuelEfficiencyComponentProps {
	userCar: carInfo | null;
	onClick: () => void;
}

const Card = styled.div`
	display: flex;
	${media.SPandTB} {
	}
	${media.PC} {
		height: 12dvh;
		width: 32dvw;
	}
	padding: 0px 10px;
	@media screen and (min-height: 600px) {
		flex-direction: column;
	}
	@media screen and (max-height: 599px) {
		flex-direction: row;
	}
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
	gap: 5px;
	padding: 0 2dvw;
`;

const Value = styled.span`
	${media.SPandTB} {
		font-size: min(10dvh, 77px);
	}
	${media.PC} {
		font-size: 5dvw;
	}
	@media screen and (max-height: 475px) {
		font-size: 7dvh;
	}
`;

const Unit = styled.span`
	${media.SPandTB} {
		font-size: min(6dvh, 46px);
	}
	${media.PC} {
		font-size: 3dvw;
	}
`;

const FuelEfficiencyComponent: React.FC<FuelEfficiencyComponentProps> = ({
	userCar,
	onClick,
}) => {
	return (
		<Card onClick={onClick}>
			<Text>
				<Value className={Anton400.className}>
					{userCar ? userCar.monthly_fuel_efficiency : "-"}
				</Value>
				<Unit className={Anton400.className}>km/L</Unit>
			</Text>
		</Card>
	);
};

export default FuelEfficiencyComponent;
