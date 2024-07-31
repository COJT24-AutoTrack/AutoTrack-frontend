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
								<DetailCardComponent
									label={"Mileage"}
									value={selectedCar ? selectedCar.car_mileage : 0}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"Fuel Cost"}
									value={selectedCar ? selectedCar.total_gas_cost : 0}
									unit={"Yen"}
								/>
							</HStack>
						)}
						{isSP && (
							<HStack>
								<DetailCardComponent
									label={"Car Wash"}
									value={selectedCar ? selectedCar.odd_after_wash : 0}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"Tires"}
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
								<DetailCardComponent
									label={"Mileage"}
									value={selectedCar ? selectedCar.car_mileage : 0}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"Total Fuel Cost"}
									value={selectedCar ? selectedCar.total_gas_cost : 0}
									unit={"Yen"}
								/>
								<DetailCardComponent
									label={"Car Wash"}
									value={selectedCar ? selectedCar.odd_after_wash : 0}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"Tires"}
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
