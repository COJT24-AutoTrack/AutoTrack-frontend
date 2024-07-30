"use client";

import { carInfo, FuelEfficiency } from "@/api/models/models";
import { useState, useEffect } from "react";
import CarSelect from "@/components/base/CarSelect";
import RefuelingCardGroup from "./RefuelingCardGroup";
import styled from "styled-components";
import AddIcon from "@/public/icons/AddIcon.svg";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";

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

interface RefuelingProps {
	userCars: carInfo[];
	token: string;
	userId: string;
}

const Refueling: React.FC<RefuelingProps> = ({ userCars, token }) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [fuelEfficiencies, setFuelEfficiencies] = useState<
		FuelEfficiency[] | null
	>(null);
	const router = useRouter();

	const switchCar = () => {
		setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
	};

	useEffect(() => {
		const fetchFuelEfficiencies = async () => {
			const clientAPI = ClientAPI(token);
			const response = await clientAPI.car.getCarFuelEfficiency({
				car_id: userCars[selectedCarIndex].car_id,
			});
			setFuelEfficiencies(response);
		};
		fetchFuelEfficiencies();
	}, [selectedCarIndex, userCars, token]);

	const handleAddClick = () => {
		router.push(`/addRefueling?car_id=${userCars[selectedCarIndex].car_id}`);
	};

	return (
		<>
			<Container>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
				{fuelEfficiencies && (
					<RefuelingCardGroup fuelEfficiencies={fuelEfficiencies} />
				)}
			</Container>
			<SVGButton onClick={handleAddClick}>
				<AddIcon style={{ fill: "red" }} />
			</SVGButton>
		</>
	);
};

export default Refueling;
