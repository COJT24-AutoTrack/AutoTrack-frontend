"use client";

import React from "react";
import CarSliderComponent from "@/components/CarSlider/CarSliderComponent";
import styled from "styled-components";
import FuelEfficiencyComponent from "@/components/CarDetail/FuelEfficiencyComponent";
import DetailCardComponent from "@/components/CarDetail/DetailCardComponent";
import { carInfo } from "@/api/models/models";
import { usePCQuery, useSPandTBQuery } from "@/hooks/useBreakpoints";
import { useRouter } from "next/navigation";
import { media } from "@/styles/breakpoints";
import { useSelectedCarContext } from "@/context/selectedCarContext";

const Main = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 10px;
	height: calc(100dvh - 137.5px);
`;

const CarSliderComponentWrapper = styled.div`
	height: fit-content;
	${media.PC} {
		padding-left: 20px;
	}
`;

const MenuContainer = styled.div`
	display: flex;
	padding: 0px 20px;
	flex-direction: column;
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

interface HomeClientProps {
	userCars: carInfo[];
	token: string;
	userId: string;
}

const HomeClient: React.FC<HomeClientProps> = ({ userCars, token, userId }) => {
	const { selectedCar, initialized } = useSelectedCarContext();
	const router = useRouter();

	if (!initialized) {
		return <div>Loading...</div>;
	}

	// selectedCar が null の可能性を排除したいなら、ここでチェックしてローディングを返すなど
	if (!selectedCar) {
		return <div>Loading (no selected car)...</div>;
	}

	const isSPandTB = useSPandTBQuery();
	const isPC = usePCQuery();

	return (
		<Main>
			<CarSliderComponentWrapper>
				<CarSliderComponent userCars={userCars} />
			</CarSliderComponentWrapper>
			<MenuContainer>
				{isSPandTB && (
					<FuelEfficiencyComponentWrapper>
						<FuelEfficiencyComponent
							userCar={selectedCar}
							onClick={() => router.push("/refueling")}
						/>
					</FuelEfficiencyComponentWrapper>
				)}
				<DetailCardComponentsWrapper>
					<VStack>
						{isSPandTB && (
							<HStack>
								<div style={{ flex: 1 }}>
									<DetailCardComponent
										label={"Mileage"}
										value={selectedCar.total_mileage}
										unit={"Km"}
									/>
								</div>
								<div style={{ flex: 1 }}>
									<DetailCardComponent
										label={"Fuel Cost"}
										value={selectedCar.monthly_gas_cost}
										unit={"Yen"}
									/>
								</div>
							</HStack>
						)}
						{isSPandTB && (
							<HStack>
								<DetailCardComponent
									label={"Car Wash"}
									value={selectedCar.odd_after_wash}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"Tires"}
									value={selectedCar.odd_after_exchange}
									unit={"Km"}
								/>
							</HStack>
						)}
						{isPC && (
							<HStack>
								<FuelEfficiencyComponent
									userCar={selectedCar}
									onClick={() => router.push("/refueling")}
								/>
								<DetailCardComponent
									label={"Mileage"}
									value={selectedCar.car_mileage}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"Total Fuel Cost"}
									value={selectedCar.total_gas_cost}
									unit={"Yen"}
								/>
								<DetailCardComponent
									label={"Car Wash"}
									value={selectedCar.odd_after_wash}
									unit={"Km"}
								/>
								<DetailCardComponent
									label={"Tires"}
									value={selectedCar.odd_after_exchange}
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
