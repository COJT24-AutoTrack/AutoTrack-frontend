"use client";

import React, { useState } from "react";
import CarSliderComponent from "./CarSlider/CarSliderComponent";
import styled from "styled-components";
import FuelEfficiencyComponent from "./CarDetail/FuelEfficiencyComponent";
import DetailCardComponent from "./CarDetail/DetailCardComponent";
import { carInfo } from "@/api/models/models";
import { useSPQuery, usePCQuery } from "../hooks/useBreakpoints";

const MenuContainer = styled.div`
	display: flex;
	height: 414px;
	padding: 0px 20px;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	align-self: stretch;
`;

const BottonMenues = styled.div`
	display: flex;
	padding: 0px 1px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	align-self: stretch;
`;

const BlockMenus = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	align-self: stretch;
`;

const HStack = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	align-self: stretch;
`;

const HomeClient: React.FC<{ userCars: carInfo[] }> = ({ userCars }) => {
	const [selectedCar, setSelectedCar] = useState<carInfo | null>(null);

	const isSP = useSPQuery();
	const isPC = usePCQuery();

	const handleSelectCar = (car: carInfo) => {
		setSelectedCar(car);
	};

	console.log(selectedCar);

	// 直近1ヶ月でかかったガソリン代を計算
	const calculateMonthlyGasCost = () => {
		if (
			!selectedCar ||
			!selectedCar.fuel_efficiency ||
			!selectedCar.fuel_efficiency.length
		)
			return 0;
		const now = new Date();
		const oneMonthAgo = new Date(now);
		oneMonthAgo.setMonth(now.getMonth() - 1);

		const lastMonthFuelEfficiencies = selectedCar.fuel_efficiency.filter(
			(fe) => new Date(fe.fe_date) >= oneMonthAgo,
		);

		if (lastMonthFuelEfficiencies.length === 0) return 0;

		const totalGasCost = lastMonthFuelEfficiencies.reduce(
			(total, fe) => total + fe.fe_amount * fe.fe_unitprice,
			0,
		);

		return totalGasCost;
	};

	const gasCost = calculateMonthlyGasCost();

	return (
		<main style={{ paddingTop: "10px" }}>
			<CarSliderComponent userCars={userCars} onSelectCar={handleSelectCar} />
			<MenuContainer>
				<BottonMenues>
					{isSP && (
						<FuelEfficiencyComponent
							userCar={selectedCar}
							isSelected={!!selectedCar}
							onClick={() => {
								// ここにクリック時の動作を実装
							}}
						/>
					)}
					<BlockMenus>
						{isSP && (
							<HStack>
								<DetailCardComponent label={"ODO"} value={0} unit={"Km"} />
								<DetailCardComponent
									label={"GAS COST"}
									value={gasCost}
									unit={"Yen"}
								/>
							</HStack>
						)}
						{isSP && (
							<HStack>
								<DetailCardComponent
									label={"ODO AFTER WASH"}
									value={selectedCar ? selectedCar.odd_after_wash : 0}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"ODO AFTER exchange"}
									value={selectedCar ? selectedCar.odd_after_exchange : 0}
									unit={"Km"}
								/>
							</HStack>
						)}
						{isPC && (
							<HStack>
								<FuelEfficiencyComponent
									userCar={selectedCar}
									isSelected={!!selectedCar}
									onClick={() => {
										// ここにクリック時の動作を実装
									}}
								/>
								<DetailCardComponent label={"ODO"} value={0} unit={"Km"} />
								<DetailCardComponent
									label={"GAS COST"}
									value={gasCost}
									unit={"Yen"}
								/>
								<DetailCardComponent
									label={"ODO AFTER WASH"}
									value={selectedCar ? selectedCar.odd_after_wash : 0}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"ODO AFTER exchange"}
									value={selectedCar ? selectedCar.odd_after_exchange : 0}
									unit={"Km"}
								/>
							</HStack>
						)}
					</BlockMenus>
				</BottonMenues>
			</MenuContainer>
		</main>
	);
};

export default HomeClient;
