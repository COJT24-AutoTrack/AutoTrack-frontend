"use client";

import React, { useEffect, useState } from "react";
import CarSliderComponent from "@/components/CarSlider/CarSliderComponent";
import styled from "styled-components";
import FuelEfficiencyComponent from "@/components/CarDetail/FuelEfficiencyComponent";
import DetailCardComponent from "@/components/CarDetail/DetailCardComponent";
import { carInfo } from "@/api/models/models";
import { useSPQuery, usePCQuery } from "@/hooks/useBreakpoints";
import { useRouter } from "next/navigation";

const Main = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 10px;
	height: calc(100dvh - 137.5px);
`;

const CarSliderComponentWrapper = styled.div`
	height: fit-content;
`;

const MenuContainer = styled.div`
	display: flex;
	padding: 0px 20px;
	flex-direction: column;
	flex: 1;
	height: 0; // flex1 のためのおまじない
	gap: 10px;
`;

const VStack = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const HStack = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;
const FuelEfficiencyComponentWrapper = styled.div`
	flex: 1;
`;

const DetailCardComponentsWrapper = styled.div`
	flex: 2;
`;

const HomeClient: React.FC<{ userCars: carInfo[] }> = ({ userCars }) => {
	const [selectedCar, setSelectedCar] = useState<carInfo | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (userCars.length > 0) {
			setSelectedCar(userCars[0]);
		} else {
			setSelectedCar(null);
		}
	}, [userCars]);

	const isSP = useSPQuery();
	const isPC = usePCQuery();

	const handleSelectCar = (car: carInfo) => {
		setSelectedCar(car);
	};

	return (
		<Main>
			<CarSliderComponentWrapper>
				<CarSliderComponent userCars={userCars} onSelectCar={handleSelectCar} />
			</CarSliderComponentWrapper>
			<MenuContainer>
				{isSP && (
					<FuelEfficiencyComponentWrapper>
						<FuelEfficiencyComponent
							userCar={selectedCar}
							isSelected={!!selectedCar}
							onClick={() => {
								router.push("/refueling");
							}}
						/>
					</FuelEfficiencyComponentWrapper>
				)}
				<DetailCardComponentsWrapper>
					<VStack>
						{isSP && (
							<HStack>
								<div style={{ flex: 1 }}>
									<DetailCardComponent
										label={"Mileage"}
										value={selectedCar ? selectedCar.car_mileage : 0}
										unit={"Km"}
									/>
								</div>
								<div style={{ flex: 1 }}>
									<DetailCardComponent
										label={"Fuel Cost"}
										value={selectedCar ? selectedCar.total_gas_cost : 0}
										unit={"Yen"}
									/>
								</div>
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
					</VStack>
				</DetailCardComponentsWrapper>
			</MenuContainer>
		</Main>
	);
};

export default HomeClient;
