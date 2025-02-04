"use client";

import { FuelEfficiency } from "@/api/models/models";
import { useState, useEffect, use } from "react";
import CarSelect from "@/components/base/CarSelect";
import RefuelingCardGroup from "@/components/refueling/RefuelingCardGroup";
import RefuelingChart from "@/components/refueling/RefuelingChart";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { CirclePlus } from "lucide-react";
import { useSelectedCarContext } from "@/context/selectedCarContext";

const Container = styled.div`
	position: relative;
	padding-bottom: 80px;
`;

const AddButton = styled.button`
	position: fixed;
	right: 20px;
	bottom: 100px;
	width: 60px;
	height: 60px;
	background-color: #f12424;
	border: none;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #d61f1f;
	}

	svg {
		width: 30px;
		height: 30px;
	}
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	font-size: 1.2em;
	color: #666;
`;

const Refueling: React.FC<{ token: string; userId: string }> = ({
	token,
	userId,
}) => {
	const { userCars, selectedCar, initialized } = useSelectedCarContext();
	const router = useRouter();

	console.log("Refueling: userCars", userCars);
	console.log("Refueling: selectedCar", selectedCar);
	console.log("Refueling: initialized", initialized);

	// まず、初期化が完了していなければ Loading を返す
	if (!initialized) {
		return <LoadingContainer>データを読み込み中...</LoadingContainer>;
	}

	// 初期化が完了していても、userCars が空の場合はエラー表示
	if (userCars.length === 0) {
		return <div>ユーザーの車が見つかりません</div>;
	}

	// 同様に、selectedCar が未設定の場合も Loading 表示を返す
	if (
		!selectedCar ||
		!selectedCar.fuel_efficiency ||
		selectedCar.car_mileage === undefined
	) {
		return <LoadingContainer>データを読み込み中...</LoadingContainer>;
	}

	return (
		<>
			<Container>
				<CarSelect token={token} userId={userId} />
				<div style={{ padding: "10px" }}>
					<RefuelingChart
						fuelEfficiencies={selectedCar.fuel_efficiency}
						carMileage={selectedCar.car_mileage}
					/>
					<RefuelingCardGroup
						fuelEfficiencies={selectedCar.fuel_efficiency}
						carMileage={selectedCar.car_mileage}
					/>
				</div>
			</Container>
			<AddButton
				onClick={() => {
					if (selectedCar) {
						router.push(`/refueling/add/${selectedCar.car_id}`);
					}
				}}
			>
				<CirclePlus color="white" />
			</AddButton>
		</>
	);
};

export default Refueling;
