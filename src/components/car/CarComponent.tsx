"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Car } from "@/api/models/models";
import { media } from "@/styles/breakpoints";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import Image from "next/image";

const CarInfoContainer = styled.div`
	margin: 20px;
	padding: 20px;
	border-radius: 8px;
	background-color: #f5f5f5;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CarDetail = styled.p`
	margin: 5px 0;
	color: #333;
	font-size: 16px;
`;

interface CarComponentProps {
	carId: number;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const CarComponent = ({ carId, tokens }: CarComponentProps) => {
	const [userCar, setUserCar] = useState<Car | null>(null);
	useEffect(() => {
		const fetchCar = async () => {
			const clientAPI = ClientAPI(tokens.token);
			const response = await clientAPI.car.getCar({
				car_id: carId,
			});
			setUserCar(response);
		};
		fetchCar();
	}, [carId, tokens]);

	return (
		<CarInfoContainer>
			{userCar?.car_image_url && (
				<Image
					src={userCar.car_image_url}
					alt="Your car"
					width={500}
					height={300}
				/>
			)}
			<CarDetail>Car Name: {userCar?.car_name}</CarDetail>
			<CarDetail>Model Number: {userCar?.carmodelnum}</CarDetail>
			<CarDetail>Color: {userCar?.car_color}</CarDetail>
			<CarDetail>Mileage: {userCar?.car_mileage} km</CarDetail>
			<CarDetail>Flooded: {userCar?.car_isflooding ? "Yes" : "No"}</CarDetail>
			<CarDetail>Smoked in: {userCar?.car_issmoked ? "Yes" : "No"}</CarDetail>
		</CarInfoContainer>
	);
};

export default CarComponent;
