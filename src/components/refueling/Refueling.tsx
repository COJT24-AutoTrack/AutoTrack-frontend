"use client";

import { Car, FuelEfficiency } from "@/api/models/models";
import { useState, useEffect } from "react";
import CarSelect from "@/components/base/CarSelect";
import RefuelingCardGroup from "@/components/refueling/RefuelingCardGroup";
import RefuelingChart from "@/components/refueling/RefuelingChart";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { CirclePlus } from "lucide-react";

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

interface RefuelingProps {
	userCars: Car[] | null;
	token: string;
	userId: string;
}

const Refueling: React.FC<RefuelingProps> = ({ userCars, token }) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [carMileage, setCarMileage] = useState<number | null>(null);
	const [fuelEfficiencies, setFuelEfficiencies] = useState<
		FuelEfficiency[] | null
	>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isCarMileageLoading, setIsCarMileageLoading] = useState(false);
	const router = useRouter();

	const switchCar = () => {
		if (userCars) {
			setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (userCars && userCars.length !== 0) {
				setIsLoading(true);
				setIsCarMileageLoading(true);
				const clientAPI = ClientAPI(token);

				try {
					const [fuelResponse, carResponse] = await Promise.all([
						clientAPI.car.getCarFuelEfficiency({
							car_id: userCars[selectedCarIndex].car_id,
						}),
						clientAPI.car.getCar({
							car_id: userCars[selectedCarIndex].car_id,
						}),
					]);

					setFuelEfficiencies(fuelResponse);
					setCarMileage(carResponse.car_mileage ?? 0);
				} catch (error) {
					console.error("Failed to fetch data:", error);
				} finally {
					setIsLoading(false);
					setIsCarMileageLoading(false);
				}
			}
		};

		fetchData();
	}, [selectedCarIndex, userCars, token]);

	const handleAddClick = () => {
		if (userCars) {
			router.push(`/refueling/add/${userCars[selectedCarIndex].car_id}`);
		}
	};

	if (!userCars) {
		return <div>ユーザーの車が見つかりません</div>;
	}

	if (
		isLoading ||
		isCarMileageLoading ||
		!fuelEfficiencies ||
		carMileage === null
	) {
		return <LoadingContainer>データを読み込み中...</LoadingContainer>;
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
					<RefuelingChart
						fuelEfficiencies={fuelEfficiencies}
						carMileage={carMileage}
					/>
					<RefuelingCardGroup
						fuelEfficiencies={fuelEfficiencies}
						carMileage={carMileage}
					/>
				</div>
			</Container>
			{userCars.length !== 0 && (
				<AddButton onClick={handleAddClick}>
					<CirclePlus color="white" />
				</AddButton>
			)}
		</>
	);
};

export default Refueling;
