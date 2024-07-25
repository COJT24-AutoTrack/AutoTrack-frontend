"use client";

import { carInfo } from "@/api/models/models";
import { useState, useEffect } from "react";
import CarSelect from "@/components/base/CarSelect";
import { createClientAPI } from "@/api/clientImplement";
import styled from "styled-components";
import AddIcon from "@/public/icons/AddIcon.svg";
import { useRouter } from "next/navigation";
import TuningInfoCardGroup from "./TuningInfoCardGroup";
import type { Tuning } from "@/api/models/models";

const Container = styled.div`
	position: relative;
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

interface TuningProps {
	userCars: carInfo[];
	userId: string;
}

const Tuning: React.FC<TuningProps> = ({ userCars, userId }) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [tunings, setTunings] = useState<Tuning[] | null>(null);
	const router = useRouter();

	const switchCar = () => {
		setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
	};

	useEffect(() => {
		const fetchTunings = async () => {
			const clientAPI = createClientAPI();
			const response = await clientAPI.user.getTuning({
				user_id: userId,
				car_id: userCars[selectedCarIndex].car_id.toString(),
			});
			setTunings(response);
		};
		fetchTunings();
	}, [selectedCarIndex, userCars]);

	const handleAddClick = () => {
		router.push("/addTuning");
	};

	return (
		<>
			<Container>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
				{tunings && (
					<TuningInfoCardGroup
						tunings={tunings.filter(
							(tuning) => tuning.car_id === userCars[selectedCarIndex].car_id,
						)}
					/>
				)}
			</Container>
			<SVGButton onClick={handleAddClick}>
				<AddIcon style={{ fill: "red" }} />
			</SVGButton>
		</>
	);
};

export default Tuning;
