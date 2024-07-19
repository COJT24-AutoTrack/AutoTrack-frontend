"use client";

import React, { useState } from "react";
import CarSliderComponent from "./CarSlider/CarSliderComponent";
import { Car } from "./types/car";
import styled from "styled-components";
import FuelEfficiencyComponent from "./CarDetail/FuelEfficiencyComponent";
import DetailCardComponent from "./CarDetail/DetailCardComponent";
import { useSPQuery, usePCQuery } from "../hooks/useBreakpoints";
import { media } from "@/styles/breakpoints";

const demoCars: Car[] = [
	{
		car_id: 1,
		car_name: "Toyota Prius",
		carmodelnum: "X123",
		car_color: "Blue",
		car_mileage: 10000,
		car_isflooding: false,
		car_issmoked: false,
		fuelEfficiency: 14.2,
		image:
			"https://www.automesseweb.jp/wp-content/uploads/2022/07/01_AMW_20220720_Maclaren_F1-1200x800.jpg",
	},
	{
		car_id: 2,
		car_name: "Honda Accord",
		carmodelnum: "Y456",
		car_color: "Red",
		car_mileage: 20000,
		car_isflooding: false,
		fuelEfficiency: 13.2,
		car_issmoked: false,
		image:
			"https://www.automesseweb.jp/wp-content/uploads/2022/07/01_AMW_20220720_Maclaren_F1-1200x800.jpg",
	},
	{
		car_id: 3,
		car_name: "Honda Accord",
		carmodelnum: "Y456",
		car_color: "Red",
		car_mileage: 20000,
		car_isflooding: false,
		car_issmoked: false,
		fuelEfficiency: 12.2,
		image:
			"https://www.automesseweb.jp/wp-content/uploads/2022/07/01_AMW_20220720_Maclaren_F1-1200x800.jpg",
	},
];

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

const HomeClient: React.FC<{ tokens: any }> = ({ tokens }) => {
	const [selectedCar, setSelectedCar] = useState<Car | null>(null);

	const handleSelectCar = (car: Car) => {
		setSelectedCar(car);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<CarSliderComponent cars={demoCars} onSelectCar={handleSelectCar} />
			<MenuContainer>
				<BottonMenues>
					{useSPQuery() && 
						<FuelEfficiencyComponent
							car={selectedCar}
							isSelected={!!selectedCar}
							onClick={() => {
								// ここにクリック時の動作を実装
							}}
						/>
					}
					<BlockMenus>
						{useSPQuery() && 
							<HStack>
								<DetailCardComponent label={"ODO"} value={0} unit={"Km"} />
								<DetailCardComponent label={"GAS COST"} value={0} unit={"Yen"} />
							</HStack>
						}
						{useSPQuery() &&
							<HStack>
								<DetailCardComponent
									label={"ODO AFTER WASH"}
									value={0}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"ODO AFTER exchange"}
									value={0}
									unit={"Km"}
								/>
							</HStack>
						}
						{usePCQuery() &&
							<HStack>
								<FuelEfficiencyComponent
									car={selectedCar}
									isSelected={!!selectedCar}
									onClick={() => {
										// ここにクリック時の動作を実装
									}}
								/>
								<DetailCardComponent label={"ODO"} value={0} unit={"Km"} />
								<DetailCardComponent label={"GAS COST"} value={0} unit={"Yen"} />
								<DetailCardComponent
									label={"ODO AFTER WASH"}
									value={0}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"ODO AFTER exchange"}
									value={0}
									unit={"Km"}
								/>
							</HStack>
						}
					</BlockMenus>
				</BottonMenues>
			</MenuContainer>
		</main>
	);
};

export default HomeClient;
