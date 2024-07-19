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
		height: 152px;
	};
	${media.PC} {
		height: 100px;
		width: 400px;
	};
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
	// 直近1ヶ月分の燃費の平均を計算
	const calculateMonthlyAverage = () => {
		if (!userCar || !userCar.FuelEfficiency.length) return 0;
		const now = new Date();
		const oneMonthAgo = new Date(now);
		oneMonthAgo.setMonth(now.getMonth() - 1);

		const lastMonthFuelEfficiencies = userCar.FuelEfficiency.filter(
			(fe) => new Date(fe.fe_date) >= oneMonthAgo,
		);

		if (lastMonthFuelEfficiencies.length === 0) return 0;

		const totalMileage = lastMonthFuelEfficiencies.reduce(
			(total, fe) => total + fe.fe_mileage,
			0,
		);
		const totalAmount = lastMonthFuelEfficiencies.reduce(
			(total, fe) => total + fe.fe_amount,
			0,
		);

		return totalMileage / totalAmount;
	};

	const averageFuelEfficiency = calculateMonthlyAverage();

	return (
		<Card isSelected={isSelected} onClick={onClick}>
			{userCar && (
				<Text>
					<Value className={Anton400.className}>
						{averageFuelEfficiency.toFixed(2)}
					</Value>
					<Unit className={Anton400.className}>km/L</Unit>
				</Text>
			)}
		</Card>
	);
};

export default FuelEfficiencyComponent;
