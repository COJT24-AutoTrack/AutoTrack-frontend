"use client";

import { Car, FuelEfficiency } from "@/api/models/models";
import { useState, useEffect } from "react";
import CarSelect from "@/components/base/CarSelect";
import RefuelingCardGroup from "@/components/refueling/RefuelingCardGroup";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { CirclePlus } from "lucide-react";

const Container = styled.div`
	position: relative;
	padding-bottom: 80px;
`;

const SVGButton = styled.button`
	position: absolute;
	right: 14px;
	bottom: 100px;
	width: 80px;
	height: 80px;
	background-color: transparent;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	svg {
		width: 100px;
		height: 100px;
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

interface RefuelingProps {
	userCars: Car[] | null;
	token: string;
	userId: string;
}

const Refueling: React.FC<RefuelingProps> = ({ userCars, token }) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [fuelEfficiencies, setFuelEfficiencies] = useState<
		FuelEfficiency[] | null
	>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const switchCar = () => {
		if (userCars) {
			setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
		}
	};

	useEffect(() => {
		const fetchFuelEfficiencies = async () => {
			if (userCars && userCars.length !== 0) {
				setIsLoading(true);
				try {
					const clientAPI = ClientAPI(token);
					const response = await clientAPI.car.getCarFuelEfficiency({
						car_id: userCars[selectedCarIndex].car_id,
					});
					setFuelEfficiencies(response);
				} catch (error) {
					console.error("Failed to fetch fuel efficiencies:", error);
					// エラー処理をここに追加することもできます
				} finally {
					setIsLoading(false);
				}
			}
		};
		fetchFuelEfficiencies();
	}, [selectedCarIndex, userCars, token]);

	const handleAddClick = () => {
		if (userCars) {
			router.push(
				`/refueling/addRefueling/${userCars[selectedCarIndex].car_id}`,
			);
		}
	};

	if (!userCars) {
		return <div>ユーザーの車が見つかりません</div>;
	}

	return (
		<>
			<Container>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
				<div style={{ padding: "10px" }}>
					{isLoading ? (
						<LoadingContainer>データを読み込み中...</LoadingContainer>
					) : (
						fuelEfficiencies && (
							<RefuelingCardGroup fuelEfficiencies={fuelEfficiencies} />
						)
					)}
				</div>
			</Container>
			{userCars.length !== 0 && (
				<SVGButton onClick={handleAddClick}>
					<CirclePlus color="red" />
				</SVGButton>
			)}
		</>
	);
};

export default Refueling;
