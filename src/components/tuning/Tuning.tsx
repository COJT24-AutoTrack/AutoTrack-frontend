"use client";

import { Car } from "@/api/models/models";
import { useState, useEffect } from "react";
import CarSelect from "@/components/base/CarSelect";
import styled from "styled-components";
import AddIcon from "@/public/icons/AddIcon.svg";
import { useRouter } from "next/navigation";
import TuningInfoCardGroup from "@/components/tuning/TuningInfoCardGroup";
import type { Tuning } from "@/api/models/models";
import { ClientAPI } from "@/api/clientImplement";

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
	userCars: Car[] | null;
	token: string;
	userId: string;
}

const Tuning: React.FC<TuningProps> = ({ userCars, token }) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [tunings, setTunings] = useState<Tuning[] | null>(null);
	const router = useRouter();

	const switchCar = () => {
		if (userCars) {
			setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
		}
	};

	useEffect(() => {
		const fetchTunings = async () => {
			if (userCars && userCars.length !== 0) {
				const clientAPI = ClientAPI(token);
				const response = await clientAPI.car.getCarTuning({
					car_id: userCars[selectedCarIndex].car_id,
				});
				setTunings(response);
			}
		};
		fetchTunings();
	}, [selectedCarIndex, userCars, token]);

	const handleAddClick = () => {
		if (userCars) {
			router.push(`/addTuning?car_id=${userCars[selectedCarIndex].car_id}`);
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
